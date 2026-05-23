import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/dashboard/settings")({
	component: SettingsPage,
});

function SettingsPage() {
	const { t } = useLanguage();
	const [activeTab, setActiveTab] = useState("billing");
	const router = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setActiveTab(location.pathname.split("/")[3]);
	}, [location.pathname]);

	return (
		<div className="space-y-4">
			<h1 className="text-xl font-semibold">{t("settings.title")}</h1>
			<p className="text-sm text-muted-foreground">{t("settings.desc")}</p>

			<Tabs value={activeTab} onValueChange={(v) => router({ to: `/dashboard/settings/${v}` })} className="space-y-4">
				<TabsList className="grid grid-cols-4 w-full bg-muted/30">
					<TabsTrigger value="billing" className="">{t("settings.tab.billing")}</TabsTrigger>
					<TabsTrigger value="account" className="">{t("settings.tab.account")}</TabsTrigger>
					<TabsTrigger value="appearance" className="">{t("settings.tab.appearance")}</TabsTrigger>
					<TabsTrigger value="groups" className="">{t("settings.tab.groups")}</TabsTrigger>
				</TabsList>
				<Outlet />
			</Tabs>
		</div>
	);
}
