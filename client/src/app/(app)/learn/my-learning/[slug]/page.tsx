'use client'
import { courseAdapter } from '@/adapters/read-course.adapter'
import { Course } from '@/models/course.model'
import { ReadOneCourseResponse } from '@/models/read-courses-response.model'
import { getCourseById } from '@/services/courses.service'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CourseContentViewer from './components/CourseContentViewer'
import CourseDetails from './components/CourseDetails'
import OtherCourses from './components/OtherCourses'

// TODO: Quitar data mockeada
// Curso tipo "curso"
// const course: Course = {
// 	id: 'course-001',
// 	title: 'Automatización de Procesos con AppSheet',
// 	shortDescription:
// 		'Aprende a automatizar tareas repetitivas utilizando AppSheet.',
// 	platform: 'APPSHEET',
// 	language: 'Español',
// 	sector: 'Ventas y CRM',
// 	toolsAndPlatforms: ['AppSheet', 'Google Sheets'],
// 	functionalities: ['APIs', 'Automatización', 'Formularios dinámicos'],
// 	relatedTags: ['Automatización', 'No Code', 'AppSheet'],
// 	image: 'https://picsum.photos/500/200',
// 	reviews: [
// 		{
// 			reviewer: 'Juan Pérez',
// 			score: 5,
// 			text: 'Un curso excelente y muy práctico.'
// 		},
// 		{
// 			reviewer: 'Ana López',
// 			score: 4,
// 			text: 'Muy útil, pero faltó algo de detalle en algunos temas.'
// 		}
// 	],
// 	contentType: 'PAID',
// 	courseType: 'COURSE',
// 	level: 'intermediate',
// 	contentPillar: 'Automatización',
// 	learningOutcomes: [
// 		'Crear aplicaciones básicas con AppSheet',
// 		'Configurar automatizaciones para tareas recurrentes',
// 		'Integrar AppSheet con otras herramientas'
// 	],
// 	prerequisites: ['Conocimientos básicos de hojas de cálculo'],
// 	detailedDescription:
// 		'Este curso te llevará desde los conceptos básicos hasta el desarrollo de aplicaciones funcionales con AppSheet.',
// 	modules: [
// 		{
// 			title: 'Introducción a AppSheet',
// 			description: 'Familiarízate con la plataforma y sus capacidades.',
// 			lessons: [
// 				{
// 					title: '¿Qué es AppSheet?',
// 					description:
// 						'Explora qué es AppSheet, cómo funciona y por qué es una herramienta ideal para crear aplicaciones sin necesidad de programar.',
// 					contentLink:
// 						'https://videos.pexels.com/video-files/8430970/8430970-uhd_2732_1440_25fps.mp4',
// 					additionalResources: ['https://example.com/setup-guide.pdf'],
// 					image: 'https://picsum.photos/500/500'
// 				},
// 				{
// 					title: 'Cómo registrarse y configurar tu cuenta',
// 					description:
// 						'Aprende a registrarte en AppSheet, configurar tu cuenta y acceder al entorno de desarrollo.',
// 					contentLink:
// 						'https://videos.pexels.com/video-files/6201664/6201664-uhd_2560_1440_24fps.mp4',
// 					image: 'https://picsum.photos/500/500'
// 				},
// 				{
// 					title: 'Conceptos clave de AppSheet',
// 					description:
// 						'Conoce los conceptos fundamentales como tablas, datos, vistas y workflows para comenzar a usar AppSheet de manera efectiva.',
// 					contentLink:
// 						'https://videos.pexels.com/video-files/8430970/8430970-uhd_2732_1440_25fps.mp4',
// 					additionalResources: ['https://example.com/setup-guide.pdf'],
// 					image: 'https://picsum.photos/500/500'
// 				},
// 				{
// 					title: 'Creación de tu primera aplicación',
// 					description:
// 						'Paso a paso para construir tu primera aplicación simple con AppSheet y personalizar sus vistas básicas.',
// 					contentLink:
// 						'https://videos.pexels.com/video-files/6201664/6201664-uhd_2560_1440_24fps.mp4',
// 					image: 'https://picsum.photos/500/500'
// 				},
// 				{
// 					title: 'Navegación por la interfaz de AppSheet',
// 					description:
// 						'Familiarízate con la interfaz de AppSheet, identificando las herramientas y opciones más importantes para desarrollar aplicaciones.',
// 					contentLink:
// 						'https://videos.pexels.com/video-files/8430970/8430970-uhd_2732_1440_25fps.mp4',
// 					additionalResources: ['https://example.com/setup-guide.pdf'],
// 					image: 'https://picsum.photos/500/500'
// 				},
// 				{
// 					title: 'Conexión de datos desde Google Sheets',
// 					description:
// 						'Aprende a conectar AppSheet con una hoja de cálculo de Google Sheets para utilizar datos en tu aplicación.',
// 					contentLink:
// 						'https://videos.pexels.com/video-files/6201664/6201664-uhd_2560_1440_24fps.mp4',
// 					image: 'https://picsum.photos/500/500'
// 				}
// 			]
// 		},
// 		{
// 			title: 'Automatización con AppSheet',
// 			description: 'Aprende a configurar automatizaciones y flujos de trabajo.',
// 			lessons: [
// 				{
// 					title: 'Uso de bots y acciones',
// 					description: 'Configura automatizaciones efectivas.',
// 					contentLink:
// 						'https://videos.pexels.com/video-files/4370609/4370609-uhd_2560_1440_25fps.mp4',
// 					additionalResources: ['https://example.com/bots-guide.pdf'],
// 					image: 'https://picsum.photos/500/500'
// 				}
// 			]
// 		}
// 	],
// 	creator: '4444',
// 	price: 0
// }

export default function MyCoursePage() {
	const [course, setCourse] = useState<Course>()
	const { slug } = useParams<{ slug: string }>()

	useEffect(() => {
		void (async () => {
			try {
				const data: ReadOneCourseResponse = await getCourseById(slug)
				if (data) {
					const adaptedReceivedCourse = courseAdapter(data)
					setCourse(adaptedReceivedCourse)
				}
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])

	if (!course) return <div>Loading...</div>

	return (
		<div className="flex flex-col gap-14">
			<CourseContentViewer course={course} />
			<div className="flex gap-14">
				<CourseDetails course={course} />
				<OtherCourses />
			</div>
		</div>
	)
}
