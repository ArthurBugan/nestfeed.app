import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Mail, MessageCircle } from "lucide-react";
import { CompactHeader } from "@/components/compact-header";
import { useLanguage } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/contact")({
	component: ContactPage,
	head: () => ({
		meta: [
			{ title: "Contact – Groupify" },
			{
				name: "description",
				content:
					"Get in touch with the Groupify team: email us, join our Discord community or browse the help center for support.",
			},
		],
		links: [{ rel: "canonical", href: "https://groupify.dev/contact" }],
	}),
});

const CHANNELS = [
	{
		icon: Mail,
		titleKey: "contact.email.title",
		descKey: "contact.email.desc",
		href: "mailto:admin@nestfeed.app",
		buttonKey: "contact.email.button",
	},
	{
		icon: MessageCircle,
		titleKey: "contact.community.title",
		descKey: "contact.community.desc",
		href: "https://discord.gg/Hp4MvPanwr",
		buttonKey: "contact.community.button",
	},
	{
		icon: LifeBuoy,
		titleKey: "contact.help.title",
		descKey: "contact.help.desc",
		href: "/support",
		buttonKey: "contact.help.button",
	},
];

function ContactPage() {
	const { t } = useLanguage();

	return (
		<div className="min-h-screen bg-background">
			<CompactHeader />

			<section className="relative overflow-hidden py-16 md:py-24">
				<div className="container mx-auto px-4 relative text-center">
					<Badge variant="secondary" className="gap-1 mb-6">
						{t("contact.badge")}
					</Badge>
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						{t("contact.title")}
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						{t("contact.subtitle")}
					</p>
				</div>
			</section>

			<main className="container mx-auto px-4 pb-16 max-w-4xl">
				<div className="grid md:grid-cols-3 gap-4">
					{CHANNELS.map(
						({ icon: Icon, titleKey, descKey, href, buttonKey }) => (
							<div
								key={titleKey}
								className="rounded-xl border bg-card/50 p-6 space-y-3 flex flex-col items-center text-center"
							>
								<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
									<Icon className="h-5 w-5" aria-hidden="true" />
								</div>
								<h2 className="font-semibold">{t(titleKey)}</h2>
								<p className="text-sm text-muted-foreground leading-relaxed flex-1">
									{t(descKey)}
								</p>
								<Button variant="outline" size="sm" asChild>
									<a
										href={href}
										target={href.startsWith("http") ? "_blank" : undefined}
										rel={
											href.startsWith("http")
												? "noopener noreferrer"
												: undefined
										}
									>
										{t(buttonKey)}
									</a>
								</Button>
							</div>
						),
					)}
				</div>
				<p className="text-center text-sm text-muted-foreground mt-8">
					{t("contact.response")}
				</p>
			</main>

			<SiteFooter />
		</div>
	);
}
