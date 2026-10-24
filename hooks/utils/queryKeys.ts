export const queryKeys = {
	users: () => ["users"],
	user: (id: string) => ["user", id],
	me: () => ["me"],
	posts: () => ["posts"],
	post: (id: string) => ["post", id],
	auth: () => ["auth"],
	groups: (params?: { page?: number; limit?: number; search?: string }) =>
		params ? ["groups", params] : ["groups"],
	group: (id: string) => ["group", id],
	channels: (params?: {
		page?: number;
		limit?: number;
		search?: string;
		groupId?: string;
	}) => (params ? ["channels", params] : ["channels"]),
	channel: (id: string) => ["channel", id],
	shareLink: (id: string) => ["shareLink", id],
	shareLinks: (params?: { page?: number; limit?: number; search?: string }) =>
		params ? ["shareLinks", params] : ["shareLinks"],
	animes: (params?: { page?: number; limit?: number; search?: string }) =>
		params ? ["animes", params] : ["animes"],
	anime: (id: string) => ["anime", id],
	groupVideos: (groupId: string, params?: { page?: number; limit?: number }) =>
		params ? ["groupVideos", groupId, params] : ["groupVideos", groupId],
	groupShelves: (params?: {
		page?: number;
		limit?: number;
		search?: string;
	}) => (params ? ["groupShelves", params] : ["groupShelves"]),
	invoices: () => ["invoices"],
	websites: (params?: { page?: number; limit?: number; search?: string }) =>
		params ? ["websites", params] : ["websites"],
	infiniteWebsites: (params?: { limit?: number; search?: string }) => [
		"infiniteWebsites",
		params,
	],
};
