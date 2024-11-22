import { Course } from '@/models/course.model'

export default function MyLearningPage() {
	// TODO: Quitar data mockeada
	const myCourses: Course[] = [
		{
			id: 'course-001',
			title: 'Automatización de Procesos con AppSheet',
			shortDescription:
				'Aprende a crear flujos de trabajo automatizados sin escribir una sola línea de código.',
			platform: 'AppSheet',
			language: 'Español',
			sector: 'Gestión de Proyectos',
			toolsAndPlatforms: ['AppSheet', 'Google Sheets'],
			functionalities: ['Automatización', 'Integraciones', 'Notificaciones'],
			relatedTags: [
				'No Code',
				'Flujos de Trabajo',
				'Automatización',
				'AppSheet'
			],
			image: '/images/courses/automation-appsheet.jpg',
			contentType: 'Paid',
			courseType: 'Course',
			level: 'Intermediate',
			contentPillar: 'Automatización de Procesos',
			learningOutcomes: [
				'Configurar flujos automatizados utilizando AppSheet.',
				'Integrar AppSheet con herramientas como Google Sheets y Gmail.',
				'Optimizar procesos internos mediante aplicaciones personalizadas.'
			],
			prerequisites: [
				'Conocimientos básicos de AppSheet.',
				'Tener una cuenta activa de Google Workspace.'
			],
			detailedDescription:
				'Este curso está diseñado para usuarios que desean optimizar sus flujos de trabajo utilizando AppSheet. Desde la creación de aplicaciones básicas hasta la integración con otras plataformas, aprenderás a maximizar el potencial de esta herramienta No Code.',
			modules: [
				{
					title: 'Introducción a AppSheet',
					description: 'Conceptos básicos de AppSheet y su interfaz.',
					lessons: [
						{
							title: 'Configuración inicial de AppSheet',
							description:
								'Aprende a configurar tu primera aplicación con AppSheet conectándola a Google Sheets.',
							contentLink: 'https://www.appsheet.com/start',
							additionalResources: [
								'/resources/pdf/intro-to-appsheet.pdf',
								'/resources/videos/configuracion-inicial.mp4'
							]
						}
					]
				},
				{
					title: 'Automatización Avanzada',
					description:
						'Automatiza flujos de trabajo mediante reglas y eventos.',
					lessons: [
						{
							title: 'Creación de flujos automatizados',
							description:
								'Crea flujos automatizados que envíen notificaciones y actualicen datos automáticamente.',
							contentLink: 'https://www.appsheet.com/automation',
							additionalResources: ['/resources/pdf/advanced-automation.pdf']
						}
					]
				}
			]
		},
		{
			id: 'lesson-101',
			title: 'Introducción a la Automatización con AppSheet',
			shortDescription:
				'Aprende los fundamentos para configurar flujos de trabajo automatizados utilizando AppSheet.',
			platform: 'AppSheet',
			language: 'Español',
			sector: 'Automatización y Gestión de Proyectos',
			toolsAndPlatforms: ['AppSheet', 'Google Sheets'],
			functionalities: ['Automatización', 'Integraciones'],
			relatedTags: ['No Code', 'AppSheet', 'Automatización'],
			image: '/images/lessons/intro-to-appsheet.jpg',
			contentType: 'Free',
			courseType: 'Lesson',
			level: 'Basic',
			contentPillar: 'Automatización de Procesos',
			learningOutcomes: [
				'Comprender los conceptos básicos de AppSheet.',
				'Configurar flujos de trabajo básicos utilizando Google Sheets.',
				'Optimizar tareas simples con automatización.'
			],
			prerequisites: [
				'Conocimientos básicos de Google Sheets.',
				'Acceso a AppSheet con una cuenta de Google.'
			],
			detailedDescription:
				'Esta lección te guiará a través de los pasos iniciales para conectar AppSheet con Google Sheets y configurar flujos básicos de automatización. Ideal para principiantes en herramientas No Code.',
			contentLink: 'https://www.appsheet.com/start',
			additionalResources: [
				'/resources/pdf/connect-google-sheets.pdf',
				'/resources/videos/connect-google-sheets.mp4'
			]
		}
	]

	return (
		<>
			<h4>Mis cursos</h4>
		</>
	)
}
