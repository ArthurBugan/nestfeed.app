"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { YoutubeIcon } from "@/components/brand-icons";
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

interface YouTubeConnectModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function YouTubeConnectModal({
	open,
	onOpenChange,
}: YouTubeConnectModalProps) {
	const navigate = useNavigate();
	const { t } = useLanguage();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<YoutubeIcon className="h-5 w-5 text-red-50" />
						{t("youtube.connect.title")}
					</DialogTitle>
					<DialogDescription>{t("youtube.connect.desc")}</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{t("youtube.connect.body")}
					</p>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						{t("youtube.connect.later")}
					</Button>
					<Button
						variant="secondary"
						onClick={() => {
							onOpenChange(false);
							navigate({ to: "/dashboard/settings/account" });
						}}
					>
						{t("youtube.connect.settings")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
