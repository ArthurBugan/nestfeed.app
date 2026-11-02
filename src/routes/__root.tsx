// src/routes/__root.tsx
/// <reference types="vite/client" />

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	retainSearchParams,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { AppearanceProvider } from "@/components/appearance-provider";
import { CookieConsent } from "@/components/cookie-consent";
import { LanguageProvider } from "@/components/language-provider";
import { NotFound } from "@/components/not-found";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AnalyticsListener } from "@/hooks/analytics-listener";
import { queryClient } from "@/hooks/utils/queryClient";
import { initAnalytics } from "@/lib/analytics";
import appCss from "@/styles/app.css?url";

export const Route = createRootRoute({
	notFoundComponent: () => <NotFound />,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Groupify – Organize your YouTube channels into groups",
			},
			{
				name: "description",
				content:
					"Groupify helps you organize YouTube channels into groups, curate watchlists and share them with friends. Built for creators, anime fans and anyone taming their subscriptions.",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "Groupify" },
			// AdSense account-level ownership verification, independent of the
			// consent-gated adsbygoogle.js bootstrap (which never loads during a
			// cold review crawl).
			{
				name: "google-adsense-account",
				content: "ca-pub-4077364511521347",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	search: {
		middlewares: [retainSearchParams(["rootValue"])],
	},
	component: RootComponent,
});

function RootComponent() {
	return (
		<LanguageProvider>
			<QueryClientProvider client={queryClient}>
				<RootDocument>
					<Outlet />
					<AnalyticsListener />
					{import.meta.env.DEV ? (
						<ReactQueryDevtools initialIsOpen={true} />
					) : null}
					<Toaster richColors />
				</RootDocument>
			</QueryClientProvider>
		</LanguageProvider>
	);
}

/** Fires the consent-gated analytics loader once the app is idle. */
function AnalyticsInit() {
	useEffect(() => {
		const timer = window.setTimeout(initAnalytics, 0);
		return () => window.clearTimeout(timer);
	}, []);
	return null;
}
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<AppearanceProvider>{children}</AppearanceProvider>
				</ThemeProvider>
				<CookieConsent />
				<AnalyticsInit />
				<Scripts />
			</body>
		</html>
	);
}
