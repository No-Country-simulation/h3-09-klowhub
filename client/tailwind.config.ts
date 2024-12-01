import flowbite from 'flowbite-react/tailwind'
import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		flowbite.content()
	],
	theme: {
		extend: {
			backgroundImage: {
				'section-button': "url('/img/section-button-bg.png')",
				'home-banner': "url('/img/banner-bg.png')",
				'custom-gradient': 'linear-gradient(to right, #201C2D, #201D43,#262136)'
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
						900: '#210F3A'
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
						900: '#16071B'
					}
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
					900: '#03183B'
				},
				card: '#1F2937',
				category_tag: {
					bg: '#F3E3FBBF',
					text: '#812AAC'
				},
				app_tags: {
					status: {
						tab: {
							success: {
								bg: '#B2FFC6',
								text: '#27960C'
							},
							pending: {
								bg: '#EAD7A7',
								text: '#CB9700'
							}
						},
						card: {
							success: {
								bg: '#07C30E26',
								text: '#07C30E'
							},
							inProgress: {
								bg: '#14B8A626',
								text: '#14B8A6'
							},
							pending: {
								bg: '#DEE20026',
								text: '#DEE200'
							}
						}
					},
					knowledge: {
						design: {
							bg: '#ADC6F6',
							text: '#0252CA'
						},
						appsheet: {
							bg: '#F3C8FF',
							text: '#702486'
						},
						product: {
							bg: '#E8B88D',
							text: '#CA6100'
						}
					},
					priority: {
						high: {
							bg: '#FF000026',
							text: '#FF0000'
						},
						medium: {
							bg: '#FFB80026',
							text: '#FFB800'
						},
						low: {
							bg: '#07C30E26',
							text: '#07C30E'
						}
					},
					stage: {
						design: {
							bg: '#A086DB26',
							text: '#A086DB'
						},
						development: {
							bg: '#6BFBA426',
							text: '#6BFBA4'
						}
					},
					type: {
						lesson: {
							bg: '#CDFFDBE5',
							text: '#3FC262'
						},
						app: {
							bg: '#14B8A626',
							text: '#14B8A6'
						},
						mentoring: {
							bg: '#DEE20026',
							text: '#DEE200'
						},
						project: {
							bg: '#BF4DE826',
							text: '#BF4DE8'
						},
						course: {
							bg: '#F7E5FFF2',
							text: '#AE53DA'
						}
					}
				}
			}
		}
	},
	plugins: [flowbite.plugin()]
} satisfies Config
