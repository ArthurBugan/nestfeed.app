import { describe, expect, it } from "vitest";
import { renderMarkdown } from "@/lib/markdown";

describe("renderMarkdown", () => {
	it("renders basic markdown to html", async () => {
		const { markup } = await renderMarkdown("# Hello\n\nworld");
		expect(markup).toContain("<h1");
		expect(markup).toContain("world");
	});

	it("extracts headings with ids", async () => {
		const { headings } = await renderMarkdown("## Second level");
		expect(headings).toHaveLength(1);
		expect(headings[0].level).toBe(2);
		expect(headings[0].text).toBe("Second level");
		expect(headings[0].id).toBeTruthy();
	});
});
