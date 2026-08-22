"use client";

import {
	AlertTriangle,
	Eye,
	EyeOff,
	Link,
	RefreshCw,
	Shield,
	Trash2,
	Unlink,
} from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { useTourController } from "@/components/onboarding-tour";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	useDeleteAccountMutation,
	useUpdatePasswordMutation,
} from "@/hooks/mutations/useAuthMutations";
import {
	useCheckDiscordSession,
	useCheckGoogleSession,
	useDisconnectDiscordSession,
	useDisconnectGoogleSession,
} from "@/hooks/useQuery/useSocialLogin";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export function AccountSettings() {
	const { t } = useLanguage();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState("");
	const [acknowledgeDataLoss, setAcknowledgeDataLoss] = useState(false);
	const [acknowledgeNoRecovery, setAcknowledgeNoRecovery] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { data: discordSession } = useCheckDiscordSession();
	const { data: googleSession } = useCheckGoogleSession();
	const disconnectGoogleMutation = useDisconnectGoogleSession();
	const disconnectDiscordMutation = useDisconnectDiscordSession();
	const deleteAccountMutation = useDeleteAccountMutation();
	const { mutateAsync: updatePasswordMutation, isPending: passwordMutation } =
		useUpdatePasswordMutation();

	const [socialConnections, setSocialConnections] = useState({
		discord: { connected: false, expired: false },
		google: { connected: false, expired: false },
	});

	const { resetTour } = useTourController();

	const handleRedoTour = () => {
		resetTour();
	};

	useEffect(() => {
		if (discordSession)
			setSocialConnections((p) => ({
				...p,
				discord: {
					connected: discordSession.connected,
					expired: discordSession.expired,
				},
			}));
	}, [discordSession]);
	useEffect(() => {
		if (googleSession)
			setSocialConnections((p) => ({
				...p,
				google: {
					connected: googleSession.connected,
					expired: googleSession.expired,
				},
			}));
	}, [googleSession]);

	const handleConnect = async (provider: "google" | "discord") => {
		window.location.href = `${VITE_BASE_URL}/auth/${provider}`;
	};

	const handleDisconnect = async (provider: "google" | "discord") => {
		if (provider === "google") await disconnectGoogleMutation.mutateAsync();
		else await disconnectDiscordMutation.mutateAsync();
	};

	const canDeleteAccount =
		deleteConfirmation === "DELETE" &&
		acknowledgeDataLoss &&
		acknowledgeNoRecovery;

	return (
		<div className="space-y-4">
			{/* Social Connections */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-2">{t("account.social")}</h2>

				{/* Google */}
				<div className="flex items-center justify-between p-3 rounded-lg border">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
							<Icons.google className="h-5 w-5" />
						</div>
						<div>
							<p className="font-medium text-sm">{t("account.google")}</p>
							{socialConnections.google.connected ? (
								<Badge
									variant="secondary"
									className="mt-1 gap-1 h-auto py-0.5 px-2"
								>
									<Shield className="h-3 w-3" /> {t("account.connected")}
								</Badge>
							) : (
								<span className="text-xs text-muted-foreground">
									{t("account.notconnected")}
								</span>
							)}
						</div>
					</div>
					<Button
						size="sm"
						variant={socialConnections.google.connected ? "outline" : "ghost"}
						data-tour="google-connect-btn"
						onClick={() =>
							socialConnections.google.connected
								? handleDisconnect("google")
								: handleConnect("google")
						}
					>
						{socialConnections.google.connected ? (
							<>
								<Unlink className="h-3.5 w-3.5 mr-1" />{" "}
								{t("account.disconnect")}
							</>
						) : (
							<>
								<Link className="h-3.5 w-3.5 mr-1" /> {t("account.connect")}
							</>
						)}
					</Button>
				</div>

				{/* Discord */}
				<div className="flex items-center justify-between p-3 rounded-lg border">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
							<Icons.discord className="h-5 w-5" />
						</div>
						<div>
							<p className="font-medium text-sm">{t("account.discord")}</p>
							{socialConnections.discord.connected ? (
								<Badge
									variant="secondary"
									className="mt-1 gap-1 h-auto py-0.5 px-2"
								>
									<Shield className="h-3 w-3" /> {t("account.connected")}
								</Badge>
							) : (
								<span className="text-xs text-muted-foreground">
									{t("account.notconnected")}
								</span>
							)}
						</div>
					</div>
					<Button
						size="sm"
						variant={socialConnections.discord.connected ? "outline" : "ghost"}
						onClick={() =>
							socialConnections.discord.connected
								? handleDisconnect("discord")
								: handleConnect("discord")
						}
					>
						{socialConnections.discord.connected ? (
							<>
								<Unlink className="h-3.5 w-3.5 mr-1" />{" "}
								{t("account.disconnect")}
							</>
						) : (
							<>
								<Link className="h-3.5 w-3.5 mr-1" /> {t("account.connect")}
							</>
						)}
					</Button>
				</div>
			</div>

			{/* Password */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4">
				<h2 className="font-semibold text-sm mb-3">
					{t("account.password.section")}
				</h2>
				<div className="space-y-3">
					<Input
						type={showNewPassword ? "text" : "password"}
						placeholder={t("account.newpassword")}
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="pr-10 h-9"
					/>
					{showNewPassword && (
						<button
							type="button"
							onClick={() => setShowNewPassword(!showNewPassword)}
							className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
						>
							<EyeOff className="h-4 w-4" />
						</button>
					)}

					<Input
						type={showConfirmPassword ? "text" : "password"}
						placeholder={t("account.confirmpassword")}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="pr-10 h-9"
					/>

					<Button
						variant="secondary"
						size="sm"
						disabled={
							!newPassword ||
							newPassword !== confirmPassword ||
							newPassword.length < 6 ||
							passwordMutation
						}
						onClick={() =>
							updatePasswordMutation({
								password: newPassword,
								passwordConfirmation: confirmPassword,
							})
						}
					>
						{t("account.updatepassword")}
					</Button>
				</div>
			</div>

			{/* Delete Account */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4">
				<h2 className="font-semibold text-sm mb-3">{t("account.tour")}</h2>
				<div className="flex items-center justify-between p-3 rounded-lg border">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
							<RefreshCw className="h-4 w-4 text-red-600" />
						</div>
						<div className="flex flex-col">
							<p className="font-medium text-sm">{t("account.retour")}</p>
							<span className="text-xs text-muted-foreground">
								{t("account.retour.desc")}
							</span>
						</div>
					</div>
					<Button size="sm" variant="outline" onClick={handleRedoTour}>
						<RefreshCw className="h-3.5 w-3.5 mr-1" />{" "}
						{t("account.retour.button")}
					</Button>
				</div>
				<h2 className="font-semibold text-sm mb-3 mt-6">
					{t("account.danger")}
				</h2>
				<Dialog
					open={deleteDialogOpen}
					onOpenChange={(o) => {
						setDeleteDialogOpen(o);
						if (!o) {
							setDeleteConfirmation("");
							setAcknowledgeDataLoss(false);
							setAcknowledgeNoRecovery(false);
						}
					}}
				>
					<DialogTrigger asChild>
						<Button variant="destructive" size="sm">
							<Trash2 className="h-3.5 w-3.5 mr-1" /> {t("account.delete")}
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="flex items-center gap-2 text-red-600">
								<AlertTriangle className="h-5 w-5" />{" "}
								{t("account.delete.confirm")}
							</DialogTitle>
							<DialogDescription>
								{t("account.delete.irreversible")}
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 mt-4">
							<p className="text-sm text-muted-foreground">
								{t("account.delete.body")}
							</p>
							<Checkbox
								checked={acknowledgeDataLoss}
								onCheckedChange={(c) => setAcknowledgeDataLoss(c as boolean)}
							/>
							<Label>{t("account.delete.check1")}</Label>
							<Checkbox
								checked={acknowledgeNoRecovery}
								onCheckedChange={(c) => setAcknowledgeNoRecovery(c as boolean)}
							/>
							<Label>{t("account.delete.check2")}</Label>
							<Input
								placeholder={t("account.delete.type")}
								value={deleteConfirmation}
								onChange={(e) => setDeleteConfirmation(e.target.value)}
							/>
						</div>
						<DialogFooter className="gap-2 mt-4">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setDeleteDialogOpen(false)}
							>
								{t("account.delete.cancel")}
							</Button>
							<Button
								variant="destructive"
								size="sm"
								disabled={!canDeleteAccount}
								onClick={() => deleteAccountMutation.mutateAsync()}
							>
								{t("account.delete.confirm.btn")}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
