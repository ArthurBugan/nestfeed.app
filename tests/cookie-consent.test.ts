import { beforeEach, describe, expect, it } from "vitest";
import { getConsent } from "@/components/cookie-consent";

describe("consent storage", () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	it("returns null when no choice stored", () => {
		expect(getConsent()).toBeNull();
	});

	it("reads accepted choice", () => {
		window.localStorage.setItem("cookie-consent", "all");
		expect(getConsent()).toBe("all");
	});

	it("reads non-personalized choice", () => {
		window.localStorage.setItem("cookie-consent", "npa");
		expect(getConsent()).toBe("npa");
	});

	it("rejects invalid values", () => {
		window.localStorage.setItem("cookie-consent", "bogus");
		expect(getConsent()).toBeNull();
	});
});
