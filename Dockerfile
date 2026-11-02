# syntax=docker/dockerfile:1
# Multi-stage build: deps → build (verified) → slim runtime.
#
# Why verified: a Vite/Nitro build is content-hashed, so an HTML shell
# referencing app-<hash>.css is only correct if that exact file ships with it.
# A mismatch (partial copy, reused layer, out-of-sync process) first-paints
# unstyled with a page-wide placeholder icon. The RUN verification below fails
# the image build instead of shipping it.

FROM oven/bun:1.3.14 AS deps
WORKDIR /app
COPY package.json bun.lock ./
# --link layers: node_modules is a mounted cache dir, COPY-safe gate via
# BuildKit invalidates only when the lockfile changes.
RUN --mount=type=cache,target=/root/.bun/install/cache \
	bun install --frozen-lockfile

FROM oven/bun:1.3.14 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build
# Guard rail: every asset crossorigin-referenced by the SSR entry must exist.
# Fails the build when any hashed chunk is missing from the public manifest.
RUN set -eu; \
	css="$(grep -oE 'app(-[A-Za-z0-9_-]+)?\.css' .output/server/index.mjs | head -1)"; \
	js="$(grep -oE 'index(-[A-Za-z0-9_-]+)?\.js' .output/server/index.mjs | head -1)"; \
	test -n "$css" -a -n "$js"; \
	test -f ".output/public/assets/$css"; \
	test -f ".output/public/assets/$js"; \
	echo "asset check ok: $css + $js"

FROM oven/bun:1.3.14 AS runtime
WORKDIR /app
ENV NODE_ENV=production \
	PORT=3000 \
	HOST=0.0.0.0

# Non-root runtime user; the app never runs as UID 0.
RUN groupadd -r app -g 1001 && useradd -r -u 1001 -g app -s /usr/sbin/nologin app

COPY --from=build /app/.output ./.output

USER 1001:1001
EXPOSE 3000

# / may 503 during startup — retry, then require HTTP 200 within the shell.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD bun -e 'const main = async () => { \
		const url = `http://127.0.0.1:${process.env.PORT ?? 3000}/`; \
		for (let i = 0; i < 3; i++) { \
			try { \
				const res = await fetch(url); \
				if (res.ok) process.exit(0); \
			} catch {} \
			await new Promise(r => setTimeout(r, 2000)); \
		} \
		process.exit(1); \
	}; main();'

CMD ["bun", "run", ".output/server/index.mjs"]
