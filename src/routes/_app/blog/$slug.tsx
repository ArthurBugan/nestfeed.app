import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { LinkedinIcon, TwitterIcon } from "@/components/brand-icons";
import { CompactHeader } from "@/components/compact-header";
import { useLanguage } from "@/components/language-provider";
import { Markdown } from "@/components/mardown";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { absoluteUrl, articleJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/_app/blog/$slug")({
	component: BlogPostComponent,
	loader: async ({ params }) => {
		const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
		const response = await fetch(`${VITE_BASE_URL}/api/v3/blog/${params.slug}`);
		if (!response.ok) throw notFound();
		const contentType = response.headers.get("content-type") || "";
		if (!contentType.includes("application/json")) {
			throw notFound();
		}
		const json = await response.json();
		// Endpoint may return the bare post, `{ data: post }`, or `{ data: { data: post } }`
		const candidate = json?.data?.data ?? json?.data ?? json;
		const post =
			candidate && typeof candidate === "object" && !Array.isArray(candidate)
				? candidate
				: null;
		if (!post?.slug) throw notFound();
		return { post };
	},
	head: ({ loaderData }) => {
		const post = loaderData?.post;
		const description = post?.description || "";
		const image = post?.image || "";
		const url = absoluteUrl(`/blog/${post?.slug ?? ""}`);
		return {
			meta: [
				{ title: post?.title || "Groupify Blog" },
				{ name: "description", content: description },
				{ property: "og:title", content: post?.title || "" },
				{ property: "og:description", content: description },
				{ property: "og:image", content: image },
				{ property: "og:url", content: url },
				{ property: "og:type", content: "article" },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: post?.title || "" },
				{ name: "twitter:description", content: description },
				{ name: "twitter:image", content: image },
			],
			links: [{ rel: "canonical", href: url }],
		};
	},
});

function BlogPostComponent() {
	const { t } = useLanguage();
	const { post } = Route.useLoaderData();

	const jsonLd = articleJsonLd({
		title: post.title,
		description: post.description,
		slug: post.slug,
		image: post.image,
		datePublished: post.date_created,
		author: post.author,
	});

	return (
		<div className="min-h-screen bg-background">
			<script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
			<CompactHeader />

			<article className="container mx-auto px-4 py-8 max-w-3xl">
				{/* Back */}
				<Link
					to="/blog"
					className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
				>
					<ArrowLeft className="h-3.5 w-3.5" /> {t("blog.post.back")}
				</Link>

				{/* Header */}
				<header className="space-y-4 mb-8">
					<div className="flex items-center gap-2 flex-wrap">
						<Badge
							variant="outline"
							className="text-red-600 border-red-500/30 bg-red-500/5 text-xs uppercase tracking-wider"
						>
							{post.category}
						</Badge>
						<span className="text-xs text-muted-foreground flex items-center gap-1">
							<Clock className="h-3 w-3" /> {post.readTime}
						</span>
					</div>

					<h1 className="text-3xl md:text-4xl font-bold leading-tight">
						{post.title}
					</h1>

					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold uppercase">
								{post.author?.[0] || "A"}
							</div>
							<div>
								<p className="font-medium text-sm">{post.author}</p>
								<p className="text-xs text-muted-foreground">
									{new Date(post.date_created).toLocaleDateString()}
								</p>
							</div>
						</div>

						<div className="flex gap-2">
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 rounded-full"
							>
								<TwitterIcon className="h-3.5 w-3.5" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 rounded-full"
							>
								<LinkedinIcon className="h-3.5 w-3.5" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 rounded-full"
							>
								<Share2 className="h-3.5 w-3.5" />
							</Button>
						</div>
					</div>
				</header>

				{/* Hero Image */}
				<div className="mb-10 rounded-xl overflow-hidden shadow-lg">
					<img
						src={post.image}
						alt={post.title}
						className="w-full aspect-[21/9] object-cover"
					/>
				</div>

				{/* Content */}
				<div className="prose prose-slate dark:prose-invert max-w-none mb-10">
					<Markdown content={post.content} className="prose" />
				</div>

				<Separator className="my-8" />

				{/* Author Bio */}
				<div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border space-y-4">
					<h3 className="font-semibold text-sm mb-2">
						{t("blog.post.written", { author: post.author })}
					</h3>
					<p className="text-sm text-muted-foreground">
						{t("blog.post.author.desc")}
					</p>
				</div>
			</article>

			<SiteFooter />
		</div>
	);
}
