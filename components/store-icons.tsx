import type * as React from "react";

// Store/brand icons inlined as JSX (from Iconify "logos" set) so the landing
// page doesn't pull the icon-picker chunk and the runtime iconify fetch.

interface IconProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
}

export function ChromeIcon({ className, ...props }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			viewBox="0 0 256 256"
			fill="none"
			{...props}
		>
			<title>Google Chrome</title>
			<path
				fill="#fff"
				d="M128.003 199.216c39.335 0 71.221-31.888 71.221-71.223S167.338 56.77 128.003 56.77S56.78 88.658 56.78 127.993s31.887 71.223 71.222 71.223"
			/>
			<path
				fill="#229342"
				d="M35.89 92.997Q27.92 79.192 17.154 64.02a127.98 127.98 0 0 0 110.857 191.981q17.671-24.785 23.996-35.74q12.148-21.042 31.423-60.251v-.015a63.993 63.993 0 0 1-110.857.017Q46.395 111.19 35.89 92.998"
			/>
			<path
				fill="#fbc116"
				d="M128.008 255.996A127.97 127.97 0 0 0 256 127.997A128 128 0 0 0 238.837 64q-36.372-3.585-53.686-3.585q-19.632 0-57.152 3.585l-.014.01a63.99 63.99 0 0 1 55.444 31.987a63.99 63.99 0 0 1-.001 64.01z"
			/>
			<path
				fill="#1a73e8"
				d="M128.003 178.677c27.984 0 50.669-22.685 50.669-50.67s-22.685-50.67-50.67-50.67c-27.983 0-50.669 22.686-50.669 50.67s22.686 50.67 50.67 50.67"
			/>
			<path
				fill="#e33b2e"
				d="M128.003 64.004H238.84a127.973 127.973 0 0 0-221.685.015l55.419 95.99l.015.008a63.993 63.993 0 0 1 55.415-96.014z"
			/>
		</svg>
	);
}

export function FirefoxIcon({ className, ...props }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			viewBox="0 0 256 265"
			fill="none"
			{...props}
		>
			<title>Firefox</title>
			<defs>
				<radialGradient
					id="SVGyidrs6Xz"
					cx="-7907.187"
					cy="-8515.121"
					r="80.797"
					gradientTransform="translate(26367.938 28186.305)scale(3.3067)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".129" stopColor="#ffbd4f" />
					<stop offset=".186" stopColor="#ffac31" />
					<stop offset=".247" stopColor="#ff9d17" />
					<stop offset=".283" stopColor="#ff980e" />
					<stop offset=".403" stopColor="#ff563b" />
					<stop offset=".467" stopColor="#ff3750" />
					<stop offset=".71" stopColor="#f5156c" />
					<stop offset=".782" stopColor="#eb0878" />
					<stop offset=".86" stopColor="#e50080" />
				</radialGradient>
				<radialGradient
					id="SVG0IVpgbgM"
					cx="-7936.711"
					cy="-8482.089"
					r="80.797"
					gradientTransform="translate(26367.938 28186.305)scale(3.3067)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".3" stopColor="#960e18" />
					<stop offset=".351" stopColor="#b11927" stopOpacity=".74" />
					<stop offset=".435" stopColor="#db293d" stopOpacity=".343" />
					<stop offset=".497" stopColor="#f5334b" stopOpacity=".094" />
					<stop offset=".53" stopColor="#ff3750" stopOpacity="0" />
				</radialGradient>
				<radialGradient
					id="SVG5bHMjbfc"
					cx="-7926.97"
					cy="-8533.457"
					r="58.534"
					gradientTransform="translate(26367.938 28186.305)scale(3.3067)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".132" stopColor="#fff44f" />
					<stop offset=".252" stopColor="#ffdc3e" />
					<stop offset=".506" stopColor="#ff9d12" />
					<stop offset=".526" stopColor="#ff980e" />
				</radialGradient>
				<radialGradient
					id="SVGEHoaNdMW"
					cx="-7945.648"
					cy="-8460.984"
					r="38.471"
					gradientTransform="translate(26367.938 28186.305)scale(3.3067)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".353" stopColor="#3a8ee6" />
					<stop offset=".472" stopColor="#5c79f0" />
					<stop offset=".669" stopColor="#9059ff" />
					<stop offset="1" stopColor="#c139e6" />
				</radialGradient>
				<radialGradient
					id="SVG6OUB2b6N"
					cx="-7935.62"
					cy="-8491.546"
					r="20.397"
					gradientTransform="matrix(3.21411 -.77707 .90934 3.76302 33365.914 25904.014)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".206" stopColor="#9059ff" stopOpacity="0" />
					<stop offset=".278" stopColor="#8c4ff3" stopOpacity=".064" />
					<stop offset=".747" stopColor="#7716a8" stopOpacity=".45" />
					<stop offset=".975" stopColor="#6e008b" stopOpacity=".6" />
				</radialGradient>
				<radialGradient
					id="SVGfyXvUXoB"
					cx="-7937.731"
					cy="-8518.427"
					r="27.676"
					gradientTransform="translate(26367.938 28186.305)scale(3.3067)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="#ffe226" />
					<stop offset=".121" stopColor="#ffdb27" />
					<stop offset=".295" stopColor="#ffc82a" />
					<stop offset=".502" stopColor="#ffa930" />
					<stop offset=".732" stopColor="#ff7e37" />
					<stop offset=".792" stopColor="#ff7139" />
				</radialGradient>
				<radialGradient
					id="SVGT2ddtPSF"
					cx="-7915.977"
					cy="-8535.981"
					r="118.081"
					gradientTransform="translate(26367.938 28186.305)scale(3.3067)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".113" stopColor="#fff44f" />
					<stop offset=".456" stopColor="#ff980e" />
					<stop offset=".622" stopColor="#ff5634" />
					<stop offset=".716" stopColor="#ff3647" />
					<stop offset=".904" stopColor="#e31587" />
				</radialGradient>
				<radialGradient
					id="SVGH7WrGcHb"
					cx="-7927.165"
					cy="-8522.859"
					r="86.499"
					gradientTransform="matrix(.3472 3.29017 -2.15928 .22816 -15491.597 28008.376)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" stopColor="#fff44f" />
					<stop offset=".06" stopColor="#ffe847" />
					<stop offset=".168" stopColor="#ffc830" />
					<stop offset=".304" stopColor="#ff980e" />
					<stop offset=".356" stopColor="#ff8b16" />
					<stop offset=".455" stopColor="#ff672a" />
					<stop offset=".57" stopColor="#ff3647" />
					<stop offset=".737" stopColor="#e31587" />
				</radialGradient>
				<radialGradient
					id="SVGLGsqnb9u"
					cx="-7938.383"
					cy="-8508.176"
					r="73.72"
					gradientTransform="translate(26367.938 28186.305)scale(3.3067)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".137" stopColor="#fff44f" />
					<stop offset=".48" stopColor="#ff980e" />
					<stop offset=".592" stopColor="#ff5634" />
					<stop offset=".655" stopColor="#ff3647" />
					<stop offset=".904" stopColor="#e31587" />
				</radialGradient>
				<radialGradient
					id="SVGYSHzlc1q"
					cx="-7918.923"
					cy="-8503.861"
					r="80.686"
					gradientTransform="translate(26367.938 28186.305)scale(3.3067)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".094" stopColor="#fff44f" />
					<stop offset=".231" stopColor="#ffe141" />
					<stop offset=".509" stopColor="#ffaf1e" />
					<stop offset=".626" stopColor="#ff980e" />
				</radialGradient>
				<linearGradient
					id="SVGyUi6ncnI"
					x1="70.786"
					x2="6.447"
					y1="12.393"
					y2="74.468"
					gradientTransform="translate(-2.999 -.01)scale(3.3067)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".048" stopColor="#fff44f" />
					<stop offset=".111" stopColor="#ffe847" />
					<stop offset=".225" stopColor="#ffc830" />
					<stop offset=".368" stopColor="#ff980e" />
					<stop offset=".401" stopColor="#ff8b16" />
					<stop offset=".462" stopColor="#ff672a" />
					<stop offset=".534" stopColor="#ff3647" />
					<stop offset=".705" stopColor="#e31587" />
				</linearGradient>
				<linearGradient
					id="SVG1UrWScUt"
					x1="70.013"
					x2="15.267"
					y1="12.061"
					y2="66.806"
					gradientTransform="translate(-2.999 -.01)scale(3.3067)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".167" stopColor="#fff44f" stopOpacity=".8" />
					<stop offset=".266" stopColor="#fff44f" stopOpacity=".634" />
					<stop offset=".489" stopColor="#fff44f" stopOpacity=".217" />
					<stop offset=".6" stopColor="#fff44f" stopOpacity="0" />
				</linearGradient>
			</defs>
			<path
				fill="url(#SVGyUi6ncnI)"
				d="M248.033 88.713c-5.569-13.399-16.864-27.866-25.71-32.439a133.2 133.2 0 0 1 12.979 38.9l.023.215c-14.49-36.126-39.062-50.692-59.13-82.41a155 155 0 0 1-3.019-4.907a41 41 0 0 1-1.412-2.645a23.3 23.3 0 0 1-1.912-5.076a.33.33 0 0 0-.291-.331a.5.5 0 0 0-.241 0c-.016 0-.043.03-.063.037s-.063.036-.092.049l.049-.086c-32.19 18.849-43.113 53.741-44.118 71.194a64.1 64.1 0 0 0-35.269 13.593a38 38 0 0 0-3.307-2.506a59.4 59.4 0 0 1-.36-31.324a94.9 94.9 0 0 0-30.848 23.841h-.06c-5.079-6.438-4.722-27.667-4.431-32.102a23 23 0 0 0-4.279 2.272a93.4 93.4 0 0 0-12.526 10.73a112 112 0 0 0-11.98 14.375v.019v-.023A108.3 108.3 0 0 0 4.841 108.92l-.171.846a204 204 0 0 0-1.26 8.003c0 .096-.02.185-.03.281a122 122 0 0 0-2.08 17.667v.662c.086 98.661 106.944 160.23 192.344 110.825a128.17 128.17 0 0 0 62.12-89.153c.215-1.653.39-3.29.582-4.96a131.8 131.8 0 0 0-8.313-64.378M100.322 189.031c.599.288 1.161.599 1.776.873l.089.057a69 69 0 0 1-1.865-.93m135.013-93.612v-.123l.023.136z"
			/>
			<path
				fill="url(#SVGyidrs6Xz)"
				d="M248.033 88.713c-5.569-13.399-16.864-27.866-25.71-32.439a133.2 133.2 0 0 1 12.979 38.9v.122l.023.136a116.07 116.07 0 0 1-3.988 86.497c-14.688 31.516-50.242 63.819-105.894 62.248c-60.132-1.703-113.089-46.323-122.989-104.766c-1.802-9.216 0-13.888.906-21.378a95.4 95.4 0 0 0-2.06 17.684v.662c.086 98.661 106.944 160.23 192.344 110.825a128.17 128.17 0 0 0 62.12-89.153c.215-1.653.39-3.29.582-4.96a131.8 131.8 0 0 0-8.313-64.378"
			/>
			<path
				fill="url(#SVG0IVpgbgM)"
				d="M248.033 88.713c-5.569-13.399-16.864-27.866-25.71-32.439a133.2 133.2 0 0 1 12.979 38.9v.122l.023.136a116.07 116.07 0 0 1-3.988 86.497c-14.688 31.516-50.242 63.819-105.894 62.248c-60.132-1.703-113.089-46.323-122.989-104.766c-1.802-9.216 0-13.888.906-21.378a95.4 95.4 0 0 0-2.06 17.684v.662c.086 98.661 106.944 160.23 192.344 110.825a128.17 128.17 0 0 0 62.12-89.153c.215-1.653.39-3.29.582-4.96a131.8 131.8 0 0 0-8.313-64.378"
			/>
			<path
				fill="url(#SVG5bHMjbfc)"
				d="M185.754 103.778c.278.195.536.39.797.585a69.8 69.8 0 0 0-11.904-15.525C134.815 48.999 164.208 2.457 169.165.093l.049-.073c-32.19 18.849-43.113 53.741-44.118 71.194c1.495-.103 2.976-.229 4.504-.229a64.68 64.68 0 0 1 56.154 32.793"
			/>
			<path
				fill="url(#SVGEHoaNdMW)"
				d="M129.683 111.734c-.212 3.188-11.475 14.182-15.413 14.182c-36.443 0-42.359 22.046-42.359 22.046c1.614 18.564 14.55 33.854 30.187 41.942c.714.371 1.439.705 2.163 1.032a71 71 0 0 0 3.763 1.541a57 57 0 0 0 16.675 3.217c63.876 2.996 76.25-76.384 30.154-99.419a44.24 44.24 0 0 1 30.901 7.503A64.68 64.68 0 0 0 129.6 70.985c-1.521 0-3.009.126-4.504.229a64.1 64.1 0 0 0-35.269 13.593c1.954 1.654 4.16 3.863 8.806 8.442c8.696 8.568 31 17.443 31.05 18.485"
			/>
			<path
				fill="url(#SVG6OUB2b6N)"
				d="M129.683 111.734c-.212 3.188-11.475 14.182-15.413 14.182c-36.443 0-42.359 22.046-42.359 22.046c1.614 18.564 14.55 33.854 30.187 41.942c.714.371 1.439.705 2.163 1.032a71 71 0 0 0 3.763 1.541a57 57 0 0 0 16.675 3.217c63.876 2.996 76.25-76.384 30.154-99.419a44.24 44.24 0 0 1 30.901 7.503A64.68 64.68 0 0 0 129.6 70.985c-1.521 0-3.009.126-4.504.229a64.1 64.1 0 0 0-35.269 13.593c1.954 1.654 4.16 3.863 8.806 8.442c8.696 8.568 31 17.443 31.05 18.485"
			/>
			<path
				fill="url(#SVGfyXvUXoB)"
				d="M83.852 80.545a82 82 0 0 1 2.645 1.756a59.4 59.4 0 0 1-.36-31.324a94.9 94.9 0 0 0-30.849 23.841c.625-.017 19.216-.351 28.564 5.727"
			/>
			<path
				fill="url(#SVGT2ddtPSF)"
				d="M2.471 139.411c9.89 58.443 62.857 103.063 122.989 104.766c55.652 1.574 91.205-30.732 105.894-62.248a116.07 116.07 0 0 0 3.988-86.497v-.122c0-.096-.02-.153 0-.123l.023.215c4.547 29.684-10.552 58.443-34.155 77.889l-.073.166c-45.989 37.455-90.002 22.598-98.91 16.533a65 65 0 0 1-1.865-.929c-26.814-12.817-37.891-37.247-35.517-58.198a32.91 32.91 0 0 1-30.359-19.096a48.34 48.34 0 0 1 47.117-1.891a63.82 63.82 0 0 0 48.119 1.891c-.049-1.042-22.353-9.92-31.05-18.484c-4.646-4.58-6.851-6.786-8.805-8.442a38 38 0 0 0-3.307-2.507c-.761-.519-1.617-1.081-2.645-1.756c-9.348-6.078-27.939-5.744-28.554-5.727h-.059c-5.079-6.438-4.722-27.667-4.431-32.101a23 23 0 0 0-4.279 2.271a93.4 93.4 0 0 0-12.526 10.73a112 112 0 0 0-12.03 14.342v.019v-.023A108.3 108.3 0 0 0 4.841 108.92c-.062.261-4.616 20.167-2.37 30.491"
			/>
			<path
				fill="url(#SVGH7WrGcHb)"
				d="M174.654 88.838a69.8 69.8 0 0 1 11.904 15.542a27 27 0 0 1 1.921 1.574c29.056 26.784 13.832 64.646 12.698 67.341c23.603-19.447 38.688-48.205 34.155-77.89c-14.497-36.142-39.069-50.708-59.137-82.426a155 155 0 0 1-3.019-4.907a41 41 0 0 1-1.412-2.645a23.3 23.3 0 0 1-1.912-5.076a.33.33 0 0 0-.291-.331a.5.5 0 0 0-.241 0c-.016 0-.043.03-.063.037s-.063.036-.092.049c-4.957 2.351-34.35 48.893 5.489 88.732"
			/>
			<path
				fill="url(#SVGLGsqnb9u)"
				d="M188.459 105.937a27 27 0 0 0-1.921-1.574c-.261-.195-.519-.39-.797-.585a44.24 44.24 0 0 0-30.901-7.503c46.095 23.048 33.728 102.415-30.154 99.419a57 57 0 0 1-16.675-3.217a67 67 0 0 1-3.763-1.541c-.725-.331-1.449-.661-2.163-1.032l.089.057c8.908 6.081 52.907 20.938 98.91-16.534l.073-.165c1.147-2.679 16.371-40.55-12.698-67.325"
			/>
			<path
				fill="url(#SVGYSHzlc1q)"
				d="M71.911 147.962s5.916-22.046 42.359-22.046c3.938 0 15.211-10.994 15.413-14.182a63.82 63.82 0 0 1-48.119-1.892a48.34 48.34 0 0 0-47.118 1.892a32.91 32.91 0 0 0 30.359 19.096c-2.374 20.955 8.703 45.385 35.517 58.198c.599.288 1.161.599 1.776.873c-15.65-8.085-28.573-23.375-30.187-41.939"
			/>
			<path
				fill="url(#SVG1UrWScUt)"
				d="M248.033 88.713c-5.569-13.399-16.864-27.866-25.71-32.439a133.2 133.2 0 0 1 12.979 38.9l.023.215c-14.49-36.126-39.062-50.692-59.13-82.41a155 155 0 0 1-3.019-4.907a41 41 0 0 1-1.412-2.645a23.3 23.3 0 0 1-1.912-5.076a.33.33 0 0 0-.291-.331a.5.5 0 0 0-.241 0c-.016 0-.043.03-.063.037s-.063.036-.092.049l.049-.086c-32.19 18.849-43.113 53.741-44.118 71.194c1.495-.103 2.976-.229 4.504-.229a64.68 64.68 0 0 1 56.154 32.793a44.24 44.24 0 0 0-30.901-7.503c46.096 23.048 33.729 102.415-30.154 99.419a57 57 0 0 1-16.675-3.217a67 67 0 0 1-3.763-1.541c-.724-.331-1.449-.661-2.163-1.032l.089.057a69 69 0 0 1-1.865-.93c.599.288 1.161.599 1.776.873c-15.65-8.088-28.573-23.378-30.187-41.942c0 0 5.916-22.046 42.359-22.046c3.938 0 15.211-10.994 15.413-14.182c-.05-1.042-22.354-9.92-31.05-18.485c-4.646-4.579-6.852-6.785-8.806-8.442a38 38 0 0 0-3.307-2.506a59.4 59.4 0 0 1-.36-31.324a94.9 94.9 0 0 0-30.848 23.841h-.06c-5.079-6.438-4.722-27.667-4.431-32.102a23 23 0 0 0-4.279 2.272a93.4 93.4 0 0 0-12.526 10.73a112 112 0 0 0-11.98 14.375v.019v-.023A108.3 108.3 0 0 0 4.841 108.92l-.171.846c-.242 1.128-1.323 6.855-1.479 8.085c0 .093 0-.096 0 0A149 149 0 0 0 1.3 135.717v.662c.086 98.661 106.944 160.23 192.344 110.825a128.17 128.17 0 0 0 62.12-89.153c.215-1.653.39-3.29.582-4.96a131.8 131.8 0 0 0-8.313-64.378m-12.715 6.583l.024.136z"
			/>
		</svg>
	);
}

export function GooglePlayIcon({ className, ...props }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			viewBox="0 0 256 283"
			fill="none"
			{...props}
		>
			<title>Google Play</title>
			<path
				fill="#ea4335"
				d="M119.553 134.916L1.06 259.061a32.14 32.14 0 0 0 47.062 19.071l133.327-75.934z"
			/>
			<path
				fill="#fbbc04"
				d="M239.37 113.814L181.715 80.79l-64.898 56.95l65.162 64.28l57.216-32.67a31.345 31.345 0 0 0 0-55.537z"
			/>
			<path
				fill="#4285f4"
				d="M1.06 23.487A30.6 30.6 0 0 0 0 31.61v219.327a32.3 32.3 0 0 0 1.06 8.124l122.555-120.966z"
			/>
			<path
				fill="#34a853"
				d="m120.436 141.274l61.278-60.483L48.564 4.503A32.85 32.85 0 0 0 32.051 0C17.644-.028 4.978 9.534 1.06 23.399z"
			/>
		</svg>
	);
}

export function AppStoreIcon({ className, ...props }: IconProps) {
	return (
		<svg
			aria-hidden="true"
			className={className}
			viewBox="0 0 256 256"
			fill="none"
			{...props}
		>
			<title>Apple App Store</title>
			<defs>
				<linearGradient id="SVG5lqYietg" x1="50%" x2="50%" y1="0%" y2="100%">
					<stop offset="0%" stopColor="#17c9fb" />
					<stop offset="100%" stopColor="#1a74e8" />
				</linearGradient>
			</defs>
			<path
				fill="url(#SVG5lqYietg)"
				d="M56.064 0h143.872C230.9 0 256 25.1 256 56.064v143.872C256 230.9 230.9 256 199.936 256H56.064C25.1 256 0 230.9 0 199.936V56.064C0 25.1 25.1 0 56.064 0"
			/>
			<path
				fill="#fff"
				d="m82.042 185.81l.024.008l-8.753 15.16c-3.195 5.534-10.271 7.43-15.805 4.235s-7.43-10.271-4.235-15.805l6.448-11.168l.619-1.072c1.105-1.588 3.832-4.33 9.287-3.814c0 0 12.837 1.393 13.766 8.065c0 0 .126 2.195-1.351 4.391m124.143-38.72h-27.294c-1.859-.125-2.67-.789-2.99-1.175l-.02-.035l-29.217-50.606l-.038.025l-1.752-2.512c-2.872-4.392-7.432 6.84-7.432 6.84c-5.445 12.516.773 26.745 2.94 31.046l40.582 70.29c3.194 5.533 10.27 7.43 15.805 4.234c5.533-3.195 7.43-10.271 4.234-15.805l-10.147-17.576c-.197-.426-.539-1.582 1.542-1.587h13.787c6.39 0 11.57-5.18 11.57-11.57s-5.18-11.57-11.57-11.57m-53.014 15.728s1.457 7.411-4.18 7.411H48.092c-6.39 0-11.57-5.18-11.57-11.57s5.18-11.57 11.57-11.57h25.94c4.188-.242 5.18-2.66 5.18-2.66l.024.012l33.86-58.648l-.01-.002c.617-1.133.103-2.204.014-2.373l-11.183-19.369c-3.195-5.533-1.299-12.61 4.235-15.804s12.61-1.3 15.805 4.234l5.186 8.983l5.177-8.967c3.195-5.533 10.271-7.43 15.805-4.234s7.43 10.27 4.235 15.804l-47.118 81.61c-.206.497-.269 1.277 1.264 1.414h28.164l.006.275s16.278.253 18.495 15.454"
			/>
		</svg>
	);
}
