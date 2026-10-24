import { describe, expect, it } from "vitest";
import { queryKeys } from "@/hooks/utils/queryKeys";

describe("queryKeys", () => {
	it("produces stable keys for parameterless queries", () => {
		expect(queryKeys.users()).toEqual(["users"]);
		expect(queryKeys.me()).toEqual(["me"]);
		expect(queryKeys.auth()).toEqual(["auth"]);
		expect(queryKeys.invoices()).toEqual(["invoices"]);
	});

	it("includes the id in detail keys", () => {
		expect(queryKeys.user("u1")).toEqual(["user", "u1"]);
		expect(queryKeys.post("p1")).toEqual(["post", "p1"]);
		expect(queryKeys.group("g1")).toEqual(["group", "g1"]);
		expect(queryKeys.channel("c1")).toEqual(["channel", "c1"]);
		expect(queryKeys.shareLink("s1")).toEqual(["shareLink", "s1"]);
		expect(queryKeys.anime("a1")).toEqual(["anime", "a1"]);
	});

	it("wraps pagination/search params in list keys", () => {
		expect(queryKeys.groups({ page: 2, limit: 10, search: "tv" })).toEqual([
			"groups",
			{ page: 2, limit: 10, search: "tv" },
		]);
	});

	it("omits the params segment when none are provided", () => {
		expect(queryKeys.groups()).toEqual(["groups"]);
		expect(queryKeys.channels()).toEqual(["channels"]);
		expect(queryKeys.shareLinks()).toEqual(["shareLinks"]);
		expect(queryKeys.animes()).toEqual(["animes"]);
		expect(queryKeys.websites()).toEqual(["websites"]);
		expect(queryKeys.groupShelves()).toEqual(["groupShelves"]);
	});

	it("scopes compound keys by parent id and params", () => {
		expect(queryKeys.groupVideos("g1", { page: 1, limit: 20 })).toEqual([
			"groupVideos",
			"g1",
			{ page: 1, limit: 20 },
		]);
		expect(queryKeys.groupVideos("g1")).toEqual(["groupVideos", "g1"]);

		expect(queryKeys.infiniteWebsites({ limit: 10, search: "news" })).toEqual([
			"infiniteWebsites",
			{ limit: 10, search: "news" },
		]);
	});

	it("keeps keys consistent between invalidation calls", () => {
		// The same factory must always produce identical keys so cache
		// invalidation by key matches what the query was written with.
		expect(queryKeys.channel("abc")).toEqual(queryKeys.channel("abc"));
		expect(queryKeys.animes({ search: "x" })).toEqual(
			queryKeys.animes({ search: "x" }),
		);
	});
});
