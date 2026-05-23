// biome-ignore assist/source/organizeImports: <explanation>
import {
	ChevronUp,
	FolderKanban,
	Globe,
	LayoutDashboard,
	Settings,
	Share2,
	User2,
	Video,
	Youtube,
	LogOut,
	CreditCard,
	UserCircle,
	PanelLeft,
	Library,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useLogoutMutation } from "@/hooks/mutations/useUserMutations";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useQuery/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/components/language-provider";

interface NavItem {
	title: string;
	url: string;
	icon: React.ElementType;
	dataTour?: string;
}



export function AppSidebar() {
	const logoutMutation = useLogoutMutation();
	const navigate = useNavigate();
	const location = useLocation();
	const { data: user } = useUser();
	const { state } = useSidebar();
	const { t, language, setLanguage } = useLanguage();
	const isCollapsed = state === "collapsed";

	const mainItems: NavItem[] = [
		{
			title: t("sidebar.dashboard"),
			url: "/dashboard",
			icon: LayoutDashboard,
		},
		{
			title: t("sidebar.groups"),
			url: "/dashboard/groups",
			icon: FolderKanban,
			dataTour: "groups-nav-link",
		},
		{
			title: t("sidebar.channels"),
			url: "/dashboard/channels",
			icon: Youtube,
		},
		{
			title: "Share Links",
			url: "/dashboard/share-links",
			icon: Share2,
		},
	];

	const secondaryItems: NavItem[] = [
		{
			title: "Group Shelf",
			url: "/dashboard/groupshelf",
			icon: Library,
		},
		{
			title: t("sidebar.animes"),
			url: "/dashboard/animes",
			icon: Video,
		},
		{
			title: t("sidebar.websites"),
			url: "/dashboard/websites",
			icon: Globe,
		},
		{
			title: t("sidebar.settings"),
			url: "/dashboard/settings/billing",
			icon: Settings,
			dataTour: "settings-nav-link",
		},
	];

	const signOut = () => {
		logoutMutation.mutateAsync();
	};

	const isActive = (url: string) => {
		const currentPath = location.pathname;
		if (url === "/dashboard") {
			return currentPath === "/dashboard";
		}
		if (url.startsWith("/dashboard/settings")) {
			return currentPath.startsWith("/dashboard/settings");
		}
		if (url === "/dashboard/groups") {
			return (
				currentPath === "/dashboard/groups" ||
				currentPath === "/dashboard/groups/"
			);
		}
		if (url === "/dashboard/groupshelf") {
			return (
				currentPath === "/dashboard/groupshelf" ||
				currentPath === "/dashboard/groupshelf/"
			);
		}
		return currentPath.startsWith(url);
	};

	return (
		<TooltipProvider delayDuration={0}>
			<Sidebar variant="sidebar" collapsible="icon">
				<SidebarHeader className="border-b border-sidebar-border/50 p-4">
					{!isCollapsed && (
						<Link
							to="/"
							className="flex items-center gap-3 group transition-all duration-300 hover:scale-[1.02]"
						>
							<div className="relative">
								<div className="absolute inset-0 bg-primary rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
								<div className="relative bg-primary rounded-lg p-2 shadow-lg">
									<Youtube className="h-5 w-5 text-white" />
								</div>
							</div>
							<div
								className={cn(
									"flex flex-col transition-all duration-300 overflow-hidden",
									isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100",
								)}
							>
								<span className="text-lg font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent whitespace-nowrap">
									Nestfeed
								</span>
							</div>
						</Link>
					)}
					{isCollapsed && (
						<Link
							to="/"
							className="flex items-center justify-center transition-all duration-300 hover:scale-110"
						>
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
								<div className="relative bg-gradient-to-br from-primary to-secondary rounded-lg p-2 shadow-lg">
									<Youtube className="h-4 w-4 text-white" />
								</div>
							</div>
						</Link>
					)}
				</SidebarHeader>

				<SidebarContent
					className={cn("px-2 py-4 gap-6", isCollapsed && "px-0")}
				>
					{/* Main Navigation */}
					<SidebarGroup>
						<SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 px-2 mb-1">
							Menu
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu className="gap-1">
								{mainItems.map((item) => {
									const active = isActive(item.url);
									return (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton
												asChild
												isActive={active}
												tooltip={item.title}
											>
												<Link
													to={item.url}
													dataTour={item.dataTour}
													className={cn(
														"group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
														active
															? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary dark:text-primary-foreground shadow-sm"
															: "text-muted-foreground hover:bg-accent hover:text-foreground",
													)}
												>
													<item.icon
														className={cn(
															"h-4 w-4 transition-all duration-200",
															active
																? "text-primary"
																: "text-muted-foreground group-hover:text-foreground",
														)}
													/>
													<span>{item.title}</span>
													{active && (
														<div className="absolute left-0 w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-r-full" />
													)}
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>

					{/* Secondary Navigation */}
					<SidebarGroup>
						<SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 px-2 mb-1">
							Library
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu className="gap-1">
								{secondaryItems.map((item) => {
									const active = isActive(item.url);
									return (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton
												asChild
												isActive={active}
												tooltip={item.title}
											>
												<Link
													to={item.url}
													dataTour={item.dataTour}
													className={cn(
														"group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
														active
															? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary dark:text-primary-foreground shadow-sm"
															: "text-muted-foreground hover:bg-accent hover:text-foreground",
													)}
												>
													<item.icon
														className={cn(
															"h-4 w-4 transition-all duration-200",
															active
																? "text-primary"
																: "text-muted-foreground group-hover:text-foreground",
														)}
													/>
													<span>{item.title}</span>
													{active && (
														<div className="absolute left-0 w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-r-full" />
													)}
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>

					{/* Ad Section */}
					<div className="mt-auto pt-4">
						<div className="rounded-lg overflow-hidden bg-muted/30 border border-sidebar-border/30">
							<ins
								className="adsbygoogle"
								style={{
									display: "inline-block",
									width: "255px",
									height: "300px",
								}}
								data-ad-client="ca-pub-4077364511521347"
								data-ad-slot="9387808543"
							></ins>
						</div>
					</div>
				</SidebarContent>

				<SidebarFooter className="border-t border-sidebar-border/50 p-3">
					{/* Language Switcher */}
					{!isCollapsed && (
						<div className="mx-auto my-1.5 px-3 py-2 rounded-lg border border-primary/20 bg-primary/5 w-full transition-all duration-200">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
										<svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
									<span className="text-xs text-muted-foreground/70 font-medium">
										Language
									</span>
								</div>
								<div className="flex gap-1">
									{(["en", "pt", "es"] as const).map((lang) => (
										<button
											key={lang}
											type="button"
											onClick={() => setLanguage(lang)}
											className={cn(
												"px-2 py-0.5 rounded text-xs font-medium transition-all",
												language === lang
													? "bg-primary text-primary-foreground shadow-sm"
													: "text-muted-foreground hover:text-foreground hover:bg-accent/50",
											)}
										>
											{lang === "en" ? "EN" : lang === "pt" ? "PT" : "ES"}
										</button>
									))}
								</div>
							</div>
						</div>
					)}
					{!isCollapsed && user?.planName && (
						<button
							type="button"
							onClick={() => navigate({ to: "/dashboard/settings/billing" })}
							className="flex items-center justify-between w-full mx-auto my-1.5 px-3 py-2 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 text-xs transition-all duration-200 group"
						>
							<div className="flex items-center gap-2">
								<div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
									<svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
								</div>
								<span className="text-muted-foreground/70 font-medium">Plan</span>
							</div>
							<span className="inline-flex items-center gap-1.5 font-semibold text-primary uppercase tracking-wider">
								{user.planName}
								<svg className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</button>
					)}
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton className="w-full justify-start gap-3 px-3 py-2.5 h-auto hover:bg-accent rounded-lg transition-all">
										<Avatar className="h-8 w-8 border-2 border-background shadow-sm">
											<AvatarImage src={undefined} />
											<AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs font-semibold">
												{user?.username?.charAt(0).toUpperCase() ||
													user?.email?.charAt(0).toUpperCase() ||
													"U"}
											</AvatarFallback>
										</Avatar>
										<div className="flex flex-col items-start text-left flex-1 min-w-0">
											<span className="text-sm font-medium truncate w-full">
												{user?.username || user?.email || "User"}
											</span>
											<span className="text-xs text-muted-foreground truncate w-full">
												{user?.email || ""}
											</span>
										</div>
										<ChevronUp className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									side="top"
									className="w-[--radix-popper-anchor-width] min-w-56"
								>
									<div className="flex items-center gap-2 p-2">
										<Avatar className="h-8 w-8">
											<AvatarImage src={undefined} />
											<AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs font-semibold">
												{user?.username?.charAt(0).toUpperCase() ||
													user?.email?.charAt(0).toUpperCase() ||
													"U"}
											</AvatarFallback>
										</Avatar>
										<div className="flex flex-col">
											<p className="text-sm font-medium">
												{user?.username || user?.email || "User"}
											</p>
											<p className="text-xs text-muted-foreground">
												{user?.email || ""}
											</p>
										</div>
									</div>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() =>
											navigate({ to: "/dashboard/settings/account" })
										}
										className="gap-2 cursor-pointer"
									>
										<UserCircle className="h-4 w-4" />
										<span>Profile</span>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											navigate({ to: "/dashboard/settings/billing" })
										}
										className="gap-2 cursor-pointer"
									>
										<CreditCard className="h-4 w-4" />
										<span>Billing</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => signOut()}
										className="gap-2 cursor-pointer text-destructive focus:text-destructive"
									>
										<LogOut className="h-4 w-4" />
										<span>Sign out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
		</TooltipProvider>
	);
}
