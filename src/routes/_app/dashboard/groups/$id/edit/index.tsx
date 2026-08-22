"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GroupForm, type GroupFormData } from "@/components/group-form";
import { useLanguage } from "@/components/language-provider";
import {
	useGroup,
	useGroups,
	useUpdateGroup,
} from "@/hooks/useQuery/useGroups";

export const Route = createFileRoute("/_app/dashboard/groups/$id/edit/")({
	component: GroupEditPage,
});

function GroupEditPage() {
	const { t } = useLanguage();
	const router = useNavigate();
	const { id } = Route.useParams();
	const { data: groupData } = useGroup(id);
	const { data: groupsData } = useGroups();
	const { mutateAsync: updateGroup, isPending: isUpdating } = useUpdateGroup();

	const availableParentGroups = groupsData?.data || [];

	const handleSubmit = async (data: GroupFormData) => {
		try {
			await updateGroup({
				id,
				data: {
					name: data.name,
					description: data.description,
					category: data.category,
					icon: data.icon,
					parentId: data.parentId === "none" ? undefined : data.parentId,
					enableGroupshelf: data.enableGroupshelf,
				},
			});

			router({ to: "/dashboard/groups/$id", params: { id } });
		} catch (error: any) {
			toast.error(t("group.edit.error"), {
				description: error?.message || t("group.edit.error.desc"),
			});
		}
	};

	return groupData ? (
		<GroupForm
			initialData={{
				name: groupData.name,
				description: groupData.description,
				category: groupData.category,
				icon: groupData.icon,
				parentId: groupData.parentId || undefined,
				enableGroupshelf: groupData.enableGroupshelf || false,
			}}
			groups={availableParentGroups}
			isLoading={isUpdating}
			onSubmit={handleSubmit}
			title={t("group.edit.title")}
			description={t("group.edit.desc")}
			submitLabel={t("group.edit.submit")}
			cancelPath=".."
		/>
	) : (
		<Loader2 className="animate-spin" />
	);
}
