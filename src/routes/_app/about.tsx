import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FolderTree, Share2, ShieldCheck } from "lucide-react";
import { CompactHeader } from "@/components/compact-header";
import { useLanguage } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/about")({
	component: AboutPage,
	head: () => ({
		meta: [
			{ title: "About – Groupify" },
			{
				name: "description",
				content:
					"Learn about Groupify: why we built a better way to organize YouTube channels into groups, who we are, and what drives the product forward.",
			},
		],
		links: [{ rel: "canonical", href: "https://groupify.dev/about" }],
	}),
});

const VALUES = [
	{
		icon: FolderTree,
		titleKey: "about.value1.title",
		descKey: "about.value1.desc",
	},
	{
		icon: Share2,
		titleKey: "about.value2.title",
		descKey: "about.value2.desc",
	},
	{
		icon: ShieldCheck,
		titleKey: "about.value3.title",
		descKey: "about.value3.desc",
	},
];

function AboutPage() {
	const { t } = useLanguage();

	return (
		<div className="min-h-screen bg-background">
			<CompactHeader />

			{/* Hero */}
			<section className="relative overflow-hidden py-16 md:py-24">
				<div className="container mx-auto px-4 relative text-center">
					<Badge variant="secondary" className="gap-1 mb-6">
						{t("about.badge")}
					</Badge>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						{t("about.title")}
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						{t("about.subtitle")}
					</p>
				</div>
			</section>

			<main className="container mx-auto px-4 pb-16 max-w-3xl space-y-12">
				<section>
					<h2 className="text-2xl font-semibold mb-3">
						{t("about.mission.title")}
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						{t("about.mission.text")}
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3">
						{t("about.story.title")}
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						{t("about.story.text")}
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-6">
						{t("about.values.title")}
					</h2>
					<div className="grid sm:grid-cols-3 gap-4">
						{VALUES.map(({ icon: Icon, titleKey, descKey }) => (
							<div
								key={titleKey}
								className="rounded-xl border bg-card/50 p-5 space-y-2"
							>
								<Icon className="h-5 w-5 text-primary" aria-hidden="true" />
								<h3 className="font-semibold text-sm">{t(titleKey)}</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{t(descKey)}
								</p>
							</div>
						))}
					</div>
				</section>

				<section
					aria-labelledby="about-cta"
					className="rounded-xl border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center"
				>
					<h2 className="text-xl font-semibold mb-2">{t("about.cta.title")}</h2>
					<p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
						{t("about.cta.text")}
					</p>
					<div className="flex items-center justify-center gap-3 flex-wrap">
						<Button asChild>
							<a href="/register">
								{t("nav.getstarted")} <ArrowRight className="h-4 w-4" />
							</a>
						</Button>
						<Button variant="outline" asChild>
							<Link to="/contact">{t("footer.contact")}</Link>
						</Button>
					</div>
				</section>
			</main>

			<SiteFooter />
		</div>
	);
}
