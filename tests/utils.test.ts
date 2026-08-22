import { describe, expect, it } from "vitest";
import { cn, getChannelUrl } from "@/lib/utils";

describe("cn", () => {
	it("joins class names", () => {
		expect(cn("a", "b")).toBe("a b");
	});

	it("lets later classes win (tailwind-merge)", () => {
		expect(cn("px-2", "px-4")).toBe("px-4");
	});

	it("drops falsy values", () => {
		expect(cn("a", false && "b", null, undefined)).toBe("a");
	});
});

describe("getChannelUrl", () => {
	it("returns # for empty url", () => {
		expect(getChannelUrl("youtube", undefined)).toBe("#");
	});

	it("builds youtube channel urls", () => {
		expect(getChannelUrl("youtube", "abc")).toBe(
			"https://youtube.com/channel/abc",
		);
	});

	it("builds crunchyroll series urls", () => {
		expect(getChannelUrl("anime", "xyz")).toBe(
			"https://crunchyroll.com/series/xyz",
		);
	});

	it("normalizes bare website domains and keeps full urls", () => {
		expect(getChannelUrl("website", "example.com")).toBe("https://example.com");
		expect(getChannelUrl("website", "http://example.com")).toBe(
			"http://example.com",
		);
	});

	it("passes through unknown content types", () => {
		expect(getChannelUrl("other", "u")).toBe("u");
	});
});
