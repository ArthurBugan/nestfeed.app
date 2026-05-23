"use client";

import { DodoPayments as DodoPaymentsCheckout } from "dodopayments-checkout";
import { AlertTriangle, Check, CreditCard, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
	useCancelSubscription,
	useCreateCheckoutSession,
} from "@/hooks/mutations/usePaymentMutations";
import { useLanguage } from "@/components/language-provider";
import { useDashboardTotal } from "@/hooks/useQuery/useDashboard";
import { useUser } from "@/hooks/useQuery/useUser";

export function BillingSettings() {
	const { t } = useLanguage();
	const { data: user, refetch } = useUser();
	const { data: dashboardTotal, isLoading } = useDashboardTotal();
	const createCheckoutSessionMutation = useCreateCheckoutSession();
	const cancelSubscriptionMutation = useCancelSubscription();
	const [showCancelDialog, setShowCancelDialog] = useState(false);

	useEffect(() => {
		DodoPaymentsCheckout.Initialize({ mode: "test", displayType: "overlay" });
	}, []);

	const currentPlan = user?.planName || "Free";
	const isFreePlan = currentPlan.toLowerCase() === "free";
	const nextBillingDate = new Date(
		Date.now() + 30 * 24 * 60 * 60 * 1000,
	).toLocaleDateString("en-US", { month: "long", day: "numeric" });

	const subscriptionEndDate =
		user?.subscriptionEndDate &&
		user.subscriptionEndDate !== "1970-01-01T00:00:00Z"
			? new Date(user.subscriptionEndDate).toLocaleDateString("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric",
				})
			: null;

	const usage = {
		groups: { used: dashboardTotal?.groups || 0, limit: user?.maxGroups || 3 },
		channels: {
			used: dashboardTotal?.channels || 0,
			limit: user?.maxChannels || 20,
		},
	};

	const plans = [
		{
			name: "Free",
			price: "$0",
			current: currentPlan === "free",
			features: ["Up to 3 groups", "Up to 20 channels"],
		},
		{
			name: "Basic",
			price: "$3.99",
			current: currentPlan.includes("Basic"),
			features: [
				"Up to 10 groups",
				"Up to 1,000 channels",
				"Subgroups",
				"Share groups",
			],
		},
		{
			name: "Pro",
			price: "$9.99",
			current: currentPlan.includes("Pro"),
			features: [
				"Unlimited groups",
				"Unlimited channels",
				"Team collaboration",
				"Priority support",
			],
		},
	];

	const currentPlanDetails = plans.find((p) => p.current);

	const handleCancelSubscription = async () => {
		try {
			await cancelSubscriptionMutation.mutateAsync();
			setShowCancelDialog(false);
			refetch();
		} catch (error) {
			console.error("Failed to cancel subscription:", error);
		}
	};

	return (
		<div className="space-y-4">
			{/* Current Plan */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm">{t("billing.current")}</h2>
				<div className="flex items-center justify-between">
					<div>
						<p className="text-lg font-bold">
							{user?.priceMonthly ? `$${user.priceMonthly}` : "$0"}
						</p>
						<p className="text-xs text-muted-foreground">
							{subscriptionEndDate
								? t("billing.ends", { date: subscriptionEndDate })
								: t("billing.billed", { date: nextBillingDate })}
						</p>
					</div>
					<Badge variant="outline">{currentPlan}</Badge>
				</div>
			</div>

			{/* Usage */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4 space-y-3">
				<h2 className="font-semibold text-sm mb-1">{t("billing.usage")}</h2>

				{isLoading ? (
					<div className="space-y-2">
						<div className="h-4 w-full rounded bg-muted animate-pulse" />
						<div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
					</div>
				) : (
					<>
						<div className="space-y-1.5">
							<div className="flex justify-between text-xs">
								<span>{t("billing.groups.label")}</span>
								<span>
									{usage.groups.used} / {usage.groups.limit}
								</span>
							</div>
							<Progress
								value={(usage.groups.used / usage.groups.limit) * 100}
							/>
						</div>

						<div className="space-y-1.5">
							<div className="flex justify-between text-xs">
								<span>{t("billing.channels.label")}</span>
								<span>
									{usage.channels.used} / {usage.channels.limit}
								</span>
							</div>
							<Progress
								value={(usage.channels.used / usage.channels.limit) * 100}
							/>
						</div>
					</>
				)}
			</div>

			{/* Plans */}
			<div className="space-y-3">
				<h2 className="font-semibold text-sm">{t("billing.plans")}</h2>
				<div className="grid md:grid-cols-3 gap-3">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`rounded-xl border p-4 ${plan.current ? "border-primary/30 bg-primary/5" : ""}`}
						>
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-semibold text-sm">{plan.name === "Free" ? t("billing.free.name") : plan.name === "Basic" ? t("billing.basic.name") : t("billing.pro.name")}</h3>
								{plan.current && <Badge variant="secondary">{t("billing.current.badge")}</Badge>}
							</div>
							<p className="text-lg font-bold mb-3">
								{plan.price}
								<span className="text-xs text-muted-foreground">{t("billing.month")}</span>
							</p>
							<ul className="space-y-1.5 mb-4">
								<li>
									<Check className="h-3 w-3 mr-1 inline" /> Up to{" "}
									{plan.name === "Free"
										? "3"
										: plan.name === "Basic"
											? "10"
											: "Unlimited"}{" "}
									groups
								</li>
							</ul>
							{plan.current && !isFreePlan ? (
								<Button
									size="sm"
									variant="outline"
									className="w-full text-red-600 hover:text-red-600 hover:bg-red-50"
									onClick={() => setShowCancelDialog(true)}
									disabled={cancelSubscriptionMutation.isPending}
								>
									{cancelSubscriptionMutation.isPending
										? t("billing.canceling")
										: t("billing.cancel")}
								</Button>
							) : (
								<Button
									size="sm"
									variant={plan.current ? "outline" : "secondary"}
									disabled={plan.current}
									onClick={async () => {
										try {
											const checkoutSession =
												await createCheckoutSessionMutation.mutateAsync({
													plan_name: plan.name,
													user_id: user?.id || "",
												});
											await DodoPaymentsCheckout.Checkout.open({
												checkoutUrl: checkoutSession.checkout_url,
											});
										} catch (error) {
											console.error(
												"Failed to create checkout session:",
												error,
											);
										}
									}}
								>
									{plan.current ? t("billing.current.badge") : t("billing.change")}
								</Button>
							)}
						</div>
					))}
				</div>
			</div>

			{/* History */}
			<div className="rounded-xl border bg-card/50 backdrop-blur-sm p-4">
				<h2 className="font-semibold text-sm mb-1">{t("billing.history")}</h2>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => window.open("https://gumroad.com/dashboard", "_blank")}
					className="w-full"
				>
					<Download className="h-3.5 w-3.5 mr-1" /> {t("billing.view")}
				</Button>
			</div>

			{/* Cancel Subscription Dialog */}
			<Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<AlertTriangle className="h-5 w-5 text-amber-500" />
							{t("billing.cancel.title")}
						</DialogTitle>
						<DialogDescription>
							{t("billing.cancel.desc")}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowCancelDialog(false)}
						>
							{t("billing.keep")}
						</Button>
						<Button
							variant="destructive"
							onClick={handleCancelSubscription}
							disabled={cancelSubscriptionMutation.isPending}
						>
							{cancelSubscriptionMutation.isPending
								? t("billing.canceling")
								: t("billing.cancel.confirm")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
