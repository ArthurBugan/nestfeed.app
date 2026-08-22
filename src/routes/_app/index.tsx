import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";

export const Route = createFileRoute("/_app/")({
	component: HomePage,
	head: () => ({
		meta: [{ property: "og:url", content: "https://groupify.dev" }],
		links: [{ rel: "canonical", href: "https://groupify.dev" }],
	}),
});

function HomePage() {
	return <LandingPage />;
}
