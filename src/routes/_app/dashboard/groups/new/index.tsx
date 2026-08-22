"use client";

import {
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { toast } from "sonner";
import { GroupForm, type GroupFormData } from "@/components/group-form";
import { useLanguage } from "@/components/language-provider";
import { useCreateGroup, useGroups } from "@/hooks/useQuery/useGroups";

export const Route = createFileRoute("/_app/dashboard/groups/new/")({
	component: NewGroupPage,
	validateSearch: (search) => ({
		parentId: (search.parentId as string) || undefined,
	}),
});

function NewGroupPage() {
	const { t } = useLanguage();
	const navigate = useNavigate();
	const search = useSearch({ from: "/_app/dashboard/groups/new/" });
	const { data: groupsData, isLoading } = useGroups({ limit: 100 });
	const createMutation = useCreateGroup();

	const handleSubmit = async (data: GroupFormData) => {
		try {
			await createMutation.mutateAsync({
				name: data.name,
				description: data.description,
				category: data.category,
				icon: data.icon,
				parentId: data.parentId || undefined,
				enableGroupshelf: data.enableGroupshelf,
			});
			navigate({ to: "/dashboard/groups" });
		} catch (error: any) {
			toast.error(t("group.create.error"), {
				description: error?.message || t("group.create.error.desc"),
			});
		}
	};

	return (
		<GroupForm
			onSubmit={handleSubmit}
			groups={groupsData?.data || []}
			isLoading={isLoading || createMutation.isPending}
			title={t("group.create.title")}
			description={t("group.create.desc")}
			submitLabel={t("group.create.submit")}
			parentId={search.parentId}
		/>
	);
}
