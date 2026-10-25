// lib/blog-guides.ts
// Original, hand-written guides served by the blog. These live in
// content/posts and are compiled by @content-collections/vite at build time.
//
// The legacy Directus archive ("channel analytical overview" machine posts)
// is hidden during the AdSense review period. Re-enable by flipping these two
// constants (and setting INCLUDE_LEGACY_POSTS=1 for the sitemap generator).
import { allPosts } from "content-collections";
import type { BlogPost } from "@/hooks/useQuery/useBlog";

export const SHOW_LEGACY_POSTS = false;
export const INCLUDE_LEGACY_POSTS = false;

export type GuidePost = {
	id: string;
	slug: string;
	title: string;
	description: string;
	date_created: string;
	readTime: string;
	category: string;
	author: string;
	image: string;
	featured: boolean;
	content: string;
};

type RawPost = {
	id?: string | number;
	slug?: string;
	title?: string;
	description?: string;
	date?: string;
	readTime?: string;
	category?: string;
	author?: string;
	image?: string;
	featured?: boolean;
	content?: string;
};

// Bridge to the BlogPost shape the blog UIs already consume (Directus posts
// carry `date_created`; guides carry `date`).
export function normalizePost(raw: RawPost & { date?: string }): GuidePost {
	return {
		id: String(raw.id ?? raw.slug ?? ""),
		slug: raw.slug ?? "",
		title: raw.title ?? "",
		description: raw.description ?? "",
		date_created: raw.date ?? "",
		readTime: raw.readTime ?? "",
		category: raw.category ?? "",
		author: raw.author ?? "Groupify Team",
		image: raw.image ?? "/images/guides/cover-organize.svg",
		featured: raw.featured ?? false,
		content: raw.content ?? "",
	};
}

export const localGuides: GuidePost[] = (
	allPosts as unknown as (RawPost & { date?: string })[]
)
	.map(normalizePost)
	.sort((a, b) => b.date_created.localeCompare(a.date_created));

export function findLocalGuide(slug: string): GuidePost | undefined {
	return localGuides.find((post) => post.slug === slug);
}

// Type guard so legacy + guide posts can share the blog grid.
export type BlogListPost = BlogPost | GuidePost;
export const postDate = (post: BlogListPost) => String(post.date_created ?? "");

// Deterministic date formatting: fixed locale + UTC, so server-rendered and
// client-hydrated markup always match (avoids React hydration mismatch #418).
export function formatPostDate(date: string): string {
	if (!date) return "";
	const parsed = new Date(date);
	if (Number.isNaN(parsed.getTime())) return "";
	return parsed.toLocaleDateString("en-US", {
		timeZone: "UTC",
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
