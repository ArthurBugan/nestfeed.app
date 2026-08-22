import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie-consent";

declare global {
	interface Window {
		adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: number };
	}
}

export type ConsentChoice = "all" | "npa";

function applyAdPreference(choice: ConsentChoice | null) {
	if (typeof window === "undefined") return;
	window.adsbygoogle ??= [];
	if (choice !== "all") {
		// Non-personalized ads until explicit consent
		window.adsbygoogle.requestNonPersonalizedAds = 1;
	}
}

export function getConsent(): ConsentChoice | null {
	if (typeof window === "undefined") return null;
	const value = window.localStorage.getItem(STORAGE_KEY);
	return value === "all" || value === "npa" ? value : null;
}

export function CookieConsent() {
	const { t } = useLanguage();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const stored = getConsent();
		applyAdPreference(stored);
		if (!stored) setVisible(true);
	}, []);

	function choose(choice: ConsentChoice) {
		window.localStorage.setItem(STORAGE_KEY, choice);
		applyAdPreference(choice);
		setVisible(false);
	}

	if (!visible) return null;

	return (
		<div
			role="dialog"
			aria-live="polite"
			aria-label={t("consent.title")}
			className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 p-4 shadow-lg"
		>
			<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
				<div className="flex-1">
					<p className="text-sm font-medium mb-0.5">{t("consent.title")}</p>
					<p className="text-xs text-muted-foreground leading-relaxed">
						{t("consent.text")}{" "}
						<Link to="/privacy" className="underline hover:text-primary">
							{t("consent.learnMore")}
						</Link>
					</p>
				</div>
				<div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
					<Button variant="outline" size="sm" onClick={() => choose("npa")}>
						{t("consent.reject")}
					</Button>
					<Button size="sm" onClick={() => choose("all")}>
						{t("consent.accept")}
					</Button>
				</div>
			</div>
		</div>
	);
}
