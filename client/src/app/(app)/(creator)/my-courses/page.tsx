'use client'
import Button from '@/components/buttons/Button'
import { Course } from '@/models/course.model'
import { ArcElement, Chart } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import CourseCard from '../../components/CourseCard'
import LatestSalesTable, { CourseSale } from './components/LatestSalesTable'
Chart.register(ArcElement)

// TODO: Borrar data mockeada
const salesMock: CourseSale[] = [
	{
		id: '1',
		buyer: {
			name: 'Juan Pérez',
			image: '/img/profile_test.jpeg'
		},
		amount: 100,
		date: new Date(),
		state: 'finished'
	},
	{
		id: '2',
		buyer: {
			name: 'María González',
			image: '/img/profile_test.jpeg'
		},
		amount: 200,
		date: new Date(),
		state: 'finished'
	},
	{
		id: '3',
		buyer: {
			name: 'Carlos Rodríguez',
			image: '/img/profile_test.jpeg'
		},
		amount: 300,
		date: new Date(),
		state: 'pending'
	},
	{
		id: '4',
		buyer: {
			name: 'Ana López',
			image: '/img/profile_test.jpeg'
		},
		amount: 400,
		date: new Date(),
		state: 'finished'
	},
	{
		id: '5',
		buyer: {
			name: 'Pedro Martínez',
			image: '/img/profile_test.jpeg'
		},
		amount: 500,
		date: new Date(),
		state: 'pending'
	}
]

// TODO: Quitar data mockeada
// Curso tipo "curso"
const mockCourse: Course = {
	id: 'course-001',
	title: 'Automatización de Procesos con AppSheet',
	shortDescription:
		'Aprende a automatizar tareas repetitivas utilizando AppSheet.',
	platform: 'appsheet',
	language: 'Español',
	sector: 'Ventas y CRM',
	toolsAndPlatforms: ['AppSheet', 'Google Sheets'],
	functionalities: ['APIs', 'Automatización', 'Formularios dinámicos'],
	relatedTags: ['Automatización', 'No Code', 'AppSheet'],
	image: 'https://picsum.photos/500/200',
	reviews: [
		{
			reviewer: 'Juan Pérez',
			score: 5,
			text: 'Un curso excelente y muy práctico.'
		},
		{
			reviewer: 'Ana López',
			score: 4,
			text: 'Muy útil, pero faltó algo de detalle en algunos temas.'
		}
	],
	contentType: 'paid',
	courseType: 'course',
	level: 'intermediate',
	contentPillar: 'Automatización',
	learningOutcomes: [
		'Crear aplicaciones básicas con AppSheet',
		'Configurar automatizaciones para tareas recurrentes',
		'Integrar AppSheet con otras herramientas'
	],
	prerequisites: ['Conocimientos básicos de hojas de cálculo'],
	detailedDescription:
		'Este curso te llevará desde los conceptos básicos hasta el desarrollo de aplicaciones funcionales con AppSheet.',
	modules: [
		{
			title: 'Introducción a AppSheet',
			description: 'Familiarízate con la plataforma y sus capacidades.',
			lessons: [
				{
					title: 'Configuración inicial',
					description: 'Cómo crear tu primera aplicación en AppSheet.',
					contentLink: 'https://example.com/lesson-1',
					additionalResources: ['https://example.com/setup-guide.pdf'],
					image: 'https://picsum.photos/500/200'
				},
				{
					title: 'Exploración de funciones básicas',
					description: 'Descubre las principales funcionalidades de AppSheet.',
					contentLink: 'https://example.com/lesson-2',
					image: 'https://picsum.photos/500/200'
				}
			]
		},
		{
			title: 'Automatización con AppSheet',
			description: 'Aprende a configurar automatizaciones y flujos de trabajo.',
			lessons: [
				{
					title: 'Uso de bots y acciones',
					description: 'Configura automatizaciones efectivas.',
					contentLink: 'https://example.com/lesson-3',
					additionalResources: ['https://example.com/bots-guide.pdf'],
					image: 'https://picsum.photos/500/200'
				}
			]
		}
	],
	creator: {
		id: 'creator-002',
		name: 'Ana López',
		bio: 'Experta en AppSheet y ventas.',
		profilePicture: '/img/profile_test.jpeg'
	}
}

// Curso tipo "lección"
const mockLessonCourse: Course = {
	id: 'lesson-001',
	title: 'Integraciones con PowerApps',
	shortDescription:
		'Descubre cómo integrar PowerApps con otras herramientas de Microsoft.',
	platform: 'powerapps',
	language: 'Inglés',
	sector: 'Finanzas y Contabilidad',
	toolsAndPlatforms: ['PowerApps', 'Microsoft Excel'],
	functionalities: ['Integraciones', 'APIs'],
	relatedTags: ['PowerApps', 'Integraciones', 'Low Code'],
	image: 'https://picsum.photos/500/200',
	reviews: [
		{
			reviewer: 'Carlos Herrera',
			score: 4.5,
			text: 'Información muy clara y útil.'
		},
		{
			reviewer: 'Laura Gómez',
			score: 5,
			text: 'Me ayudó a entender mejor las integraciones con PowerApps.'
		}
	],
	contentType: 'free',
	courseType: 'lesson',
	level: 'basic',
	contentPillar: 'Integraciones',
	learningOutcomes: [
		'Configurar integraciones entre PowerApps y Excel',
		'Crear flujos de trabajo básicos usando Power Automate'
	],
	prerequisites: ['Conocimientos básicos de Excel'],
	detailedDescription:
		'Esta lección te enseña cómo conectar PowerApps con otras herramientas para optimizar tus procesos.',
	contentLink: 'https://example.com/integrations-lesson',
	additionalResources: ['https://example.com/integrations-cheatsheet.pdf'],
	creator: {
		id: 'creator-001',
		name: 'María Rodríguez',
		bio: 'Experta en integraciones y desarrollo de aplicaciones empresariales.',
		profilePicture: '/img/profile_test.jpeg'
	}
}

const createdCourses: Course[] = [mockCourse, mockLessonCourse]

const data = {
	labels: ['Red', 'Blue'],
	datasets: [
		{
			label: '# of Votes',
			data: [12, 19],
			backgroundColor: ['#9D32BC', '#DFD1F3'],
			borderWidth: 0,
			spacing: 8,
			cutout: '80%'
		}
	]
}

export default function MyCoursesPage() {
	return (
		<>
			<h4 className="mb-12 font-bold">Mis cursos</h4>

			<div className="mb-6 flex items-center justify-between">
				<h6 className="font-bold">Últimas ventas</h6>
				<Button>Crear curso</Button>
			</div>

			<div className="flex w-full flex-col gap-12 rounded-lg bg-card p-6">
				<section className="flex w-full justify-between gap-6">
					<div className="grow">
						<LatestSalesTable sales={salesMock} />
					</div>

					<div className="relative my-2 flex w-1/4 max-w-fit items-center rounded-lg bg-white/10 p-6">
						<div className="w-full">
							<Doughnut data={data} />
						</div>
						<div className="absolute left-0 flex w-full flex-col gap-3 text-center">
							<p className="text-xs font-medium">Balance de cursos</p>
							<p className="text-xl font-bold">$173,6573</p>
						</div>
					</div>
				</section>

				<section>
					<h6 className="mb-6 font-bold">Cursos creados</h6>
					<div className="-m-6 flex gap-6 overflow-y-visible overflow-x-scroll p-6">
						{createdCourses.map((course, index) => (
							<CourseCard
								key={index}
								course={course}
								linkButtonProps={{
									href: `/my-courses/edit/${course.id}`,
									text: 'Editar curso'
								}}
							/>
						))}
					</div>
				</section>
			</div>
		</>
	)
}
