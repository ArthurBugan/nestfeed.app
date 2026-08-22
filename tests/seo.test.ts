import { describe, expect, it } from "vitest";
import { absoluteUrl, articleJsonLd } from "@/lib/seo";

describe("absoluteUrl", () => {
	it("prefixes the site url", () => {
		expect(absoluteUrl("/blog/x")).toBe("https://groupify.dev/blog/x");
	});

	it("adds the leading slash when missing", () => {
		expect(absoluteUrl("about")).toBe("https://groupify.dev/about");
	});
});

describe("articleJsonLd", () => {
	const post = {
		title: "T",
		description: "D",
		slug: "t",
		image: "https://cdn/img.png",
		datePublished: "2026-08-22",
		author: "Arthur",
	};

	it("emits a valid Article shape", () => {
		const ld = articleJsonLd(post);
		expect(ld["@type"]).toBe("Article");
		expect(ld.headline).toBe("T");
		expect(ld.url).toBe("https://groupify.dev/blog/t");
		expect(ld.author.name).toBe("Arthur");
		expect(ld.publisher.url).toBe("https://groupify.dev");
	});

	it("falls back to Groupify as author", () => {
		const { author, image } = articleJsonLd({ ...post, author: undefined });
		expect(author.name).toBe("Groupify");
	});
});
