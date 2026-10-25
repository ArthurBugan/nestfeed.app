// scripts/static-island.js
// Inlined into the prerendered landing page by gen-static-landing.mjs.
// Replaces the React hydration pipeline on "/" with tiny vanilla behaviors:
//   1. consent banner (mirror of components/cookie-consent.tsx)
//   2. consent-gated analytics (mirror of lib/analytics.ts; @rybbit/js is
//      loaded from a vendored copy so behavior is identical)
//   3. pt/es language swap (mirror of components/language-provider.tsx keys)
//   4. header language menu + mobile menu (mirror of compact-header.tsx)
// NOTE: keep in sync with lib/analytics.ts — this file must not import the
// app bundle, so trackers that change there need the same edit here.
(() => {
	var DATA = JSON.parse(document.getElementById("i18n-landing").textContent);
	var EN = DATA.map; // english value -> translation key
	var DICTS = { en: DATA.en, pt: DATA.pt, es: DATA.es };

	var CONSENT_KEY = "cookie-consent";
	var GTM_ID = "__GTM_ID__";
	var GA_ID = "__GA_ID__";
	var ADSENSE_CLIENT = "__ADSENSE_CLIENT__";
	var CLARITY_ID = "__CLARITY_ID__";
	var RYBBIT_HOST = "__RYBBIT_HOST__";
	var RYBBIT_SITE_ID = "__RYBBIT_SITE_ID__";

	function readLS(key) {
		try {
			return window.localStorage.getItem(key);
		} catch {
			return null;
		}
	}
	function writeLS(key, value) {
		try {
			window.localStorage.setItem(key, value);
		} catch {
			/* ignore */
		}
	}

	var currentLang = "en";

	function t(key) {
		return DICTS[currentLang][key] || DICTS.en[key] || key;
	}

	// ---------------------------------------------------------------------------
	// Analytics (mirror of lib/analytics.ts)
	// ---------------------------------------------------------------------------
	var _analyticsLoaded = false;

	function isLocalHost() {
		var host = window.location.hostname;
		return (
			["localhost", "127.0.0.1", "0.0.0.0", "::1"].indexOf(host) !== -1 ||
			host.endsWith(".local")
		);
	}

	function injectScript(src, crossOrigin) {
		var script = document.createElement("script");
		script.src = src;
		script.async = true;
		if (crossOrigin) script.crossOrigin = "anonymous";
		document.head.appendChild(script);
	}
	function injectInline(code) {
		var script = document.createElement("script");
		script.textContent = code;
		document.head.appendChild(script);
	}

	function initAnalytics() {
		if (_analyticsLoaded) return;
		_analyticsLoaded = true;
		if (isLocalHost()) return;
		var consent = readLS(CONSENT_KEY);
		if (consent !== "all" && consent !== "npa") return;
		var nonPersonalized = consent === "npa";

		// GTM
		injectInline(
			'(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":' +
				'new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],' +
				'j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=' +
				'"https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);' +
				"})(window,document,'script','dataLayer','" +
				GTM_ID +
				"');",
		);

		// GA4
		window.dataLayer = window.dataLayer || [];
		window.gtag =
			window.gtag ||
			function () {
				window.dataLayer.push(Array.prototype.slice.call(arguments));
			};
		injectScript("https://www.googletagmanager.com/gtag/js?id=" + GA_ID);
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

		// AdSense
		window.adsbygoogle = window.adsbygoogle || [];
		if (nonPersonalized) window.adsbygoogle.requestNonPersonalizedAds = 1;
		injectScript(
			"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
				ADSENSE_CLIENT,
			true,
		);

		// Clarity — classic snippet loader (mirrors @microsoft/clarity init)
		if (CLARITY_ID) {
			window.clarity =
				window.clarity ||
				function () {
					(window.clarity.q = window.clarity.q || []).push(arguments);
					window.clarity.l = +new Date();
				};
			var k = document.createElement("script");
			k.async = true;
			k.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
			document.head.appendChild(k);
		}

		// Rybbit — vendored ESM build, imported off the critical path.
		import("/lib/rybbit.mjs")
			.then((rybbit) =>
				rybbit.default.init({
					analyticsHost: RYBBIT_HOST,
					siteId: RYBBIT_SITE_ID,
					replayPrivacyConfig: { slimDOMOptions: true },
				}),
			)
			.catch(() => {});
	}

	// ---------------------------------------------------------------------------
	// Language (mirror of language-provider + language-selector)
	// ---------------------------------------------------------------------------
	var LANGS = [
		{ code: "en", name: "English", flagDisplay: "🇺🇸", htmlLang: "en" },
		{ code: "pt", name: "Português", flagDisplay: "🇧🇷", htmlLang: "pt-BR" },
		{ code: "es", name: "Español", flagDisplay: "🇪🇸", htmlLang: "es" },
	];

	var swapEntries = []; // { node, key, base, isElement, attrs }

	function tagI18nNodes() {
		var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
		var node;
		while ((node = walker.nextNode())) {
			var text = node.nodeValue;
			if (!text || !text.trim()) continue;
			var key = EN[text.trim()];
			if (key) swapEntries.push({ node: node, key: key, base: text });
		}
		Array.prototype.forEach.call(
			document.querySelectorAll("[title],[aria-label],[placeholder]"),
			(el) => {
				var attrs = {};
				["title", "aria-label", "placeholder"].forEach((attr) => {
					var value = el.getAttribute(attr);
					if (value && EN[value.trim()]) attrs[attr] = value.trim();
				});
				if (Object.keys(attrs).length) {
					swapEntries.push({ node: el, isElement: true, attrs: attrs });
				}
			},
		);
	}

	function applyTexts(lang) {
		var dict = DICTS[lang];
		swapEntries.forEach((entry) => {
			if (entry.isElement) {
				var el = entry.node;
				Object.keys(entry.attrs).forEach((attr) => {
					if (lang === "en") {
						el.setAttribute(attr, entry.attrs[attr]);
					} else {
						var key = EN[entry.attrs[attr]];
						var translated = key && dict[key];
						if (translated) {
							el.setAttribute(attr, translated);
						} else {
							el.setAttribute(attr, entry.attrs[attr]);
						}
					}
				});
				return;
			}
			entry.node.nodeValue =
				lang === "en" ? entry.base : dict[entry.key] || entry.base;
		});
		var langMeta = LANGS.filter((l) => l.code === lang)[0];
		document.documentElement.lang = langMeta.htmlLang;
	}

	function setLanguage(lang) {
		currentLang = lang;
		writeLS("language", lang);
		if (lang === "en") {
			window.location.reload(); // base document is english
			return;
		}
		applyTexts(lang);
		refreshTriggers();
		refreshBannerCopy();
	}

	function currentLangMeta() {
		return LANGS.filter((l) => l.code === currentLang)[0];
	}

	// ---------------------------------------------------------------------------
	// Consent banner (mirror of components/cookie-consent.tsx)
	// ---------------------------------------------------------------------------
	var BTN_BASE =
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 px-3";
	var BUTTON_CLASSES = {
		reject:
			BTN_BASE +
			" border border-input bg-background hover:bg-accent hover:text-accent-foreground",
		accept:
			BTN_BASE + " bg-primary text-primary-foreground hover:bg-primary/90",
	};

	function refreshBannerCopy() {
		var wrapper = document.querySelector("[data-consent-banner]");
		if (!wrapper) return;
		wrapper.setAttribute("aria-label", t("consent.title"));
		wrapper.querySelector("[data-consent-title]").textContent =
			t("consent.title");
		var body = wrapper.querySelector("[data-consent-body]");
		body.innerHTML =
			t("consent.text") +
			' <a href="/privacy" class="underline hover:text-primary">' +
			t("consent.learnMore") +
			"</a>";
		wrapper.querySelector("[data-consent=reject]").textContent =
			t("consent.reject");
		wrapper.querySelector("[data-consent=accept]").textContent =
			t("consent.accept");
	}

	function buildBanner() {
		var wrapper = document.createElement("div");
		wrapper.setAttribute("data-consent-banner", "");
		wrapper.setAttribute("role", "dialog");
		wrapper.setAttribute("aria-live", "polite");
		wrapper.setAttribute("aria-label", t("consent.title"));
		wrapper.className =
			"fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 p-4 shadow-lg";
		wrapper.innerHTML =
			'<div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">' +
			'<div class="flex-1"><p class="text-sm font-medium mb-0.5" data-consent-title></p>' +
			'<p class="text-xs text-muted-foreground leading-relaxed" data-consent-body></p></div>' +
			'<div class="flex gap-2 flex-shrink-0 w-full sm:w-auto">' +
			'<button data-consent="reject" type="button" class="' +
			BUTTON_CLASSES.reject +
			'"></button>' +
			'<button data-consent="accept" type="button" class="' +
			BUTTON_CLASSES.accept +
			'"></button>' +
			"</div></div>";
		document.body.appendChild(wrapper);
		refreshBannerCopy(); // must run after insertion (queries the document)
		wrapper.addEventListener("click", (event) => {
			var btn = event.target.closest("[data-consent]");
			if (!btn) return;
			var choice =
				btn.getAttribute("data-consent") === "reject" ? "npa" : "all";
			writeLS(CONSENT_KEY, choice);
			if (choice !== "all") {
				window.adsbygoogle = window.adsbygoogle || [];
				window.adsbygoogle.requestNonPersonalizedAds = 1;
			}
			wrapper.remove();
			initAnalytics();
		});
		document.body.appendChild(wrapper);
	}

	function ensureBanner() {
		var choice = readLS(CONSENT_KEY);
		if (choice === "all" || choice === "npa") return;
		buildBanner();
	}

	// ---------------------------------------------------------------------------
	// Header menus (mirror of compact-header + language-selector)
	// ---------------------------------------------------------------------------
	var openClosers = [];

	function closeMenus() {
		openClosers.forEach((close) => {
			close();
		});
	}

	function buildLangMenu(trigger) {
		var wrap = document.createElement("span");
		wrap.className = "relative inline-flex";
		trigger.parentNode.insertBefore(wrap, trigger);
		wrap.appendChild(trigger);

		var menu = document.createElement("div");
		menu.hidden = true;
		menu.className =
			"absolute right-0 top-full mt-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md";
		menu.setAttribute("role", "menu");
		LANGS.forEach((lang) => {
			var item = document.createElement("button");
			item.type = "button";
			item.setAttribute("role", "menuitem");
			item.className =
				"relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground";
			item.innerHTML =
				"<span>" + lang.flagDisplay + "</span><span>" + lang.name + "</span>";
			item.addEventListener("click", () => {
				closeMenus();
				setLanguage(lang.code);
			});
			menu.appendChild(item);
		});
		wrap.appendChild(menu);

		function close() {
			menu.hidden = true;
			trigger.setAttribute("aria-expanded", "false");
		}
		function toggle() {
			var wasOpen = !menu.hidden;
			closeMenus();
			menu.hidden = wasOpen;
			trigger.setAttribute("aria-expanded", String(!wasOpen));
		}
		trigger.setAttribute("aria-haspopup", "menu");
		trigger.setAttribute("aria-expanded", "false");
		trigger.setAttribute("data-lang-trigger", "");
		trigger.addEventListener("click", (event) => {
			event.stopPropagation();
			toggle();
		});
		document.addEventListener("click", (event) => {
			if (!wrap.contains(event.target)) close();
		});
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") close();
		});
		openClosers.push(close);
		return trigger;
	}

	function findLangTriggers() {
		return Array.prototype.filter.call(
			document.querySelectorAll("header button"),
			(btn) => !!btn.querySelector("svg.lucide-globe"),
		);
	}

	function refreshTriggers() {
		var meta = currentLangMeta();
		Array.prototype.forEach.call(
			document.querySelectorAll("[data-lang-trigger]"),
			(trigger) => {
				var labels = trigger.querySelectorAll("span");
				if (labels.length >= 1) {
					labels[0].textContent = meta.flagDisplay;
				}
				if (labels.length >= 2) {
					labels[1].textContent = meta.name;
				}
			},
		);
	}

	function wireHeader() {
		findLangTriggers().forEach(buildLangMenu);
		var toggle = document.querySelector("header button.md\\:hidden");
		if (!toggle) return;
		var header = toggle.closest("header");
		var container = toggle.closest("div");
		toggle.addEventListener("click", () => {
			var panel = header.querySelector("[data-mobile-menu]");
			if (panel) {
				panel.remove();
				toggle.setAttribute("aria-expanded", "false");
				return;
			}
			toggle.setAttribute("aria-expanded", "true");
			var mount = document.createElement("div");
			mount.className = "md:hidden border-t py-4";
			mount.setAttribute("data-mobile-menu", "");
			var inner = document.createElement("div");
			inner.className = "flex flex-col gap-2 px-4";
			mount.appendChild(inner);
			[
				["/dashboard", "nav.dashboard"],
				["#features", "nav.features"],
				["#integrations", "nav.integrations"],
				["#pricing", "nav.pricing"],
				["#testimonials", "nav.reviews"],
				["/blog", "nav.blog"],
			].forEach((pair) => {
				var a = document.createElement("a");
				a.href = pair[0];
				a.className = "text-sm hover:text-foreground/80 transition-colors";
				a.textContent = t(pair[1]);
				inner.appendChild(a);
			});
			var cta = document.createElement("a");
			cta.href = "/register";
			cta.className =
				"inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 mt-2";
			cta.textContent = t("nav.getstarted");
			inner.appendChild(cta);
			header.insertBefore(mount, container.nextSibling);
		});
	}

	// ---------------------------------------------------------------------------
	// Boot
	// ---------------------------------------------------------------------------
	function boot() {
		tagI18nNodes();
		var saved = readLS("language");
		if (saved === "pt" || saved === "es") {
			currentLang = saved;
			applyTexts(saved);
		}
		wireHeader();
		refreshTriggers();
		var consent = readLS(CONSENT_KEY);
		if (consent === "all" || consent === "npa") {
			if (consent !== "all") {
				window.adsbygoogle = window.adsbygoogle || [];
				window.adsbygoogle.requestNonPersonalizedAds = 1;
			}
			if ("requestIdleCallback" in window) {
				window.requestIdleCallback(initAnalytics, { timeout: 3000 });
			} else {
				setTimeout(initAnalytics, 0);
			}
		} else {
			ensureBanner();
		}
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", boot);
	} else {
		boot();
	}
})();
