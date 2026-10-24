import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "@/hooks/api/api-client";

vi.mock("sonner", () => ({
	toast: { error: vi.fn() },
}));

const BASE = "https://api.example.com";
const user = { id: "user-123" };

function mockFetch(impl: (input: RequestInfo, init?: RequestInit) => Response) {
	const fetchMock = vi.fn(impl);
	vi.stubGlobal("fetch", fetchMock);
	return fetchMock;
}

function jsonResponse(body: unknown, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

function makeClient() {
	return new ApiClient(BASE);
}

type FetchCall = [URL, RequestInit];

function nthCall(fetchMock: ReturnType<typeof mockFetch>, index = 0) {
	return fetchMock.mock.calls[index] as unknown as FetchCall;
}

describe("ApiClient", () => {
	beforeEach(() => {
		localStorage.setItem("user", JSON.stringify(user));
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		localStorage.clear();
	});

	it("GET includes only valid query params", async () => {
		const client = makeClient();
		const fetchMock = mockFetch(() => jsonResponse({ ok: true }));

		await client.get("/channels", {
			page: 2,
			limit: 10,
			search: "news",
			groupId: undefined,
			empty: "",
			active: true,
		});

		const [url, config] = nthCall(fetchMock);
		expect(url.toString()).toBe(
			`${BASE}/channels?page=2&limit=10&search=news&active=true`,
		);
		expect(config?.credentials).toBe("include");
		const headers = config.headers as Record<string, string>;
		expect(headers["Content-Type"]).toBe("application/json");
		expect(headers.Authorization).toBeUndefined();
	});

	it("sends a correlation id read from the stored user", async () => {
		const client = makeClient();
		const fetchMock = mockFetch(() => jsonResponse({ ok: true }));

		await client.get("/me");

		const [, config] = nthCall(fetchMock);
		expect((config.headers as Record<string, string>)["x-correlation-id"]).toBe(
			"user-123",
		);
	});

	it("includes a Bearer token when set and drops it when removed", async () => {
		const client = makeClient();
		const fetchMock = mockFetch(() => jsonResponse({ ok: true }));

		client.setAuthToken("tok");
		await client.get("/me");
		const [, withToken] = nthCall(fetchMock);
		expect((withToken.headers as Record<string, string>).Authorization).toBe(
			"Bearer tok",
		);

		client.removeAuthToken();
		await client.get("/me");
		const [, withoutToken] = nthCall(fetchMock, 1);
		expect(
			(withoutToken.headers as Record<string, string>).Authorization,
		).toBeUndefined();
	});

	it("POST serializes the body", async () => {
		const client = makeClient();
		const fetchMock = mockFetch(() => jsonResponse({ data: { id: 1 } }));

		const result = await client.post<{ data: { id: number } }>("/groups", {
			name: "My group",
		});

		expect(result.data).toEqual({ id: 1 });
		const [url, config] = nthCall(fetchMock);
		expect(url.toString()).toBe(`${BASE}/groups`);
		expect(config?.method).toBe("POST");
		expect(config?.body).toBe(JSON.stringify({ name: "My group" }));
	});

	it("DELETE sends a request without a body", async () => {
		const client = makeClient();
		const fetchMock = mockFetch(() => jsonResponse({ ok: true }));

		await client.delete("/groups/1");

		const [url, config] = nthCall(fetchMock);
		expect(url.toString()).toBe(`${BASE}/groups/1`);
		expect(config?.method).toBe("DELETE");
		expect(config?.body).toBeUndefined();
	});

	it("throws a parsed ApiError for non-ok responses", async () => {
		const client = makeClient();
		mockFetch(() =>
			jsonResponse(
				{ message: "Validation failed", errors: { name: ["required"] } },
				422,
			),
		);

		await expect(client.get("/groups")).rejects.toEqual(
			expect.objectContaining({
				message: "Validation failed",
				status: 422,
				errors: { name: ["required"] },
			}),
		);
	});

	it("uses the fallback message when the error body is not json", async () => {
		const client = makeClient();
		mockFetch(
			() => new Response("<html>boom</html>", { status: 500 }),
		);

		await expect(client.get("/groups")).rejects.toEqual(
			expect.objectContaining({ message: "An error occurred", status: 500 }),
		);
	});

	it("uses the HTTP status as message when the error body has none", async () => {
		const client = makeClient();
		mockFetch(() => jsonResponse({}, 502));

		await expect(client.get("/groups")).rejects.toEqual(
			expect.objectContaining({ message: "HTTP 502", status: 502 }),
		);
	});

	it("maps network failures to a status-0 error", async () => {
		const client = makeClient();
		mockFetch(() => {
			throw new TypeError("Failed to fetch");
		});

		await expect(client.get("/groups")).rejects.toEqual(
			expect.objectContaining({
				message: "Network error. Please check your connection.",
				status: 0,
			}),
		);
	});

	it("shows a session-expired toast on 401", async () => {
		vi.useFakeTimers();
		try {
			const client = makeClient();
			const { toast } = await import("sonner");
			mockFetch(() => jsonResponse({ message: "Session expired" }, 401));

			await expect(client.get("/channels")).rejects.toEqual(
				expect.objectContaining({ status: 401 }),
			);
			expect(toast.error).toHaveBeenCalledWith(
				"Session expired. Please log in again.",
			);
		} finally {
			vi.useRealTimers();
		}
	});
});

describe("ApiClient default base url", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("defaults to /api when no base url is given", async () => {
		const client = new ApiClient();
		const fetchMock = mockFetch(() => jsonResponse({ data: "x" }));

		await client.post("/groups");

		expect(fetchMock.mock.calls[0][0].toString()).toMatch(/\/api\/groups$/);
	});
});
