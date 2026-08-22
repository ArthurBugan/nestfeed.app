import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";

vi.mock("@tanstack/react-router", () => ({
	Link: ({
		children,
		...props
	}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		children: React.ReactNode;
	}) => (
		<a {...props} href={props.href ?? "#"}>
			{children}
		</a>
	),
}));

function Wrapper({ children }: { children: React.ReactNode }) {
	return <LanguageProvider>{children}</LanguageProvider>;
}

describe("SiteFooter", () => {
	it("renders required policy links", () => {
		render(
			<Wrapper>
				<SiteFooter />
			</Wrapper>,
		);
		for (const label of [
			"About",
			"Contact",
			"Privacy Policy",
			"Terms of Service",
		]) {
			expect(screen.getByText(label)).toBeTruthy();
		}
	});

	it("hides badges by default and shows them on demand", () => {
		const { rerender } = render(
			<Wrapper>
				<SiteFooter />
			</Wrapper>,
		);
		expect(screen.queryByAltText("Acid Tools")).toBeNull();

		rerender(
			<Wrapper>
				<SiteFooter showBadges />
			</Wrapper>,
		);
		expect(screen.getByAltText("Acid Tools")).toBeTruthy();
	});
});
