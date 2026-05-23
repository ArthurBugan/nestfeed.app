import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { GroupsTable } from "@/components/groups-table";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { UpgradePlanModal } from "@/components/upgrade-plan-modal";
import { useLanguage } from "@/components/language-provider";
import { useGroups } from "@/hooks/useQuery/useGroups";
import { useUser } from "@/hooks/useQuery/useUser";

export const Route = createFileRoute("/_app/dashboard/groups/")({
	component: GroupsPage,
});

function GroupsPage() {
	const { t } = useLanguage();
	const navigate = useNavigate();
	const { isLoading, error } = useGroups({
		page: 1,
		limit: 25,
	});
	const { data: user } = useUser();
	const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

	const handleNewGroup = () => {
		if (user?.canAddGroup === false) {
			setUpgradeModalOpen(true);
		} else {
			navigate({ to: "/dashboard/groups/new", search: { parentId: "" } });
		}
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<DashboardHeader
						title={t("groups.title")}
						description={t("groups.description")}
					/>
					<Button
						className="bg-primary hover:bg-primary/90 text-white"
						type="button"
						onClick={handleNewGroup}
						data-tour="new-group-btn"
					>
						<Plus className="mr-2 h-4 w-4" />
						{t("groups.new")}
					</Button>
				</div>
				<Card>
					<CardContent className="flex items-center justify-center py-12">
						<div className="flex items-center space-x-2">
							<Loader2 className="h-6 w-6 animate-spin" />
							<span className="text-sm text-muted-foreground">
								{t("groups.loading")}
							</span>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<DashboardHeader
						title={t("groups.title")}
						description={t("groups.description")}
					/>
					<Button
						className="bg-primary hover:bg-primary/90 text-white"
						type="button"
						onClick={handleNewGroup}
						data-tour="new-group-btn"
					>
						<Plus className="mr-2 h-4 w-4" />
						{t("groups.new")}
					</Button>
				</div>
				<Card>
					<CardHeader>
						<CardTitle className="text-red-600">{t("groups.error.title")}</CardTitle>
						<CardDescription>
							{error.message || t("groups.error.description")}
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardHeader
					title={t("groups.title")}
					description={t("groups.description")}
				/>
				<Button
					className="bg-primary hover:bg-primary/90 text-white"
					type="button"
					onClick={handleNewGroup}
				data-tour="new-group-btn"
				>
					<Plus className="mr-2 h-4 w-4" />
					{t("groups.new")}
				</Button>
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
					<GroupsTable />
				</CardContent>
			</Card>
			{user?.canAddGroup === false && (
				<UpgradePlanModal
					open={upgradeModalOpen}
					onOpenChange={setUpgradeModalOpen}
					type="group"
				/>
			)}
		</div>
	);
}
