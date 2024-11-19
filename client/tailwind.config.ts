import flowbite from 'flowbite-react/tailwind'
import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		flowbite.content(),
	],
	theme: {
		extend: {
			backgroundImage: {
				'section-button': "url('/img/section-button-bg.png')",
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',

				primary: {
					a: {
						100: '#DFD1F3',
						200: '#BFA3E7',
						300: '#9F74DC',
						400: '#9F74DC',
						500: '#632DAF',
						600: '#532692',
						700: '#421E75',
						800: '#321758',
						900: '#210F3A',
					},
					b: {
						100: '#E8C9F1',
						200: '#D194E2',
						300: '#B95ED4',
						400: '#9D32BC',
						500: '#702486',
						600: '#5A1D6B',
						700: '#431650',
						800: '#2D0E36',
						900: '#16071B',
					},
				},
				secondary: {
					100: '#C0D6FB',
					200: '#A1C2FA',
					300: '#81AEF8',
					400: '#6299F6',
					500: '#4285F4',
					600: '#0E61EA',
					700: '#0A49B0',
					800: '#073075',
					900: '#03183B',
				},
				card: '#1F2937',
				category_tag: {
					bg: '#F3E3FBBF',
					text: '#812AAC',
				},
			},
		},
	},
	plugins: [flowbite.plugin()],
} satisfies Config
