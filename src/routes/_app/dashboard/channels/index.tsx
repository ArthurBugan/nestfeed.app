import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/components/language-provider";
import { AllChannelsTable } from "@/components/all-channels-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_app/dashboard/channels/")({
	component: ChannelsPage,
});

function ChannelsPage() {
	const { t } = useLanguage();
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title={t("dashboard.channels.title")}
					description={t("dashboard.channels.desc")}
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
					<AllChannelsTable />
				</CardContent>
			</Card>
		</div>
	);
}
