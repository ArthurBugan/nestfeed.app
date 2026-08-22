export const SITE_URL = "https://groupify.dev";
export const SITE_NAME = "Groupify";

export function absoluteUrl(path: string): string {
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface ArticleJsonLdInput {
	title: string;
	description: string;
	slug: string;
	image?: string;
	datePublished: string;
	author?: string;
}

export function articleJsonLd(post: ArticleJsonLdInput) {
	const url = absoluteUrl(`/blog/${post.slug}`);
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.title,
		description: post.description,
		image: post.image || undefined,
		datePublished: post.datePublished,
		dateModified: post.datePublished,
		mainEntityOfPage: { "@type": "WebPage", "@id": url },
		url,
		author: {
			"@type": "Organization",
			name: post.author || SITE_NAME,
		},
		publisher: {
			"@type": "Organization",
			name: SITE_NAME,
			url: SITE_URL,
		},
	};
}
