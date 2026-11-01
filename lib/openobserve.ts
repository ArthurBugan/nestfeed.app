import { openobserveLogs } from "@openobserve/browser-logs";
import { openobserveRum } from "@openobserve/browser-rum";

const options = {
	clientToken: import.meta.env.VITE_OPENOBSERVE_CLIENT_TOKEN ?? "",
	applicationId: import.meta.env.VITE_OPENOBSERVE_APPLICATION_ID ?? "groupify-web",
	site: import.meta.env.VITE_OPENOBSERVE_SITE ?? "signoz.nestfeed.app",
	organizationIdentifier:
		import.meta.env.VITE_OPENOBSERVE_ORG ?? "default",
	service: "groupify.dev",
	env: import.meta.env.PROD ? "production" : "development",
	version: "0.1.0",
	insecureHTTP: false,
	apiVersion: "v1" as const,
};

let initialized = false;

/**
 * Initializes OpenObserve RUM (with session replay) and browser logs.
 *
 * Safe to call multiple times — init runs only once. Should be called from
 * the consent-gated analytics loader so we only track after the visitor
 * has made a cookie choice.
 */
export function initOpenObserve(): void {
	if (initialized || typeof window === "undefined") return;
	if (!options.clientToken) return; // not configured
	initialized = true;

	openobserveRum.init({
		applicationId: options.applicationId,
		clientToken: options.clientToken,
		site: options.site,
		organizationIdentifier: options.organizationIdentifier,
		service: options.service,
		env: options.env,
		version: options.version,
		trackResources: true,
		trackLongTasks: true,
		trackUserInteractions: true,
		apiVersion: options.apiVersion,
		insecureHTTP: options.insecureHTTP,
		defaultPrivacyLevel: "allow", // 'allow' | 'mask-user-input' | 'mask'
		// End-to-end trace correlation: inject tracing headers into our own
		// API requests so backend spans correlate with the frontend trace.
		allowedTracingUrls: [
			{
				// Only our own API (same-origin /api in production).
				match: (url: string) =>
					url.startsWith(window.location.origin + "/api"),
				propagatorTypes: ["openobserve", "tracecontext"],
			},
		],
		sessionSampleRate: 100, // track 100% of sessions
		sessionReplaySampleRate: 50, // record 50% of sessions
	});

	openobserveLogs.init({
		clientToken: options.clientToken,
		site: options.site,
		organizationIdentifier: options.organizationIdentifier,
		service: options.service,
		env: options.env,
		version: options.version,
		forwardErrorsToLogs: true,
		insecureHTTP: options.insecureHTTP,
		apiVersion: options.apiVersion,
	});

	// Identify the signed-in user (if any) for session search.
	syncUser();

	openobserveRum.startSessionReplayRecording();
}

/**
 * Identifies the current user with OpenObserve for session search.
 * Called automatically on init; call again after login/logout.
 */
export function setOpenObserveUser(): void {
	if (typeof window === "undefined") return;
	syncUser();
}

function syncUser() {
	try {
		const raw = window.localStorage.getItem("user");
		if (!raw) return;
		const user = JSON.parse(raw);
		if (user?.id) {
			openobserveRum.setUser({
				id: String(user.id),
				...(user.name ? { name: String(user.name) } : {}),
				...(user.email ? { email: String(user.email) } : {}),
			});
		}
	} catch {
		// ignore malformed user blob
	}
}
