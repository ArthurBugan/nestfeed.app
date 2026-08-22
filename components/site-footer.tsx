import { Link } from "@tanstack/react-router";
import { YoutubeIcon } from "@/components/brand-icons";
import { useLanguage } from "@/components/language-provider";

const BADGES = [
	{
		href: "https://acidtools.com",
		src: "https://acidtools.com/assets/images/badge-dark.png",
		alt: "Acid Tools",
	},
	{
		href: "https://www.foundrlist.com/product/groupify-2?utm_source=badge&utm_medium=embed",
		src: "https://www.foundrlist.com/api/badge/groupify-2",
		alt: "Featured on FoundrList",
		width: 150,
	},
	{
		href: "https://peerpush.net/p/groupify",
		src: "https://peerpush.net/p/groupify/badge.png",
		alt: "Groupify badge",
	},
];

export function SiteFooter({ showBadges = false }: { showBadges?: boolean }) {
	const { t } = useLanguage();

	return (
		<footer className="border-t py-12">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-4 gap-8 mb-8 max-w-5xl mx-auto">
					<div>
						<div className="flex items-center gap-2 mb-3">
							<YoutubeIcon className="h-4 w-4 text-primary" />
							<span className="font-semibold">Groupify</span>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed">
							{t("footer.tagline")}
						</p>
					</div>
					<nav aria-label={t("footer.product")}>
						<h4 className="font-medium mb-3">{t("footer.product")}</h4>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link to="/dashboard" className="hover:text-foreground">
									{t("nav.dashboard")}
								</Link>
							</li>
							<li>
								<a href="/#features" className="hover:text-foreground">
									{t("nav.features")}
								</a>
							</li>
							<li>
								<a href="/#pricing" className="hover:text-foreground">
									{t("nav.pricing")}
								</a>
							</li>
						</ul>
					</nav>
					<nav aria-label={t("footer.resources")}>
						<h4 className="font-medium mb-3">{t("footer.resources")}</h4>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link to="/blog" className="hover:text-foreground">
									{t("nav.blog")}
								</Link>
							</li>
							<li>
								<Link to="/support" className="hover:text-foreground">
									{t("footer.helpcenter")}
								</Link>
							</li>
							<li>
								<a
									href="https://discord.gg/Hp4MvPanwr"
									target="_blank"
									className="hover:text-foreground"
									rel="noopener noreferrer"
								>
									{t("footer.community")}
								</a>
							</li>
							<li>
								<Link to="/contact" className="hover:text-foreground">
									{t("footer.contact")}
								</Link>
							</li>
							<li>
								<Link to="/faq" className="hover:text-foreground">
									{t("footer.faq")}
								</Link>
							</li>
							<li>
								<Link to="/changelog" className="hover:text-foreground">
									{t("footer.changelog")}
								</Link>
							</li>
						</ul>
					</nav>
					<nav aria-label={t("footer.company")}>
						<h4 className="font-medium mb-3">{t("footer.company")}</h4>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link to="/about" className="hover:text-foreground">
									{t("footer.about")}
								</Link>
							</li>
							<li>
								<Link to="/privacy" className="hover:text-foreground">
									{t("footer.privacy")}
								</Link>
							</li>
							<li>
								<Link to="/terms" className="hover:text-foreground">
									{t("footer.terms")}
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto text-sm text-muted-foreground">
					<p>© {new Date().getFullYear()} Groupify. All rights reserved.</p>
					{showBadges && (
						<div className="flex items-center gap-3 flex-shrink-0">
							{BADGES.map((badge) => (
								<a
									key={badge.href}
									href={badge.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={badge.src}
										alt={badge.alt}
										width={badge.width}
										height={48}
										className="h-12 max-w-[120px]"
										loading="lazy"
									/>
								</a>
							))}
						</div>
					)}
				</div>
			</div>
		</footer>
	);
}
