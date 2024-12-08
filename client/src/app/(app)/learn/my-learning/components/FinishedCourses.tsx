import { Course } from '@/models/course.model'
import MyCourseCard from '../../../components/CourseCard'

export default function FinishedCourses() {
	// TODO: Quitar data mockeada
	// Curso tipo "curso" 1
	const course1: Course = {
		id: 'course-002',
		title: 'Construcción de Aplicaciones Empresariales con PowerApps',
		shortDescription:
			'Aprende a desarrollar aplicaciones empresariales desde cero con PowerApps.',
		platform: 'powerapps',
		language: 'Español',
		sector: 'Gestión Empresarial',
		toolsAndPlatforms: ['PowerApps', 'Microsoft Teams'],
		functionalities: ['Automatización', 'Integraciones'],
		relatedTags: ['PowerApps', 'Low Code', 'Aplicaciones Empresariales'],
		image: 'https://picsum.photos/500/200',
		reviews: [
			{
				reviewer: 'María Sánchez',
				score: 5,
				text: 'Perfecto para principiantes, muy bien explicado.'
			},
			{
				reviewer: 'Luis Torres',
				score: 4.5,
				text: 'Cubrió todas mis expectativas, muy recomendable.'
			}
		],
		contentType: 'PAID',
		courseType: 'COURSE',
		level: 'intermediate',
		contentPillar: 'Automatización',
		learningOutcomes: [
			'Crear aplicaciones empresariales básicas',
			'Configurar conectores e integraciones con PowerApps',
			'Optimizar procesos utilizando PowerApps y Power Automate'
		],
		prerequisites: ['Conocimientos básicos de Excel y Teams'],
		detailedDescription:
			'Este curso está diseñado para ayudarte a construir aplicaciones empresariales que transformen tu negocio.',
		modules: [
			{
				title: 'Introducción a PowerApps',
				description: 'Descubre las capacidades y beneficios de PowerApps.',
				lessons: [
					{
						title: 'Instalación y configuración',
						description: 'Cómo preparar tu entorno de PowerApps.',
						contentLink: 'https://example.com/powerapps-lesson-1',
						additionalResources: ['https://example.com/install-guide.pdf'],
						image: 'https://picsum.photos/500/200'
					},
					{
						title: 'Diseño de interfaces',
						description: 'Aprende a diseñar interfaces intuitivas y efectivas.',
						contentLink: 'https://example.com/powerapps-lesson-2',
						image: 'https://picsum.photos/500/200'
					}
				]
			},
			{
				title: 'Automatización con Power Automate',
				description:
					'Configura flujos de trabajo efectivos con Power Automate.',
				lessons: [
					{
						title: 'Creación de flujos básicos',
						description: 'Aprende a crear tus primeros flujos de trabajo.',
						contentLink: 'https://example.com/powerapps-lesson-3',
						image: 'https://picsum.photos/500/200'
					}
				]
			}
		],
		creator: {
			id: 'creator-002',
			name: 'Ana Gómez',
			bio: 'Experta en PowerApps y desarrollo de aplicaciones empresariales.',
			profilePicture: '/img/profile_test.jpeg'
		},
		price: 0
	}

	// Curso tipo "curso" 2
	const course2: Course = {
		id: 'course-003',
		title: 'Optimización de Ventas con AppSheet',
		shortDescription:
			'Mejora tus procesos de ventas usando aplicaciones personalizadas en AppSheet.',
		platform: 'appsheet',
		language: 'Inglés',
		sector: 'Ventas y CRM',
		toolsAndPlatforms: ['AppSheet', 'Google Drive'],
		functionalities: ['Automatización', 'Formularios dinámicos'],
		relatedTags: ['AppSheet', 'No Code', 'Ventas'],
		image: 'https://picsum.photos/500/200',
		reviews: [
			{
				reviewer: 'Diego Martínez',
				score: 5,
				text: 'Muy práctico y fácil de entender.'
			},
			{
				reviewer: 'Carolina Vega',
				score: 4,
				text: 'Me ayudó mucho, aunque algunas partes fueron rápidas.'
			}
		],
		contentType: 'PAID',
		courseType: 'COURSE',
		level: 'advanced',
		contentPillar: 'Automatización',
		learningOutcomes: [
			'Crear aplicaciones que optimicen tus procesos de ventas',
			'Automatizar tareas comunes en la gestión de clientes',
			'Diseñar reportes dinámicos y personalizados'
		],
		prerequisites: ['Conocimientos básicos de hojas de cálculo'],
		detailedDescription:
			'Este curso te enseña a usar AppSheet para transformar tus procesos de ventas.',
		modules: [
			{
				title: 'Configuración inicial',
				description:
					'Prepara tu entorno y recursos para trabajar con AppSheet.',
				lessons: [
					{
						title: 'Creación de tu primera aplicación',
						description: 'Aprende a configurar los elementos básicos.',
						contentLink: 'https://example.com/appsheet-lesson-1',
						additionalResources: ['https://example.com/setup-guide.pdf'],
						image: 'https://picsum.photos/500/200'
					}
				]
			},
			{
				title: 'Automatización avanzada',
				description: 'Explora las funcionalidades avanzadas de AppSheet.',
				lessons: [
					{
						title: 'Integración con APIs',
						description: 'Cómo conectar AppSheet con otras herramientas.',
						contentLink: 'https://example.com/appsheet-lesson-2',
						image: 'https://picsum.photos/500/200'
					}
				]
			}
		],
		creator: {
			id: 'creator-003',
			name: 'Carlos Rodríguez',
			bio: 'Experto en AppSheet y ventas.',
			profilePicture: '/img/profile_test.jpeg'
		},
		price: 0
	}

	// Curso tipo "lección"
	const lessonCourse: Course = {
		id: 'lesson-002',
		title: 'Creación de Flujos con Power Automate',
		shortDescription:
			'Domina la creación de flujos básicos con Power Automate.',
		platform: 'powerapps',
		language: 'Español',
		sector: 'Gestión Empresarial',
		toolsAndPlatforms: ['Power Automate', 'Microsoft Excel'],
		functionalities: ['Automatización', 'Integraciones'],
		relatedTags: ['Power Automate', 'Low Code', 'Automatización'],
		image: 'https://picsum.photos/500/200',
		reviews: [
			{
				reviewer: 'Jorge Ramírez',
				score: 4.5,
				text: 'Excelente contenido y muy claro.'
			},
			{
				reviewer: 'Mónica Rojas',
				score: 4,
				text: 'Me hubiera gustado más detalle en las configuraciones.'
			}
		],
		contentType: 'FREE',
		courseType: 'LESSON',
		level: 'basic',
		contentPillar: 'Automatización',
		learningOutcomes: [
			'Configurar flujos básicos en Power Automate',
			'Conectar herramientas como Excel y Teams'
		],
		prerequisites: ['Conocimientos básicos de Office 365'],
		detailedDescription:
			'Esta lección te guiará paso a paso en la creación de tus primeros flujos.',
		contentLink: 'https://example.com/flow-creation-lesson',
		additionalResources: ['https://example.com/flows-cheatsheet.pdf'],
		creator: {
			id: 'creator-004',
			name: 'Jorge Ramírez',
			bio: 'Experto en automatización y Power Automate.',
			profilePicture: '/img/profile_test.jpeg'
		},
		price: 0
	}

	const finishedCourses: Course[] = [course1, course2, lessonCourse]

	return (
		<section className="flex flex-col gap-12">
			<h4 className="text-base font-bold">Cursos terminados</h4>
			<div className="flex gap-6 overflow-scroll">
				{finishedCourses.map((course) => {
					return (
						<MyCourseCard
							key={course.id}
							course={course}
							linkButtonProps={{
								text: 'Ver detalles',
								href: `/learn/my-learning/${course.id}`
							}}
						/>
					)
				})}
			</div>
		</section>
	)
}
