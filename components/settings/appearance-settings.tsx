"use client";

import { Flame, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { useTheme } from "@/components/theme-provider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AppearanceSettings() {
	const { t } = useLanguage();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<div className="space-y-4">
			{/* Theme */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-1">{t("appearance.theme")}</h2>
				<RadioGroup value={theme} onValueChange={setTheme}>
					<div className="grid gap-2">
						<label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
							<RadioGroupItem value="light" />
							<Sun className="h-5 w-5 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">{t("appearance.light")}</p>
							</div>
						</label>
						<label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
							<RadioGroupItem value="dark" />
							<Moon className="h-5 w-5 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">{t("appearance.dark")}</p>
							</div>
						</label>
						<label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
							<RadioGroupItem value="groupify" />
							<Flame className="h-5 w-5 text-primary" />
							<div>
								<p className="text-sm font-medium">
									{t("appearance.nestfeed")}
								</p>
							</div>
						</label>
					</div>
				</RadioGroup>
			</div>
		</div>
	);
}
