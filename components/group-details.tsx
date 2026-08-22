import { Link } from "@tanstack/react-router";
import { Library, Pencil, Plus, Share2 } from "lucide-react";
import { IconViewer } from "@/components/icon-picker";
import { useLanguage } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGroup } from "@/hooks/useQuery/useGroups";

interface GroupDetailsProps {
	id: string;
}

export function GroupDetails({ id }: GroupDetailsProps) {
	const { data: group } = useGroup(id);
	const { t } = useLanguage();

	if (!group) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-md border flex items-center justify-center bg-muted/50">
							<IconViewer
								icon={group.icon || ""}
								className="h-6 w-6 text-muted-foreground"
							/>
						</div>
						<div>
							<div className="flex items-center gap-2">
								<CardTitle>{group.name}</CardTitle>
							</div>
							<CardDescription>{group.description}</CardDescription>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="secondary">{group.category}</Badge>
						{group.enableGroupshelf && (
							<Badge variant="outline" className="gap-1">
								<Library className="h-3 w-3" />
								{t("group.details.shelf")}
							</Badge>
						)}
						<Button variant="outline" size="sm" asChild>
							<Link to={"/dashboard/groups/$id/edit"} params={{ id: group.id }}>
								<Pencil className="mr-2 h-4 w-4" />
								{t("group.details.edit")}
							</Link>
						</Button>
						<Button variant="outline" size="sm" asChild>
							<Link
								to={`/dashboard/groups/$id/share`}
								params={{ id: group.id }}
							>
								<Share2 className="mr-2 h-4 w-4" />
								{t("group.details.share")}
							</Link>
						</Button>
						<Button
							className="bg-primary hover:bg-primary/90 text-white"
							type="button"
							data-tour="add-channel-btn"
							asChild
						>
							<Link
								to={"/dashboard/groups/$id/add-channel"}
								params={{ id: group.id }}
							>
								<Plus className="mr-2 h-4 w-4" />
								{t("group.details.addchannel")}
							</Link>
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							{t("group.details.created")}
						</p>
						<p>
							{group.createdAt
								? new Date(group.createdAt).toLocaleDateString()
								: ""}
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							{t("group.details.channels")}
						</p>
						{group.channelCount ? <p>{group.channelCount}</p> : 0}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
