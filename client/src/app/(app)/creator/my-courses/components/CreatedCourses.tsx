import CourseCard from '@/app/(app)/components/CourseCard'
import { Course } from '@/models/course.model'

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
	contentType: 'PAID',
	courseType: 'COURSE',
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
	creator: '242424',
	// creator: {
	// 	id: 'creator-002',
	// 	name: 'Ana López',
	// 	bio: 'Experta en AppSheet y ventas.',
	// 	profilePicture: '/img/profile_test.jpeg'
	// },
	price: 0
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
	contentType: 'FREE',
	courseType: 'LESSON',
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
	creator: '313131',
	price: 0
}

const createdCourses: Course[] = [mockCourse, mockLessonCourse]

export default function CreatedCourses() {
	return (
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
	)
}
