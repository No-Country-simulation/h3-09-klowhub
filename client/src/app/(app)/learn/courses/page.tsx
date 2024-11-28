'use client'
import Button from '@/components/buttons/Button'
import { CourseHorizontalCard } from '@/components/cards/CourseHorizontalCard'
import CourseModal from '@/components/modals/CourseModal'
import { Course } from '@/models/course.model'
import { ListFilter, ListOrdered, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
const courses: Course[] = [
	{
		id: '1',
		title: 'Introducción a AppSheet',
		shortDescription:
			'Aprende los conceptos básicos para crear aplicaciones con AppSheet.',
		platform: 'appsheet',
		language: 'Español',
		sector: 'Tecnología',
		toolsAndPlatforms: ['AppSheet'],
		functionalities: ['APIs', 'Ventas'],
		relatedTags: ['Automatización', 'No-Code'],
		image: 'https://picsum.photos/200/100',
		contentType: 'free',
		courseType: 'course',
		level: 'basic',
		contentPillar: 'Automatización',
		learningOutcomes: [
			'Crear aplicaciones básicas',
			'Comprender los flujos de trabajo'
		],
		prerequisites: [],
		detailedDescription:
			'Este curso te introducirá a AppSheet y te enseñará cómo crear aplicaciones básicas sin código.',
		modules: [
			{
				title: 'Módulo 1: Introducción',
				description: 'Conoce la plataforma AppSheet.',
				lessons: [
					{
						title: 'Lección 1: ¿Qué es AppSheet?',
						description: 'Breve introducción a la plataforma.',
						contentLink: 'https://example.com/leccion1',
						image: ''
					},
					{
						title: 'Lección 2: Crear tu primera aplicación',
						description: 'Pasos para crear una aplicación básica.',
						contentLink: 'https://example.com/leccion2',
						additionalResources: ['https://example.com/resource1'],
						image: ''
					}
				]
			},
			{
				title: 'Módulo 2: Flujos de trabajo',
				description: 'Aprende a crear flujos de trabajo en AppSheet.',
				lessons: [
					{
						title: 'Lección 1: Introducción a los flujos de trabajo',
						description: 'Conceptos básicos de los flujos de trabajo.',
						contentLink: 'https://example.com/leccion3',
						image: ''
					}
				]
			}
		],
		reviews: [
			{
				score: 2,
				text: 'Este curso superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió crear mi primera aplicación en tiempo récord.',
				reviewer: 'Mariana López'
			},
			{
				score: 5,
				text: 'Este curso superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió crear mi primera aplicación en tiempo récord.',
				reviewer: 'Mariana López'
			},
			{
				score: 3,
				text: 'Este curso superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió crear mi primera aplicación en tiempo récord.',
				reviewer: 'Mariana López'
			}
		],
		creator: {
			id: '',
			name: '',
			bio: ''
		}
	},
	{
		id: '2',
		title: 'Automatización avanzada con PowerApps',
		shortDescription:
			'Aprende a automatizar procesos complejos usando PowerApps.',
		platform: 'powerapps',
		language: 'Inglés',
		sector: 'Negocios',
		toolsAndPlatforms: ['PowerApps', 'AppSheet'],
		functionalities: ['APIs', 'Integraciones', 'Automatizaciones'],
		relatedTags: ['Automatización', 'Flujos de trabajo'],
		image: 'https://picsum.photos/200/100',
		contentType: 'paid',
		courseType: 'course',
		level: 'advanced',
		contentPillar: 'Automatización',
		learningOutcomes: [
			'Automatizar procesos',
			'Integrar PowerApps con otros servicios'
		],
		prerequisites: ['Conocimientos básicos de PowerApps'],
		detailedDescription:
			'Este curso avanzado te enseñará cómo automatizar procesos complejos utilizando PowerApps.',
		modules: [
			{
				title: 'Módulo 1: Configuración avanzada',
				description: 'Configuración avanzada de PowerApps.',
				lessons: [
					{
						title: 'Lección 1: Configuraciones iniciales',
						description: 'Cómo configurar PowerApps para proyectos avanzados.',
						contentLink: 'https://example.com/advanced1',
						image: ''
					},
					{
						title: 'Lección 1: Configuraciones iniciales',
						description: 'Cómo configurar PowerApps para proyectos avanzados.',
						contentLink: 'https://example.com/advanced1',
						image: ''
					},
					{
						title: 'Lección 1: Configuraciones iniciales',
						description: 'Cómo configurar PowerApps para proyectos avanzados.',
						contentLink: 'https://example.com/advanced1',
						image: ''
					}
				]
			},
			{
				title: 'Módulo 2: Integraciones con Flow',
				description: 'Aprende a integrar PowerApps con Microsoft Flow.',
				lessons: [
					{
						title: 'Lección 1: Crear un flujo',
						description: 'Pasos para crear un flujo en Microsoft Flow.',
						contentLink: 'https://example.com/advanced2',
						additionalResources: ['https://example.com/resource2'],
						image: ''
					}
				]
			}
		],
		reviews: [
			{
				score: 2,
				text: 'Este curso superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió crear mi primera aplicación en tiempo récord.',
				reviewer: 'Mariana López'
			},
			{
				score: 5,
				text: 'Este curso superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió crear mi primera aplicación en tiempo récord.',
				reviewer: 'Mariana López'
			},
			{
				score: 3,
				text: 'Este curso superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió crear mi primera aplicación en tiempo récord.',
				reviewer: 'Mariana López'
			},
			{
				score: 4,
				text: 'Este curso superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió crear mi primera aplicación en tiempo récord.',
				reviewer: 'Mariana López'
			},
			{
				score: 5,
				text: 'Este curso superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió crear mi primera aplicación en tiempo récord.',
				reviewer: 'Mariana López'
			}
		],
		creator: {
			id: '',
			name: '',
			bio: ''
		}
	}
]

const categories = [
	{ name: 'integraciones' },
	{ name: 'APIs' },
	{ name: 'Ventas' },
	{ name: 'Automatizaciones' }
]

export default function Page() {
	const [courseSelected, setCourseSelected] = useState<Course | null>(null)
	const [filteredResult, setFilteredResult] = useState<Course[]>([])
	const [filterByCategory, setFilterByCategory] = useState<string | null>(null)
	const [searchInput, setSearchInput] = useState('')
	useEffect(() => {
		console.log(searchInput)
	}, [searchInput])
	useEffect(() => {
		const filteredByTitle = courses.filter((course) =>
			course.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
		)
		const filtered = filteredByTitle.filter((course) => {
			if (filterByCategory) {
				return course.functionalities.some(
					(name) =>
						name.toLocaleLowerCase() === filterByCategory.toLocaleLowerCase()
				)
			} else {
				return courses
			}
		})
		setFilteredResult(filtered)
	}, [filterByCategory, searchInput])
	return (
		<article className="space-y-5">
			<h1 className="font-semibold">
				Encuentra el aprendizaje que estás buscando
			</h1>
			<section>
				<div className="flex flex-col gap-3 sm:flex-row">
					<div className="flex w-full items-center rounded-lg bg-white">
						<Search color="#555" className="mx-3" size={18} />
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Buscar cursos y lecciones"
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
			<section className="flex flex-col gap-4">
				{filteredResult.map((course) => (
					<CourseHorizontalCard
						key={course.id}
						course={course}
						setProductSelected={setCourseSelected}
					/>
				))}
				{courseSelected && (
					<CourseModal
						setCourseSelected={setCourseSelected}
						course={courseSelected}
					/>
				)}
			</section>
		</article>
	)
}
