"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Clock, Copy, Users } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useConsumeShareLink, useShareLink } from "@/hooks/useQuery/useShare";

export const Route = createFileRoute("/_app/share/$type/$id/")({
	component: ShareLinkPage,
});

function ShareLinkPage() {
	const { t } = useLanguage();
	const { id, type } = Route.useParams();
	const router = useNavigate();
	const { data: shareLink, isLoading, error } = useShareLink(id);
	const { mutate: consumeShareLink, isPending: isConsuming } =
		useConsumeShareLink();
	const [isExpired, setIsExpired] = useState(false);

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-center">
							{t("share.loading.title")}
						</CardTitle>
						<CardDescription className="text-center">
							{t("share.loading.desc")}
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-center text-destructive flex items-center justify-center gap-2">
							{isExpired && <Clock className="h-5 w-5" />}
							{isExpired ? t("share.error.expired") : t("share.error.title")}
						</CardTitle>
						<CardDescription className="text-center">
							{isExpired
								? t("share.error.expired.desc")
								: t("share.error.loading.desc")}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{isExpired && (
							<Alert>
								<AlertTriangle className="h-4 w-4" />
								<AlertDescription>{t("share.alert.expired")}</AlertDescription>
							</Alert>
						)}
					</CardContent>
					<CardFooter>
						<Button
							className="w-full"
							onClick={() => router({ to: "/dashboard" })}
						>
							{t("share.button.dashboard")}
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	function handleJoinCollaboration() {
		consumeShareLink({
			linkCode: id,
			linkType: type,
		});
	}

	function handleCopyGroup() {
		consumeShareLink({
			linkCode: id,
			linkType: type,
		});
	}

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>
						{type !== "copy" ? t("share.card.collab") : t("share.card.copy")}
					</CardTitle>
					<CardDescription>
						{type !== "copy"
							? t("share.card.collab.desc", {
									name: shareLink?.groupName || "a group",
								})
							: t("share.card.copy.desc", {
									name: shareLink?.groupName || "a group",
								})}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="font-medium">
								{shareLink?.groupName || t("share.group.unknown")}
							</h3>
							<Badge>
								{shareLink?.groupDescription || t("share.label.unknown")}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							{shareLink?.groupDescription || t("share.desc.none")}
						</p>
					</div>

					<Separator />

					<div className="space-y-2">
						<div className="flex justify-between">
							<span className="text-sm text-muted-foreground">
								{t("share.channels")}
							</span>
							<span className="font-medium">
								{shareLink?.channelCount || "0"}
							</span>
						</div>

						<div className="max-h-32 overflow-y-auto border rounded-md p-2">
							<div className="space-y-1">
								{shareLink?.channels?.map((channel) => (
									<div
										key={channel.id}
										className="flex justify-between text-sm"
									>
										<span>{channel.name}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{type !== "copy" ? (
						<Alert>
							<Users className="h-4 w-4" />
							<AlertDescription>
								{t("share.permission.alert", {
									permission: shareLink?.permission || "",
								})}
								{shareLink?.permission === "view" && t("share.permission.view")}
								{shareLink?.permission === "edit" && t("share.permission.edit")}
								{shareLink?.permission === "admin" &&
									t("share.permission.admin")}
							</AlertDescription>
						</Alert>
					) : (
						<div className="space-y-4">
							<Alert>
								<Copy className="h-4 w-4" />
								<AlertDescription>
									{t("share.copy.alert", {
										count: String(shareLink?.channelCount || "0"),
									})}
								</AlertDescription>
							</Alert>
						</div>
					)}
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button
						variant="outline"
						onClick={() => router({ to: "/dashboard" })}
					>
						{t("share.cancel")}
					</Button>
					<Button
						variant="secondary"
						onClick={
							type !== "copy" ? handleJoinCollaboration : handleCopyGroup
						}
						disabled={isLoading || isConsuming}
					>
						{isLoading || isConsuming
							? type !== "copy"
								? t("share.joining")
								: t("share.copying")
							: type !== "copy"
								? t("share.join")
								: t("share.copy.btn")}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
