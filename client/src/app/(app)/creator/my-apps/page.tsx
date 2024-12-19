'use client'
import Button from '@/components/buttons/Button'
import Link from 'next/link'
import React, { useState } from 'react'
import LatestSales from '../my-courses/components/LatestSales'
import ApplicationCard from '@/components/cards/ApplicationCard'
import { App } from '@/models/app.model'
import { platforms } from '@/constants/filters.constant'

const mockApps: App[] = [
	{
		id: 'app-1',
		title: 'FinTracker Pro',
		shortDescription: 'Una app avanzada para el seguimiento de tus finanzas personales y empresariales',
		price: 9.99,
		platform: platforms.APPSHEET,
		language: 'Español',
		sector: 'Finanzas',
		toolsAndPlatforms: ['React', 'Node.js', 'MongoDB'],
		functionalities: ['Gestión de presupuestos', 'Reportes mensuales', 'Notificaciones automáticas'],
		relatedTags: ['finanzas', 'productividad', 'gestión'],
		image: '/img/profile_test.jpeg',
		reviews: [
			{ reviewer: 'Juan Pérez', score: 4.5, text: 'Muy útil para llevar mis gastos bajo control.' },
			{ reviewer: 'Ana López', score: 5, text: 'Interfaz intuitiva y fácil de usar.' }
		],
		targetAudience: 'Freelancers, pequeñas empresas y familias',
		benefits: ['Control total de tus finanzas', 'Informes detallados', 'Mejora tus hábitos de ahorro'],
		additionalMedia: ['/images/fintracker_dashboard.png', '/videos/fintracker_demo.mp4'],
		detailedDescription: 'FinTracker Pro te permite gestionar tus finanzas de manera eficiente con una variedad de herramientas, desde presupuestos hasta reportes avanzados.',
		links: {
			mobile: 'https://fintrackerpro.com/mobile',
			desktop: 'https://fintrackerpro.com/desktop'
		}
	},
	{
		id: 'app-2',
		title: 'FitJourney',
		shortDescription: 'Tu compañero personal para un estilo de vida saludable y activo',
		price: 14.99,
		platform: platforms.POWERAPPS,
		language: 'Inglés',
		sector: 'Salud y Fitness',
		toolsAndPlatforms: ['Flutter', 'Firebase', 'GraphQL'],
		functionalities: ['Planes de entrenamiento', 'Registro de progresos', 'Rutinas personalizadas'],
		relatedTags: ['fitness', 'salud', 'entrenamiento'],
		image: '/img/profile_test.jpeg',
		reviews: [
			{ reviewer: 'Emily Smith', score: 4.8, text: 'Excelente para mantenerme activa y motivada.' },
			{ reviewer: 'Carlos Reyes', score: 4.7, text: 'Las rutinas personalizadas son geniales.' }
		],
		targetAudience: 'Personas activas y entusiastas del fitness',
		benefits: ['Logra tus metas de fitness', 'Planes adaptables a tu tiempo y condición física', 'Seguimiento constante'],
		additionalMedia: ['/images/fitjourney_plan.png', '/videos/fitjourney_workout.mp4'],
		detailedDescription: 'FitJourney ofrece rutinas de entrenamiento personalizadas y te permite registrar tu progreso para lograr un estilo de vida activo.',
		links: {
			mobile: 'https://fitjourney.com/app',
			desktop: ''
		}
	},
	{
		id: 'app-3',
		title: 'CodeMentor',
		shortDescription: 'Plataforma educativa para desarrolladores en busca de mentores',
		price: 20,
		platform: platforms.APPSHEET,
		language: 'Español e Inglés',
		sector: 'Educación',
		toolsAndPlatforms: ['Next.js', 'Prisma', 'PostgreSQL'],
		functionalities: ['Planes de entrenamiento', 'Registro de progresos', 'Rutinas personalizadas'],
		relatedTags: ['educación', 'programación', 'mentoría'],
		image: '/img/profile_test.jpeg',
		reviews: [
			{ reviewer: 'Sofía García', score: 5, text: 'Excelente plataforma para mejorar mis habilidades.' },
			{ reviewer: 'Michael Johnson', score: 4.8, text: 'Encontré mentores de gran calidad.' }
		],
		targetAudience: 'Desarrolladores junior y estudiantes de programación',
		benefits: ['Aprendizaje personalizado', 'Acceso a mentores expertos', 'Amplía tus oportunidades profesionales'],
		additionalMedia: ['/images/codementor_session.png'],
		detailedDescription: 'CodeMentor conecta desarrolladores con mentores expertos para acelerar su aprendizaje y progreso profesional.',
		links: {
			mobile: '',
			desktop: 'https://codementor.com/desktop'
		}
	},
	{
		id: 'app-4',
		title: 'EcoMarket Hub',
		shortDescription: 'Plataforma para comprar y vender productos ecológicos',
		price: 4.99,
		platform: platforms.POWERAPPS,
		language: 'Español',
		sector: 'E-commerce',
		toolsAndPlatforms: ['Vue.js', 'Laravel', 'MySQL'],
		functionalities: ['Marketplace ecológico', 'Búsqueda avanzada', 'Carrito de compras'],
		relatedTags: ['ecommerce', 'ecología', 'sostenibilidad'],
		image: '/img/profile_test.jpeg',
		reviews: [
			{ reviewer: 'Laura Martínez', score: 4.6, text: 'Muy buena opción para encontrar productos ecológicos.' },
			{ reviewer: 'David Gómez', score: 4.9, text: 'Fácil de usar y con una buena variedad de productos.' }
		],
		targetAudience: 'Consumidores comprometidos con el medio ambiente',
		benefits: ['Promueve productos sostenibles', 'Encuentra productos únicos', 'Compra de manera consciente'],
		additionalMedia: ['/images/ecomarkethub_products.png', '/videos/ecomarket_demo.mp4'],
		detailedDescription: 'EcoMarket Hub es una plataforma dedicada a la compra y venta de productos ecológicos y sostenibles.',
		links: {
			mobile: 'https://ecomarkethub.com/app',
			desktop: 'https://ecomarkethub.com'
		}
	}
]

export default function MyAppsPage() {
	const [appSelected, setAppSelected] = useState<App | null>(null)

	return (
		<div className='flex flex-col gap-12'>
			<h4 className='mb-12 font-bold'>Mis aplicaciones</h4>

			<div className="flex items-center justify-between">
				<h6 className="font-bold">Últimas ventas</h6>
				<Link href={'create-app'}>
					<Button>Crear aplicacion</Button>
				</Link>
			</div>

			<div className="flex w-full flex-col gap-12 rounded-lg bg-card p-6">
				<LatestSales />
			</div>

			<h4 className='font-bold'>Aplicaciones publicadas</h4>
			<div className='flex flex-wrap gap-12'>
				{mockApps.map((app, index) => {
					return (
						<ApplicationCard key={index} app={app} setProductSelected={setAppSelected} isCreator />
					)
				})
				}
			</div>
		</div>
	)
}

