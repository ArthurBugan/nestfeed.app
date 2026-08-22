"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface UpgradePlanModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	type: "channel" | "group";
}

export function UpgradePlanModal({
	open,
	onOpenChange,
	type,
}: UpgradePlanModalProps) {
	const navigate = useNavigate();
	const { t } = useLanguage();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<AlertTriangle className="h-5 w-5 text-amber-500" />
						{t("upgrade.title")}
					</DialogTitle>
					<DialogDescription>
						{type === "channel"
							? t("upgrade.desc.channels")
							: t("upgrade.desc.groups")}
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{type === "channel"
							? t("upgrade.body.channels")
							: t("upgrade.body.groups")}
					</p>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						{t("upgrade.cancel")}
					</Button>
					<Button
						variant="secondary"
						onClick={() => {
							onOpenChange(false);
							navigate({ to: "/dashboard/settings/billing" });
						}}
					>
						{t("upgrade.button")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
