import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/components/language-provider";
import { AllAnimesTable } from "@/components/all-animes-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_app/dashboard/animes/")({
	component: AnimeChannelsPage,
});

function AnimeChannelsPage() {
	const { t } = useLanguage();
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title={t("dashboard.animes.title")}
					description={t("dashboard.animes.desc")}
				/>
			</div>
			<Card>
				<CardContent className="pt-6">
					<div className="flex justify-center py-4">
						<ins
							className="adsbygoogle"
							style={{
								display: "inline-block",
								width: "728px",
								height: "90px",
							}}
							data-ad-client="ca-pub-4077364511521347"
							data-ad-slot="5153442110"
						></ins>
					</div>
					<AllAnimesTable />
				</CardContent>
			</Card>
		</div>
	);
}
