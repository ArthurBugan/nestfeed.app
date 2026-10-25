"use client";

import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { translations as englishTranslations } from "@/components/translations/en";

type Language = "en" | "pt" | "es";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

// English ships eagerly (SSR + hydration default). Other locales are
// dynamic-imported on demand so they stay out of the initial bundle.
type Dict = Partial<Record<string, string>>;

const localeLoaders: Record<
	Exclude<Language, "en">,
	() => Promise<{ translations: Record<string, string> }>
> = {
	pt: () => import("@/components/translations/pt"),
	es: () => import("@/components/translations/es"),
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>("en");
	const [, setTick] = useState(0);
	const loadedRef = useRef<Partial<Record<Language, Dict>>>({
		en: englishTranslations,
	});

	const loadLocale = useCallback((lang: Language) => {
		if (lang === "en" || loadedRef.current[lang]) return;
		loadedRef.current[lang] = {}; // placeholder while the chunk loads
		localeLoaders[lang]?.()
			.then((mod) => {
				loadedRef.current[lang] = mod.translations;
				setTick((v) => v + 1);
			})
			.catch(() => {
				loadedRef.current[lang] = undefined;
			});
	}, []);

	useEffect(() => {
		const savedLanguage = localStorage.getItem("language") as Language;
		if (savedLanguage && ["en", "pt", "es"].includes(savedLanguage)) {
			loadLocale(savedLanguage);
			setLanguage(savedLanguage);
		}
	}, [loadLocale]);

	const changeLanguage = (lang: Language) => {
		localStorage.setItem("language", lang);
		loadLocale(lang);
		setLanguage(lang);
	};

	const t = (key: string, params?: Record<string, string>): string => {
		const dict = loadedRef.current[language];
		const translation =
			dict?.[key] ??
			englishTranslations[key as keyof typeof englishTranslations];
		if (translation && params) {
			return Object.keys(params).reduce((acc, paramKey) => {
				const placeholder = `{${paramKey}}`;
				return acc.replace(new RegExp(placeholder, "g"), params[paramKey]);
			}, translation);
		}
		return translation || key;
	};

	return (
		<LanguageContext.Provider
			value={{ language, setLanguage: changeLanguage, t }}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
