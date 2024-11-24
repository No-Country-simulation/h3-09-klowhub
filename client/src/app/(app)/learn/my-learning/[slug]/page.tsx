'use client'
import { Course } from '@/models/course.model'

import CourseContentViewer from './components/CourseContentViewer'

// TODO: Quitar data mockeada
// Curso tipo "curso"
const course: Course = {
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
					contentLink:
						'https://videos.pexels.com/video-files/8430970/8430970-uhd_2732_1440_25fps.mp4',
					additionalResources: ['https://example.com/setup-guide.pdf'],
					image: 'https://picsum.photos/500/500'
				},
				{
					title: 'Exploración de funciones básicas',
					description: 'Descubre las principales funcionalidades de AppSheet.',
					contentLink:
						'https://videos.pexels.com/video-files/6201664/6201664-uhd_2560_1440_24fps.mp4',
					image: 'https://picsum.photos/500/500'
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
					contentLink:
						'https://videos.pexels.com/video-files/4370609/4370609-uhd_2560_1440_25fps.mp4',
					additionalResources: ['https://example.com/bots-guide.pdf'],
					image: 'https://picsum.photos/500/500'
				}
			]
		}
	]
}

export default function MyCoursePage() {
	return (
		<>
			<CourseContentViewer course={course} />
		</>
	)
}
