import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CookieConsent, getConsent } from "@/components/cookie-consent";
import { LanguageProvider } from "@/components/language-provider";

vi.mock("@tanstack/react-router", () => ({
	Link: ({
		children,
		to,
		...props
	}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		children: React.ReactNode;
		to?: string;
	}) => (
		<a {...props} href={to ?? "#"}>
			{children}
		</a>
	),
}));

const adsbygoogle = () =>
	window.adsbygoogle as unknown[] & { requestNonPersonalizedAds?: number };

function Wrapper({ children }: { children: React.ReactNode }) {
	return <LanguageProvider>{children}</LanguageProvider>;
}

describe("CookieConsent", () => {
	beforeEach(() => {
		window.localStorage.clear();
		delete window.adsbygoogle;
	});

	afterEach(() => {
		cleanup();
	});

	it("renders the banner when no consent is stored", () => {
		render(
			<Wrapper>
				<CookieConsent />
			</Wrapper>,
		);

		expect(screen.getByText("Cookies & ads")).toBeTruthy();
		expect(screen.getByRole("dialog")).toBeTruthy();
		expect(screen.getByText("Accept all")).toBeTruthy();
		expect(screen.getByText("Non-personalized only")).toBeTruthy();
	});

	it("does not render when consent was already given", () => {
		window.localStorage.setItem("cookie-consent", "all");
		const { container } = render(
			<Wrapper>
				<CookieConsent />
			</Wrapper>,
		);
		expect(container.firstChild).toBeNull();
	});

	it("forces non-personalized ads when no consent is stored yet", () => {
		const { container } = render(
			<Wrapper>
				<CookieConsent />
			</Wrapper>,
		);
		expect(container.firstChild).not.toBeNull();
		expect(adsbygoogle().requestNonPersonalizedAds).toBe(1);
	});

	it("stores 'all' and hides the banner when accepted", async () => {
		const user = userEvent.setup();
		render(
			<Wrapper>
				<CookieConsent />
			</Wrapper>,
		);

		await user.click(screen.getByText("Accept all"));

		expect(getConsent()).toBe("all");
		expect(screen.queryByRole("dialog")).toBeNull();
	});

	it("stores 'npa' and keeps non-personalized ads when rejected", async () => {
		const user = userEvent.setup();
		render(
			<Wrapper>
				<CookieConsent />
			</Wrapper>,
		);

		await user.click(screen.getByText("Non-personalized only"));

		expect(getConsent()).toBe("npa");
		expect(screen.queryByRole("dialog")).toBeNull();
		expect(adsbygoogle().requestNonPersonalizedAds).toBe(1);
	});

	it("links to the privacy policy", () => {
		const { container } = render(
			<Wrapper>
				<CookieConsent />
			</Wrapper>,
		);
		const links = Array.from(container.querySelectorAll("a"));
		const privacyLink = links.find((a) =>
			a.getAttribute("href")?.includes("privacy"),
		);
		expect(privacyLink?.textContent).toBe("Privacy policy");
	});
});
