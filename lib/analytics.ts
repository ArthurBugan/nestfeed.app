import { getConsent } from "@/components/cookie-consent";

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

const GTM_ID = "GTM-TZ924QCW";
const GA_ID = "G-D7BS3V6VJF";
const ADSENSE_CLIENT = "ca-pub-4077364511521347";
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID ?? "";
const RYBBIT_SITE_ID = "5bd1e2c51d8f";
const RYBBIT_HOST = "https://rybbit.nestfeed.app/api";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

function isLocalHost(): boolean {
	if (typeof window === "undefined") return true;
	const host = window.location.hostname;
	return LOCAL_HOSTS.has(host) || host.endsWith(".local");
}

function injectScript(src: string, crossOrigin = false) {
	const script = document.createElement("script");
	script.src = src;
	script.async = true;
	if (crossOrigin) script.crossOrigin = "anonymous";
	document.head.appendChild(script);
}

function injectInline(code: string) {
	const script = document.createElement("script");
	script.textContent = code;
	document.head.appendChild(script);
}

let initialized = false;

/**
 * Consent-gated analytics loader (GTM, GA4, AdSense, Clarity, Rybbit).
 *
 * Third-party scripts are only injected after the visitor has made a cookie
 * choice; on "npa" non-personalized ads are requested. On localhost the
 * trackers are skipped entirely (CORS-blocked hosts only add console noise).
 */
export function initAnalytics(): void {
	if (initialized || typeof window === "undefined") return;
	initialized = true;

	if (isLocalHost()) return;

	const consent = getConsent();
	if (!consent) return; // no choice yet — wait for CookieConsent

	const nonPersonalized = consent === "npa";

	// GTM
	injectInline(
		`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':` +
			`new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],` +
			`j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=` +
			`'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);` +
			`})(window,document,'script','dataLayer','${GTM_ID}');`,
	);

	// GA4
	window.dataLayer = window.dataLayer || [];
	window.gtag ??= function gtag(...args: unknown[]) {
		window.dataLayer.push(args);
	};
	injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
	if (nonPersonalized) {
		window.gtag("consent", "default", {
			ad_storage: "denied",
			ad_user_data: "denied",
			ad_personalization: "denied",
			analytics_storage: "granted",
		});
	}
	window.gtag("js", new Date());
	window.gtag("config", GA_ID);

	// AdSense (renderers only once the adsbygoogle.js bootstrap is present)
	if (nonPersonalized) {
		window.adsbygoogle = window.adsbygoogle ?? [];
		window.adsbygoogle.requestNonPersonalizedAds = 1;
	}
	injectScript(
		`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
		true,
	);

	// Clarity + Rybbit (dynamic import keeps them off the critical path)
	if (CLARITY_ID) {
		import("@microsoft/clarity")
			.then((Clarity) => Clarity.default.init(CLARITY_ID))
			.catch(() => {});
	}
	import("@rybbit/js")
		.then((rybbit) =>
			rybbit.default.init({
				analyticsHost: RYBBIT_HOST,
				siteId: RYBBIT_SITE_ID,
				replayPrivacyConfig: { slimDOMOptions: true },
			}),
		)
		.catch(() => {});
}
