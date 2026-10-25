"use client";

import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Play, Sparkles, Star } from "lucide-react";
import { GithubIcon, YoutubeIcon } from "@/components/brand-icons";
import {
	AppStoreIcon,
	ChromeIcon,
	FirefoxIcon,
	GooglePlayIcon,
} from "@/components/store-icons";
import { SiteFooter } from "@/components/site-footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CompactHeader } from "./compact-header";
import { useLanguage } from "./language-provider";

// Reusable section wrapper: reveals on scroll via scroll-driven CSS animation
// (progressive enhancement — falls back to static content).
function RevealSection({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <div className={cn("reveal-view", className)}>{children}</div>;
}

function AnimatedBackground() {
	return (
		<div className="absolute inset-0 -z-10 overflow-hidden">
			<div className="anim-orb absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
			<div className="anim-orb anim-orb-b absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-3xl" />
			<div className="anim-orb anim-orb-c absolute bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl" />
		</div>
	);
}

function CompactCard({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-[box-shadow,transform] duration-200",
				className,
			)}
		>
			{children}
		</div>
	);
}

// Shared CTA hover/tap behaviour (replaces framer-motion pointers)
const ctaMotion =
	"transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]";

export function LandingPage() {
	const { t } = useLanguage();

	const features = [
		{
			icon: "📁",
			title: t("landing.features.smart.title"),
			desc: t("landing.features.smart.desc"),
			tag: "Core",
		},
		{
			icon: "↗️",
			title: t("landing.features.share.title"),
			desc: t("landing.features.share.desc"),
			tag: "Popular",
		},
		{
			icon: "👥",
			title: t("landing.features.permissions.title"),
			desc: t("landing.features.permissions.desc"),
			tag: "Pro",
		},
		{
			icon: "📦",
			title: t("landing.features.bulk.title"),
			desc: t("landing.features.bulk.desc"),
		},
		{
			icon: "⚡",
			title: t("landing.features.extension.title"),
			desc: t("landing.features.extension.desc"),
			tag: "New",
		},
		{
			icon: "🌐",
			title: t("landing.features.everywhere.title"),
			desc: t("landing.features.everywhere.desc"),
		},
	];

	const testimonials = [
		{
			name: "Alex Johnson",
			role: "Content Creator",
			content: t("landing.testimonials.alex.content"),
		},
		{
			name: "Sarah Chen",
			role: "Marketing Manager",
			content: t("landing.testimonials.sarah.content"),
		},
		{
			name: "Mike Rodriguez",
			role: "YouTube Strategist",
			content: t("landing.testimonials.mike.content"),
		},
	];

	const stats = [
		{ value: "10K+", label: "Users" },
		{ value: "500K+", label: "Channels" },
		{ value: "50K+", label: "Groups" },
		{ value: "99.9%", label: "Uptime" },
	];

	const pricing = [
		{
			name: t("landing.pricing.free.name"),
			price: "$0",
			period: "forever",
			desc: t("pricing.free.desc"),
			features: ["Up to 3 groups", "Up to 20 channels", "Basic organization"],
			cta: t("landing.pricing.cta.free"),
		},
		{
			name: t("landing.pricing.pro.name"),
			price: "$3.99",
			period: "month",
			desc: t("pricing.pro.desc"),
			features: [
				"Up to 10 groups",
				"Up to 1,000 channels",
				"Subgroups",
				"Share groups",
			],
			cta: t("landing.pricing.cta.pro"),
			popular: true,
		},
		{
			name: t("landing.pricing.business.name"),
			price: "$9.99",
			period: "month",
			desc: t("pricing.business.desc"),
			features: [
				"Unlimited groups",
				"Unlimited channels",
				"Team collaboration",
				"API access",
			],
			cta: t("landing.pricing.cta.business"),
		},
	];

	return (
		<div className="min-h-screen bg-background">
			<AnimatedBackground />
			<CompactHeader />

			{/* Hero */}
			<section className="relative py-20 lg:py-28">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center space-y-6">
						<div className="reveal-t">
							<Badge
								variant="outline"
								className="gap-1 bg-primary/10 border-primary/30 text-primary"
							>
								<Sparkles className="h-3 w-3" /> {t("landing.hero.badge")}
							</Badge>
						</div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
							{t("landing.hero.title")}
						</h1>
						<p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
							{t("landing.hero.subtitle")}
						</p>
						<div
							className={cn(
								"reveal-t flex flex-col sm:flex-row gap-3 justify-center pt-2",
							)}
							style={{ animationDelay: "120ms" }}
						>
							<div className={ctaMotion}>
								<Button
									size="lg"
									className="bg-primary hover:bg-primary/90 shadow-md"
									asChild
								>
									<Link to="/register">
										{t("landing.hero.cta.primary")}{" "}
										<span className="anim-nudge inline-block">
											<ArrowRight className="ml-2 h-4 w-4" />
										</span>
									</Link>
								</Button>
							</div>
							<div className={ctaMotion}>
								<Button size="lg" variant="outline" asChild>
									<a
										href="https://youtu.be/Hz-F6q0SZqU"
										target="_blank"
										rel="noopener"
									>
										<Play className="mr-2 h-4 w-4" />{" "}
										{t("landing.hero.cta.secondary")}
									</a>
								</Button>
							</div>
						</div>
						<RevealSection className="flex items-center justify-center gap-8 pt-6 text-sm text-muted-foreground">
							{stats.map((s) => (
								<div key={s.label} className="text-center">
									<div className="font-semibold text-foreground">{s.value}</div>
									<div>{s.label}</div>
								</div>
							))}
						</RevealSection>
					</div>

					{/* Preview */}
					<div className="mt-16 max-w-4xl mx-auto">
						<div className="reveal-t" style={{ animationDelay: "240ms" }}>
							<CompactCard className="border-muted/50">
								<div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30 rounded-t-xl">
									<div className="flex gap-1.5">
										<div className="w-2.5 h-2.5 rounded-full bg-primary" />
										<div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
										<div className="w-2.5 h-2.5 rounded-full bg-green-500" />
									</div>
									<span className="text-xs text-muted-foreground ml-2">
										{t("landing.hero.preview")}
									</span>
								</div>
								<div className="p-4 space-y-2">
									{[
										{ name: "Tech Reviews", channels: 12 },
										{ name: "Cooking", channels: 8 },
										{ name: "Gaming", channels: 15 },
									].map((g, idx) => (
										<div
											key={g.name}
											className="reveal-t flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
											style={{ animationDelay: `${240 + idx * 90}ms` }}
										>
											<div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
												<YoutubeIcon className="h-4 w-4 text-white" />
											</div>
											<div className="flex-1">
												<div className="text-sm font-medium">{g.name}</div>
												<div className="text-xs text-muted-foreground">
													{g.channels} channels
												</div>
											</div>
										</div>
									))}
								</div>
							</CompactCard>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section id="features" className="py-16 lg:py-20">
				<div className="container mx-auto px-4">
					<RevealSection>
						<div className="text-center mb-12 space-y-3">
							<Badge variant="outline" className="bg-muted/50">
								{t("features.badge")}
							</Badge>
							<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
								{t("landing.features.title")}
							</h2>
							<p className="text-lg text-muted-foreground max-w-xl mx-auto">
								{t("landing.features.subtitle")}
							</p>
						</div>
					</RevealSection>
					<RevealSection className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{features.map((f) => (
							<div key={f.title}>
								<CompactCard className="p-4 hover:border-primary/30 transition-colors">
									<div className="flex items-start justify-between mb-3">
										<span className="text-2xl inline-block transition-transform duration-200 hover:scale-125 hover:rotate-12">
											{f.icon}
										</span>
										{f.tag && (
											<Badge
												variant="secondary"
												className="text-xs bg-muted/60"
											>
												{f.tag}
											</Badge>
										)}
									</div>
									<h3 className="font-semibold text-base mb-1.5">{f.title}</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{f.desc}
									</p>
								</CompactCard>
							</div>
						))}
					</RevealSection>
				</div>
			</section>

			{/* Extension */}
			<section id="integrations" className="py-16 bg-muted/20">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
						<RevealSection>
							<div className="space-y-4">
								<Badge
									variant="secondary"
									className="gap-1 bg-primary/10 text-primary-foreground dark:text-primary-foreground"
								>
									<Sparkles className="h-3 w-3" />{" "}
									{t("landing.extension.badge")}
								</Badge>
								<h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
									{t("landing.extension.title")}
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									{t("landing.extension.subtitle")}
								</p>
								<div className="flex items-center gap-3">
									{[
										{
											href: "https://chromewebstore.google.com/detail/groupify-youtube-organize/dmdgaegnpjnnkcbdngfgkhlehlccbija",
											Icon: ChromeIcon,
											title: "Available on Chrome Web Store",
										},
										{
											href: "https://addons.mozilla.org/en-US/firefox/addon/groupify-yt-organize",
											Icon: FirefoxIcon,
											title: "Available on Firefox Add-ons",
										},
										{
											href: "https://play.google.com/store/apps/details?id=com.groupifyapp",
											Icon: GooglePlayIcon,
											title: "Get it on Google Play",
										},
										{
											href: "https://apps.apple.com/br/app/groupify-yt-subscriptions/id6714452813",
											Icon: AppStoreIcon,
											title: "Available on the App Store",
										},
									].map((browser, idx) => (
										<div
											key={browser.title}
											className="reveal-t"
											style={{ animationDelay: `${idx * 90}ms` }}
											title={browser.title}
										>
											<Button
												variant="outline"
												size="icon"
												asChild
												className="h-12 w-12 rounded-xl border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
											>
												<a href={browser.href} title={browser.title}>
													<browser.Icon className="h-6 w-6" />
												</a>
											</Button>
										</div>
									))}
								</div>
							</div>
						</RevealSection>
						<RevealSection>
							<CompactCard className="p-4">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
										<YoutubeIcon className="h-5 w-5 text-white" />
									</div>
									<div>
										<div className="font-medium text-sm">Marques Brownlee</div>
										<div className="text-xs text-muted-foreground">
											17.5M {t("landing.extension.subscribers")}
										</div>
									</div>
								</div>
								<div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20">
									<Check className="h-4 w-4 text-green-600 flex-shrink-0" />
									<span className="text-sm font-medium">
										Added to Tech Reviews
									</span>
								</div>
							</CompactCard>
						</RevealSection>
					</div>
				</div>
			</section>

			{/* GitHub Repos */}
			<section className="py-16 bg-muted/20">
				<div className="container mx-auto px-4">
					<RevealSection>
						<div className="text-center mb-8 space-y-3">
							<Badge variant="outline" className="bg-muted/50">
								<GithubIcon className="h-3 w-3 mr-1" /> Open Source
							</Badge>
							<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
								Star Us on GitHub
							</h2>
							<p className="text-lg text-muted-foreground max-w-xl mx-auto">
								Help us grow by starring our repositories!
							</p>
						</div>
					</RevealSection>
					<RevealSection className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
						{[
							{
								name: "Browser Extension",
								desc: "Chrome, Firefox & Safari extension",
								href: "https://github.com/ArthurBugan/nestfeed.extension",
							},
							{
								name: "API Server",
								desc: "Backend API built with Axum",
								href: "https://github.com/ArthurBugan/api.nestfeed",
							},
							{
								name: "Website",
								desc: "React website with TanStack",
								href: "https://github.com/ArthurBugan/nestfeed.app",
							},
							{
								name: "App",
								desc: "React Native Android / iOS app",
								href: "https://github.com/ArthurBugan/nestfeed.application",
							},
						].map((repo) => (
							<div key={repo.name}>
								<CompactCard className="p-4 hover:border-primary/30 transition-colors">
									<div className="flex items-center gap-3 mb-3">
										<div className="w-10 h-10 rounded-lg bg-red-primary/10 flex items-center justify-center transition-transform duration-200 hover:rotate-12 hover:scale-110">
											<GithubIcon className="h-5 w-5 text-primary" />
										</div>
										<div className="font-medium">{repo.name}</div>
									</div>
									<p className="text-sm text-muted-foreground mb-3">
										{repo.desc}
									</p>
									<Button
										variant="outline"
										size="sm"
										className="w-full"
										asChild
									>
										<a
											href={repo.href}
											target="_blank"
											rel="noopener noreferrer"
										>
											<span className="flex items-center gap-2">
												<Star className="h-4 w-4" /> Star Repository
											</span>
										</a>
									</Button>
								</CompactCard>
							</div>
						))}
					</RevealSection>
				</div>
			</section>

			{/* Testimonials */}
			<section id="testimonials" className="py-16 lg:py-20">
				<div className="container mx-auto px-4">
					<RevealSection>
						<div className="text-center mb-12 space-y-3">
							<Badge variant="outline">{t("testimonials.badge")}</Badge>
							<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
								{t("landing.testimonials.title")}
							</h2>
						</div>
					</RevealSection>
					<RevealSection className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
						{testimonials.map((tm) => (
							<div key={tm.name}>
								<CompactCard className="p-4 space-y-3">
									<div className="flex items-center gap-1 text-yellow-500">
										{[1, 2, 3, 4, 5].map((n) => (
											<Star key={n} className="h-3.5 w-3.5 fill-current" />
										))}
									</div>
									<p className="text-sm leading-relaxed">"{tm.content}"</p>
									<div className="flex items-center gap-2 pt-2 border-t">
										<Avatar className="h-6 w-6">
											<AvatarImage src="/placeholder.svg" alt="" />
											<AvatarFallback className="text-xs bg-muted text-muted-foreground">
												{tm.name.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className="text-sm font-medium">{tm.name}</div>
											<div className="text-xs text-muted-foreground">
												{tm.role}
											</div>
										</div>
									</div>
								</CompactCard>
							</div>
						))}
					</RevealSection>
				</div>
			</section>

			{/* Pricing */}
			<section id="pricing" className="py-16 lg:py-20 bg-muted/20">
				<div className="container mx-auto px-4">
					<RevealSection>
						<div className="text-center mb-12 space-y-3">
							<Badge variant="outline">{t("pricing.badge")}</Badge>
							<h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
								{t("landing.pricing.title")}
							</h2>
						</div>
					</RevealSection>
					<RevealSection className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
						{pricing.map((p) => (
							<div
								key={p.name}
								className={cn(
									p.popular &&
										"transition-transform duration-200 hover:scale-[1.02]",
								)}
							>
								<CompactCard
									className={cn(
										"p-4 flex flex-col",
										p.popular && "border-primary/50 shadow-md",
									)}
								>
									{p.popular && (
										<div>
											<Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
												<Sparkles className="h-3 w-3 mr-1" />
												Most Popular
											</Badge>
										</div>
									)}
									<div className="text-center mb-4">
										<h3 className="font-semibold">{p.name}</h3>
										<div className="mt-1 flex items-baseline justify-center gap-1">
											<span className="text-2xl font-bold">{p.price}</span>
											<span className="text-sm text-muted-foreground">
												/{p.period}
											</span>
										</div>
										<p className="text-xs text-muted-foreground mt-1.5">
											{p.desc}
										</p>
									</div>
									<ul className="space-y-2 mb-4 flex-1">
										{p.features.map((f) => (
											<li key={f} className="flex items-center gap-2 text-sm">
												<Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />{" "}
												{f}
											</li>
										))}
									</ul>
									<div className={ctaMotion}>
										<Button
											size="sm"
											variant={p.popular ? "default" : "outline"}
											className={cn(
												"w-full",
												p.popular &&
													"bg-emerald-800! text-white! hover:bg-emerald-700!",
											)}
											asChild
										>
											<Link to="/register">{p.cta}</Link>
										</Button>
									</div>
								</CompactCard>
							</div>
						))}
					</RevealSection>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<RevealSection>
						<CompactCard className="p-8 lg:p-12 bg-gradient-to-r from-primary via-secondary to-primary text-white border-0">
							<div className="text-center max-w-2xl mx-auto space-y-4">
								<h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
									{t("landing.cta.title")}
								</h2>
								<p className="text-white/90">{t("landing.cta.subtitle")}</p>
								<div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
									<div className={ctaMotion}>
										<Button
											size="lg"
											variant="secondary"
											className="bg-white! text-slate-900! hover:bg-white/90!"
											asChild
										>
											<Link to="/register">
												{t("landing.cta.primary")}{" "}
												<span className="anim-nudge inline-block">
													<ArrowRight className="ml-2 h-4 w-4" />
												</span>
											</Link>
										</Button>
									</div>
									<div className={ctaMotion}>
										<Button
											size="lg"
											variant="outline"
											className="bg-white! text-slate-900! hover:bg-white/90!"
											asChild
										>
											<a href="https://discord.gg/Hp4MvPanwr">
												{t("landing.cta.secondary")}
											</a>
										</Button>
									</div>
								</div>
							</div>
						</CompactCard>
					</RevealSection>
				</div>
			</section>

			{/* Footer */}
			<SiteFooter showBadges />
		</div>
	);
}
