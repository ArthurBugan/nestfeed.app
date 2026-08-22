import { createFileRoute } from "@tanstack/react-router";
import { CompactHeader } from "@/components/compact-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/_app/changelog")({
	component: ChangelogPage,
	head: () => ({
		meta: [
			{ title: "Changelog – Groupify" },
			{
				name: "description",
				content:
					"What's new in Groupify: a running log of shipped features — groups, share links, groupshelf, video sync, i18n and more.",
			},
		],
		links: [{ rel: "canonical", href: "https://groupify.dev/changelog" }],
	}),
});

const RELEASES: Array<{ date: string; title: string; items: string[] }> = [
	{
		date: "August 2026",
		title: "Site trust & compliance overhaul",
		items: [
			"New About and Contact pages",
			"Cookie consent banner with non-personalized ads by default",
			"SEO cleanup: canonical URLs, per-page descriptions and clean sitemap",
			"Dependency refresh across the whole web app",
		],
	},
	{
		date: "May 2026",
		title: "Onboarding, languages & billing",
		items: [
			"Guided onboarding tour for new accounts",
			"Interface translated to English, Portuguese and Spanish",
			"Language switcher in the sidebar",
			"Invoice history and refreshed billing settings",
		],
	},
	{
		date: "April 2026",
		title: "Groupshelf & channel power tools",
		items: [
			"Groupshelf: browse, share and copy curated group collections",
			"Drag-and-drop reordering for channels",
			"YouTube connect modal with clearer account status",
			"Faster, smarter search across channels and groups",
		],
	},
	{
		date: "February 2026",
		title: "Videos that stay up to date",
		items: [
			"Automatic video sync when you open a group",
			"Paginated, filterable video list per group",
			"Redesigned dashboard built on live data",
		],
	},
	{
		date: "January 2026",
		title: "Sharing & the new blog",
		items: [
			"Share links management page",
			"Blog migrated to the API with server-side search and pagination",
		],
	},
	{
		date: "December 2025",
		title: "Account controls & analytics",
		items: [
			"Account deletion and password update from settings",
			"Billing settings rework",
			"Analytics groundwork: page views and product events",
		],
	},
	{
		date: "October 2025",
		title: "Groups & channels management",
		items: [
			"Full CRUD for groups with pagination and search",
			"Channel management with infinite scroll",
		],
	},
	{
		date: "September 2025",
		title: "The v2 rewrite",
		items: [
			"Migrated the site to TanStack Start",
			"Discord sign-in and password reset flows",
		],
	},
];

function ChangelogPage() {
	return (
		<div className="min-h-screen bg-background">
			<CompactHeader />

			<section className="relative overflow-hidden py-16 md:py-24">
				<div className="container mx-auto px-4 relative text-center">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Changelog
					</h1>
					<p className="text-lg text-muted-foreground max-w-xl mx-auto">
						Everything we ship, in one place. Groupify is under active
						development — here is what changed and when.
					</p>
				</div>
			</section>

			<main className="container mx-auto px-4 pb-16 max-w-3xl">
				<div className="space-y-10">
					{RELEASES.map((release) => (
						<section key={release.date} aria-label={release.title}>
							<div className="flex items-baseline gap-3 mb-3">
								<span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
									{release.date}
								</span>
								<h2 className="text-xl font-semibold">{release.title}</h2>
							</div>
							<ul className="space-y-2 rounded-xl border bg-card/50 p-5">
								{release.items.map((item) => (
									<li
										key={item}
										className="text-sm text-muted-foreground leading-relaxed flex gap-2"
									>
										<span className="text-primary" aria-hidden="true">
											•
										</span>
										{item}
									</li>
								))}
							</ul>
						</section>
					))}
				</div>
			</main>

			<SiteFooter />
		</div>
	);
}
