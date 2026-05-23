"use client";

import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	CheckCircle2,
	Coffee,
	Heart,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RecommendationCards() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<CrunchyrollIntegrationCard />
			<DonationSupportCard />
		</div>
	);
}

function CrunchyrollIntegrationCard() {
	const { t } = useLanguage();
	return (
		<Card className="overflow-hidden border-orange-200 dark:border-orange-900/50">
			<div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-orange-500/10 rounded-full blur-2xl"></div>
			<div className="absolute bottom-0 left-0 w-32 h-32 -mb-10 -ml-10 bg-orange-500/10 rounded-full blur-2xl"></div>

			<CardHeader className="pb-2">
				<div className="flex justify-between items-center mb-2">
					<Badge
						variant="outline"
						className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800"
					>
						<Sparkles className="h-3 w-3 mr-1 text-orange-500" />
						{t("rec.crunchyroll.badge")}
					</Badge>
					<Badge
						variant="secondary"
						className="bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
					>
						{t("rec.crunchyroll.anime")}
					</Badge>
				</div>
				<CardTitle className="text-xl flex items-center gap-2 text-orange-700 dark:text-orange-400">
					{t("rec.crunchyroll.title")}
				</CardTitle>
				<CardDescription>
					{t("rec.crunchyroll.desc")}
				</CardDescription>
			</CardHeader>

			<CardContent className="pt-2 pb-0">
				<div className="relative h-40 w-full mb-4 rounded-md overflow-hidden border border-orange-200 dark:border-orange-900/50 shadow-sm">
					<img
						src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=3840/CurationAssets/Ani-May/May%202025/ULTRA-WIDE/TheApothecaryDiaries-Animay-2025-UW-LTR.png"
						alt="Crunchyroll website"
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4">
						<div className="text-white text-sm font-medium">
							{t("rec.crunchyroll.overlay")}
						</div>
					</div>
				</div>

				<div className="space-y-3">
					<div className="flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-400">
						<Sparkles className="h-4 w-4" />
						{t("rec.crunchyroll.unlock")}
					</div>

					<div className="grid grid-cols-2 gap-2 text-sm">
						<div className="flex items-start gap-2 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-md">
							<CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
							<div>{t("rec.crunchyroll.feature1")}</div>
						</div>
						<div className="flex items-start gap-2 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-md">
							<CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
							<div>{t("rec.crunchyroll.feature2")}</div>
						</div>
						<div className="flex items-start gap-2 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-md">
							<CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
							<div>{t("rec.crunchyroll.feature3")}</div>
						</div>
						<div className="flex items-start gap-2 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-md">
							<CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
							<div>{t("rec.crunchyroll.feature4")}</div>
						</div>
					</div>

					<div className="text-sm text-muted-foreground">
						{t("rec.crunchyroll.connect")}
					</div>
				</div>
			</CardContent>

			<CardFooter className="pt-4">
				<Button
					className="w-full bg-orange-600 hover:bg-orange-700 text-white"
					asChild
				>
					<Link to="/dashboard/animes">
						{t("rec.crunchyroll.button")} <ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}

function DonationSupportCard() {
	const { t } = useLanguage();
	const [donationType, setDonationType] = useState<"one-time" | "monthly">(
		"one-time",
	);
	const [selectedAmount, setSelectedAmount] = useState<string>("10");

	const handleSelectAmount = (amount: string) => {
		setSelectedAmount(amount);
	};

	const handleSelectType = (type: "one-time" | "monthly") => {
		setDonationType(type);
	};

	return (
		<Card className="border-secondary/20">
			<div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-2xl"></div>

			<CardHeader>
				<CardTitle className="text-xl flex items-center gap-2">
					<Heart className="h-5 w-5 text-primary" />
					{t("rec.support.title")}
				</CardTitle>
				<CardDescription>
					{t("rec.support.desc")}
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="rounded-lg bg-muted p-4 text-sm">
					<p className="mb-2 font-medium">{t("rec.support.text")}</p>
					<ul className="space-y-1 list-disc pl-5">
						<li>{t("rec.support.feature1")}</li>
						<li>{t("rec.support.feature2")}</li>
						<li>{t("rec.support.feature3")}</li>
						<li>{t("rec.support.feature4")}</li>
					</ul>
				</div>

				<div className="space-y-3">
					<div className="flex rounded-md overflow-hidden border">
						<button
							className={cn(
								"flex-1 py-2 text-sm font-medium transition-colors",
								donationType === "one-time"
									? "bg-primary text-primary"
									: "bg-muted hover:bg-muted/80",
							)}
							type="button"
							onClick={() => handleSelectType("one-time")}
						>
							{t("rec.support.onetime")}
						</button>
						<button
							className={cn(
								"flex-1 py-2 text-sm font-medium transition-colors",
								donationType === "monthly"
									? "bg-primary text-primary"
									: "bg-muted hover:bg-muted/80",
							)}
							type="button"
							onClick={() => handleSelectType("monthly")}
						>
							{t("rec.support.monthly")}
						</button>
					</div>

					{donationType === "one-time" ? (
						<div className="grid grid-cols-3 gap-2">
							{["5", "10", "25"].map((amount) => (
								<button
									key={amount}
									type="button"
									onClick={() => handleSelectAmount(amount)}
									className={cn(
										"flex flex-col h-auto py-3 rounded-md border transition-all",
										selectedAmount === amount
											? "border-primary bg-primary/5 ring-1 ring-primary"
											: "border-border bg-background hover:bg-muted",
									)}
								>
									<span className="text-lg font-bold">${amount}</span>
									<span className="text-xs text-muted-foreground">
										{t("rec.support.onetime")}
									</span>
								</button>
							))}
						</div>
					) : (
						<div className="grid grid-cols-2 gap-2">
							{["5", "10"].map((amount) => (
								<button
									key={amount}
									type="button"
									onClick={() => handleSelectAmount(amount)}
									className={cn(
										"flex flex-col h-auto py-3 rounded-md border transition-all",
										selectedAmount === amount
											? "border-primary bg-primary/5 ring-1 ring-primary"
											: "border-border bg-background hover:bg-muted",
									)}
								>
									<span className="text-lg font-bold">${amount}</span>
									<span className="text-xs text-muted-foreground">{t("rec.support.monthly")}</span>
								</button>
							))}
						</div>
					)}

					<div className="text-center text-sm text-muted-foreground">
						{donationType === "monthly"
							? t("rec.support.cancel")
							: t("rec.support.secure")}
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col gap-2">
				<Button variant={"secondary"} onClick={() => {
					window.open(`https://ko-fi.com/scriptingarthur?amount=${selectedAmount}`)
				}} className="w-full" type="button">
					<Coffee className="mr-2 h-4 w-4" />
					{t("rec.support.donate", { amount: selectedAmount, type: donationType === "monthly" ? t("rec.support.monthly").toLowerCase() : "" })}
				</Button>
				<p className="text-xs text-center text-muted-foreground">
					{t("rec.support.footer")}
				</p>
			</CardFooter>
		</Card>
	);
}
