"use client";

import {
	FolderKanban,
	Layers,
	Share2,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

const features = [
	{
		id: "1",
		titleKey: "recent.feature.organize.title",
		descKey: "recent.feature.organize.desc",
		icon: FolderKanban,
		color: "from-blue-500 to-blue-600",
		badgeKey: "recent.feature.organize.badge",
	},
	{
		id: "2",
		titleKey: "recent.feature.share.title",
		descKey: "recent.feature.share.desc",
		icon: Share2,
		color: "from-purple-500 to-purple-600",
		badgeKey: "recent.feature.share.badge",
	},
	{
		id: "3",
		titleKey: "recent.feature.permissions.title",
		descKey: "recent.feature.permissions.desc",
		icon: Users,
		color: "from-green-500 to-green-600",
		badgeKey: "recent.feature.permissions.badge",
	},
	{
		id: "4",
		titleKey: "recent.feature.bulk.title",
		descKey: "recent.feature.bulk.desc",
		icon: Layers,
		color: "from-amber-500 to-orange-600",
		badgeKey: null,
	},
	{
		id: "5",
		titleKey: "recent.feature.extension.title",
		descKey: "recent.feature.extension.desc",
		icon: Zap,
		color: "from-primary to-secondary",
		badgeKey: "recent.feature.extension.badge",
	},
];

export function RecentActivity() {
	const { t } = useLanguage();
	return (
		<div className="space-y-3">
			{features.map((feature) => (
				<div
					key={feature.id}
					className={cn(
						"group relative overflow-hidden rounded-xl border p-4 transition-all duration-300",
						"hover:shadow-md hover:-translate-y-0.5",
					)}
				>
					{/* Gradient background on hover */}
					<div
						className={cn(
							"absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
							feature.color,
							"group-hover:opacity-5",
						)}
					/>

					<div className="relative flex items-start gap-3">
						<div
							className={cn(
								"flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
								feature.color,
							)}
						>
							<feature.icon className="h-5 w-5 text-white" />
						</div>

						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-1">
								<h3 className="font-semibold text-sm">{t(feature.titleKey)}</h3>
								{feature.badgeKey && (
									<Badge
										variant="secondary"
										className="text-[10px] px-1.5 py-0 h-4"
									>
										{t(feature.badgeKey)}
									</Badge>
								)}
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed">
								{t(feature.descKey)}
							</p>
						</div>
					</div>
				</div>
			))}

			{/* Pro Tip */}
			<div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
				<div className="flex items-start gap-3">
					<div className="flex-shrink-0">
						<Sparkles className="h-5 w-5 text-primary" />
					</div>
					<div>
						<h4 className="font-semibold text-sm mb-1">{t("recent.tip.title")}</h4>
						<p className="text-xs text-muted-foreground">
							{t("recent.tip.desc")}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
