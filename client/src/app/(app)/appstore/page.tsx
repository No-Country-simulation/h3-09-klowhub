'use client'
import Button from '@/components/buttons/Button'
import ApplicationCard from '@/components/cards/ApplicationCard'
import AppModal from '@/components/modals/AppModal'
import { App } from '@/models/app.model'
import { ListFilter, ListOrdered, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

const apps: App[] = [
	{
		id: '1',
		title: 'Control de Inventario para retail',
		shortDescription:
			'App diseñada para gestionar y monitorear el stock en tiendas físicas.',
		price: 800,
		platform: 'AppSheet',
		language: 'Español',
		sector: 'Logistica',
		toolsAndPlatforms: ['AppSheet'],
		functionalities: ['Logistica', 'Retail'],
		relatedTags: ['Optimizacion', 'Flexibilidad', 'Mantenimiento'],
		image: 'https://picsum.photos/200/100',
		targetAudience: 'Comercios',
		benefits: ['Orden', 'Escalabilidad', 'Practicidad'],
		additionalMedia: [
			'https://example.com/advanced1',
			'https://example.com/advanced1'
		],
		detailedDescription:
			'Con nuestra plataforma de gestión de proyectos, podrás coordinar equipos, establecer plazos y hacer seguimiento de cada tarea en un solo lugar. Visualiza el avance en tiempo real, asigna prioridades y asegúrate de que todos estén alineados con los objetivos.',
		links: {
			mobile: '/',
			desktop: '/'
		},
		reviews: [
			{
				score: 5,
				text: 'Esta app superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió organizar mi negocio en tiempo récord.',
				reviewer: 'Mariana Lopez'
			},
			{
				score: 5,
				text: 'Nunca pensé que podría organizar mi negocio tan rapido Gracias a Sebastián, ahora puedo automatizar varias tareas en mi trabajo. ¡Muy recomendado!',
				reviewer: 'Marta Torres'
			},
			{
				score: 4,
				text: 'El enfoque práctico de Sebastián es perfecto para organizar un negocio. Su experiencia se nota en parte de la app y las herramientas que proporciona son súper útiles.',
				reviewer: 'Rodrigo Baez'
			},
			{
				score: 4,
				text: 'Excelente app para quienes quieren iniciarse en el mundo no-code. Sebastián sabe cómo optimizarprocesos manera efectiva y accesible.',
				reviewer: 'Mario Perez'
			}
		]
	},
	{
		id: '2',
		title: 'Optimizador de ventas',
		shortDescription:
			'App diseñada para gestionar y monitorear el stock en tiendas físicas.',
		price: 650,
		platform: 'AppSheet',
		language: 'Español',
		sector: 'Logistica',
		toolsAndPlatforms: ['AppSheet'],
		functionalities: ['Logistica', 'Inventarios'],
		relatedTags: ['Optimizacion', 'Flexibilidad', 'Mantenimiento'],
		image: 'https://picsum.photos/200/100',
		targetAudience: 'Comercios',
		benefits: ['Orden', 'Escalabilidad', 'Practicidad'],
		additionalMedia: [
			'https://example.com/advanced1',
			'https://example.com/advanced1'
		],
		detailedDescription:
			'Con nuestra plataforma de gestión de proyectos, podrás coordinar equipos, establecer plazos y hacer seguimiento de cada tarea en un solo lugar. Visualiza el avance en tiempo real, asigna prioridades y asegúrate de que todos estén alineados con los objetivos.',
		links: {
			mobile: '/',
			desktop: '/'
		},
		reviews: [
			{
				score: 5,
				text: 'Esta app superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió organizar mi negocio en tiempo récord.',
				reviewer: 'Mariana Lopez'
			},
			{
				score: 5,
				text: 'Nunca pensé que podría organizar mi negocio tan rapido Gracias a Sebastián, ahora puedo automatizar varias tareas en mi trabajo. ¡Muy recomendado!',
				reviewer: 'Marta Torres'
			},
			{
				score: 4,
				text: 'El enfoque práctico de Sebastián es perfecto para organizar un negocio. Su experiencia se nota en parte de la app y las herramientas que proporciona son súper útiles.',
				reviewer: 'Rodrigo Baez'
			},
			{
				score: 4,
				text: 'Excelente app para quienes quieren iniciarse en el mundo no-code. Sebastián sabe cómo optimizarprocesos manera efectiva y accesible.',
				reviewer: 'Mario Perez'
			}
		]
	},
	{
		id: '3',
		title: 'Integrador de ventas y gestion',
		shortDescription:
			'App diseñada para gestionar y monitorear el stock en tiendas físicas.',
		price: 900,
		platform: 'AppSheet',
		language: 'Ingles',
		sector: 'Logistica',
		toolsAndPlatforms: ['AppSheet'],
		functionalities: ['Logistica', 'Inventarios', 'Retail'],
		relatedTags: ['Optimizacion', 'Flexibilidad', 'Mantenimiento'],
		image: 'https://picsum.photos/200/100',
		targetAudience: 'Comercios',
		benefits: ['Orden', 'Escalabilidad', 'Practicidad'],
		additionalMedia: [
			'https://example.com/advanced1',
			'https://example.com/advanced1'
		],
		detailedDescription:
			'Con nuestra plataforma de gestión de proyectos, podrás coordinar equipos, establecer plazos y hacer seguimiento de cada tarea en un solo lugar. Visualiza el avance en tiempo real, asigna prioridades y asegúrate de que todos estén alineados con los objetivos.',
		links: {
			mobile: '/',
			desktop: '/'
		},
		reviews: [
			{
				score: 5,
				text: 'Esta app superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió organizar mi negocio en tiempo récord.',
				reviewer: 'Mariana Lopez'
			},
			{
				score: 5,
				text: 'Nunca pensé que podría organizar mi negocio tan rapido Gracias a Sebastián, ahora puedo automatizar varias tareas en mi trabajo. ¡Muy recomendado!',
				reviewer: 'Marta Torres'
			},
			{
				score: 4,
				text: 'El enfoque práctico de Sebastián es perfecto para organizar un negocio. Su experiencia se nota en parte de la app y las herramientas que proporciona son súper útiles.',
				reviewer: 'Rodrigo Baez'
			},
			{
				score: 4,
				text: 'Excelente app para quienes quieren iniciarse en el mundo no-code. Sebastián sabe cómo optimizarprocesos manera efectiva y accesible.',
				reviewer: 'Mario Perez'
			},
			{
				score: 5,
				text: 'Esta app es una herramienta imprescindible para cualquier negocio.',
				reviewer: 'Juan Carlos Mansilla'
			}
		]
	}
]

const categories = [
	{ name: 'Logistica' },
	{ name: 'Retail' },
	{ name: 'Inventarios' }
]

export default function AppStorePage() {
	const [appSelected, setAppSelected] = useState<App | null>(null)
	const [filteredResult, setFilteredResult] = useState<App[]>([])
	const [filterByCategory, setFilterByCategory] = useState<string | null>(null)
	const [searchInput, setSearchInput] = useState('')
	useEffect(() => {
		console.log(searchInput)
	}, [searchInput])
	useEffect(() => {
		const filteredByTitle = apps.filter((app) =>
			app.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
		)
		const filtered = filteredByTitle.filter((app) => {
			if (filterByCategory) {
				return app.functionalities.some(
					(name) =>
						name.toLocaleLowerCase() === filterByCategory.toLocaleLowerCase()
				)
			} else {
				return apps
			}
		})
		setFilteredResult(filtered)
	}, [filterByCategory, searchInput])

	return (
		<article className="space-y-5">
			<h1 className="text-[16px] font-semibold">
				Encuentra la app que necesitas
			</h1>

			<section>
				<div className="flex flex-col gap-3 sm:flex-row">
					<div className="flex w-full items-center rounded-lg bg-white">
						<Search color="#555" className="mx-3" size={18} />
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Buscar por nombre o categoria de la app"
							className="w-full rounded-lg border-0 border-none px-0 py-2 text-black outline-0 focus:ring-0"
						/>
					</div>
					<Button variant="secondary" size="l" icon={<ListFilter />}>
						Filtros
					</Button>
					<Button variant="secondary" size="l" icon={<ListOrdered />}>
						Ordenar por
					</Button>
				</div>
				<div className="my-3 flex flex-nowrap gap-3 overflow-x-auto">
					{categories.map((category, i) => (
						<Button
							key={i}
							variant={
								filterByCategory === category.name ? 'primary' : 'secondary'
							}
							size="l"
							onClick={() => {
								if (filterByCategory === category.name) {
									setFilterByCategory(null)
								} else {
									setFilterByCategory(category.name)
								}
							}}
						>
							{category.name}
						</Button>
					))}
				</div>
			</section>
			<section className="flex flex-col gap-4 md:flex-row">
				{filteredResult.map((app) => (
					<ApplicationCard
						key={app.id}
						app={app}
						setProductSelected={setAppSelected}
					/>
				))}
				{appSelected && (
					<AppModal setAppSelected={setAppSelected} app={appSelected} />
				)}
			</section>
		</article>
	)
}
