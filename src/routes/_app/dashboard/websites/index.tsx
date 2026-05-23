import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/components/language-provider";
import { AllWebsitesTable } from "@/components/all-websites-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_app/dashboard/websites/")({
	component: WebsitesPage,
});

function WebsitesPage() {
	const { t } = useLanguage();
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title={t("dashboard.websites.title")}
					description={t("dashboard.websites.desc")}
				/>
			</div>
			<Card>
				<CardContent className="pt-6">
					<AllWebsitesTable />
				</CardContent>
			</Card>
		</div>
	);
}
