import { createFileRoute, Link } from "@tanstack/react-router";
import { CompactHeader } from "@/components/compact-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/_app/faq")({
	component: FaqPage,
	head: () => ({
		meta: [
			{ title: "FAQ – Groupify" },
			{
				name: "description",
				content:
					"Answers to common questions about Groupify: what it is, pricing, how channel groups and share links work, supported languages and data privacy.",
			},
		],
		links: [{ rel: "canonical", href: "https://groupify.dev/faq" }],
	}),
});

const FAQS: Array<{ q: string; a: string }> = [
	{
		q: "What is Groupify?",
		a: `${SITE_NAME} is a web app that helps you organize YouTube channels into groups — for example animes, news, fitness or cooking — so your subscriptions stop being an endless feed. You can sync each group's latest videos and share curated collections with a single link.`,
	},
	{
		q: "Is Groupify free?",
		a: `You can create an account and organize your channels for free. Paid plans add higher limits and extra management features for creators who run many groups. Current limits are listed on the billing page inside the dashboard.`,
	},
	{
		q: "Do I need a YouTube account to use it?",
		a: "You can browse shared links without any account. To build your own groups you create a Groupify account; connecting Google lets us read your subscription list so organizing takes one click instead of manual entry.",
	},
	{
		q: "How do share links work?",
		a: "Every group can be published as a public link. Anyone with the link sees the curated channel list and its latest videos — no login required. You choose whether collaborators can only view or also edit.",
	},
	{
		q: "Can I copy someone else's group?",
		a: "Yes. Groupshelf is a catalog of public collections shared by other users; open one, preview it, and copy it into your own dashboard in a couple of clicks. The original stays untouched.",
	},
	{
		q: "Which languages does the interface support?",
		a: "English, Portuguese and Spanish today. Switch anytime from the sidebar language selector; your choice is remembered between visits.",
	},
	{
		q: "Is Groupify affiliated with YouTube or Google?",
		a: "No. Groupify is an independent tool that uses YouTube's public data via its API to display channel information. All trademarks belong to their respective owners.",
	},
	{
		q: "How do I delete my data?",
		a: "You can delete your account from Settings → Account, which removes your groups and profile from our servers. For anything else, contact us and we will respond within 30 days as described in the Privacy Policy.",
	},
];

function FaqPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: FAQS.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: { "@type": "Answer", text: f.a },
		})),
	};

	return (
		<div className="min-h-screen bg-background">
			<script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
			<CompactHeader />

			<section className="relative overflow-hidden py-16 md:py-24">
				<div className="container mx-auto px-4 relative text-center">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Frequently asked questions
					</h1>
					<p className="text-lg text-muted-foreground max-w-xl mx-auto">
						Short answers about how {SITE_NAME} works. Something missing?{" "}
						<Link to="/contact" className="underline hover:text-primary">
							Tell us
						</Link>
						.
					</p>
				</div>
			</section>

			<main className="container mx-auto px-4 pb-16 max-w-3xl space-y-4">
				{FAQS.map((f) => (
					<section
						key={f.q}
						className="rounded-xl border bg-card/50 p-6"
						aria-label={f.q}
					>
						<h2 className="font-semibold mb-2">{f.q}</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							{f.a}
						</p>
					</section>
				))}

				<p className="text-center text-sm text-muted-foreground pt-6">
					For privacy-specific questions see our{" "}
					<Link to="/privacy" className="underline hover:text-primary">
						Privacy Policy
					</Link>{" "}
					or check the{" "}
					<Link to="/changelog" className="underline hover:text-primary">
						changelog
					</Link>{" "}
					to see what we ship.
				</p>
			</main>

			<SiteFooter />
		</div>
	);
}
