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

	it("renders GFM tables", async () => {
		const { markup } = await renderMarkdown("| A | B |\n|---|---|\n| 1 | 2 |");
		expect(markup).toContain("<table");
		expect(markup).toContain("<th>A</th>");
		expect(markup).toContain("<td>2</td>");
	});

	it("wraps headings with anchor links", async () => {
		const { markup } = await renderMarkdown("## My heading");
		expect(markup).toContain('class="anchor"');
	});

	it("renders fenced code blocks as pre/code", async () => {
		const { markup } = await renderMarkdown('```ts\nconst x = "hi";\n```');
		expect(markup).toContain("<pre");
		expect(markup).toContain("<code");
	});

	it("produces sequential ids for duplicate headings", async () => {
		const { headings } = await renderMarkdown("## Intro\n## Intro\n## Next");
		const ids = headings.map((h) => h.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("returns no headings for heading-less content", async () => {
		const { headings } = await renderMarkdown("Just a paragraph.");
		expect(headings).toEqual([]);
	});

	it("keeps inline code as code elements", async () => {
		const { markup } = await renderMarkdown("Run `bun test` now");
		expect(markup).toContain("<code");
		expect(markup).toContain("bun test");
	});

	it("renders links", async () => {
		const { markup } = await renderMarkdown("[Docs](https://docs.dev)");
		expect(markup).toContain("<a");
		expect(markup).toContain('href="https://docs.dev"');
	});
});
