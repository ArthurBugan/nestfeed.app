import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/components/language-provider";

export function NotFound({ children }: { children?: any }) {
	const { t } = useLanguage();
	return (
		<div className="space-y-2 p-2">
			<div className="text-gray-600 dark:text-gray-400">
				{children || <p>{t("notfound.description")}</p>}
			</div>
			<p className="flex items-center gap-2 flex-wrap">
				<button
					type="button"
					onClick={() => window.history.back()}
					className="bg-emerald-500 text-white px-2 py-1 rounded uppercase font-black text-sm"
				>
					{t("notfound.goback")}
				</button>
				<Link
					to="/"
					className="bg-cyan-600 text-white px-2 py-1 rounded uppercase font-black text-sm"
				>
					{t("notfound.startover")}
				</Link>
			</p>
		</div>
	);
}
