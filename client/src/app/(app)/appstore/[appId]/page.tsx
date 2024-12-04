'use client'
import { Review } from '@/models/product.model'
import { App } from '@/models/app.model'
import Reviews from '@/app/(app)/learn/courses/[courseId]/components/Reviews'
import { useParams } from 'next/navigation'
import RatingStars from '@/components/RatingStars'
import Image from 'next/image'
import Button from '@/components/buttons/Button'
import Share from '@/app/(app)/learn/courses/[courseId]/components/Share'
import ProTag from '@/components/buyerTags/ProTag'
import { GraduationCap, MessageSquare, Star, ShoppingCart } from 'lucide-react'
import TechnologyTag, { Technology } from '@/components/buyerTags/TechnologyTag'
import CheckedList from './components/CheckedList'
import MobileImg from '../../../../../public/img/mobile-app.png'
import { useState } from 'react'
import DeskImageModal from './components/DeskImageModal'
import InfoFuncApp from './components/InfoFuncApp'
import ApplicationCard from '@/components/cards/ApplicationCard'


const app: App = {
	id: '1',
	title: 'Control de Inventario para retail',
	shortDescription: 'App diseñada para gestionar y monitorear el stock en tiendas físicas.',
	price: 80000,
	platform: 'appsheet',
	language: 'Español',
	sector: 'Logistica',
	toolsAndPlatforms: ['AppSheet'],
	functionalities: ['Logistica', 'Retail', 'Inventarios'],
	relatedTags: ['Optimizacion', 'Flexibilidad', 'Mantenimiento'],
	image: 'https://picsum.photos/200/100',
	targetAudience: 'Comercios',
	benefits: ['Orden', 'Escalabilidad', 'Practicidad'],
	additionalMedia: ['https://example.com/advanced1', 'https://example.com/advanced1'],
	detailedDescription: 'Con nuestra plataforma de gestión de proyectos, podrás coordinar equipos, establecer plazos y hacer seguimiento de cada tarea en un solo lugar. Visualiza el avance en tiempo real, asigna prioridades y asegúrate de que todos estén alineados con los objetivos.',
	links: {
		mobile: '/',
		desktop: '/'
	},
	reviews: [
		{
			score: 5,
			text: 'Esta app superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió organizar mi negocio en tiempo récord.',
			reviewer: 'Mariana Lopez',
		},
		{
			score: 5,
			text: 'Nunca pensé que podría organizar mi negocio tan rapido Gracias a Sebastián, ahora puedo automatizar varias tareas en mi trabajo. ¡Muy recomendado!',
			reviewer: 'Marta Torres',
		},
		{
			score: 4,
			text: 'El enfoque práctico de Sebastián es perfecto para organizar un negocio. Su experiencia se nota en parte de la app y las herramientas que proporciona son súper útiles.',
			reviewer: 'Rodrigo Baez',
		},
		{
			score: 4,
			text: 'Excelente app para quienes quieren iniciarse en el mundo no-code. Sebastián sabe cómo optimizarprocesos manera efectiva y accesible.',
			reviewer: 'Mario Perez',
		}
	],
}

const reviews: Review[] = [
	{
		score: 5,
		text: 'Esta app superó mis expectativas. Sebastián explica todo de manera clara y sencilla, lo que me permitió organizar mi negocio en tiempo récord.',
		reviewer: 'Mariana Lopez',
	},
	{
		score: 5,
		text: 'Nunca pensé que podría organizar mi negocio tan rapido Gracias a Sebastián, ahora puedo automatizar varias tareas en mi trabajo. ¡Muy recomendado!',
		reviewer: 'Marta Torres',
	},
	{
		score: 4,
		text: 'El enfoque práctico de Sebastián es perfecto para organizar un negocio. Su experiencia se nota en parte de la app y las herramientas que proporciona son súper útiles.',
		reviewer: 'Rodrigo Baez',
	},
	{
		score: 4,
		text: 'Excelente app para quienes quieren iniciarse en el mundo no-code. Sebastián sabe cómo optimizarprocesos manera efectiva y accesible.',
		reviewer: 'Mario Perez',
	}
]

const projectList = [
	'Organiza y asigna tareas de manera intuitiva, facilitando la colaboración y el seguimiento de cada actividad.',
	'Monitorea el progreso de tu equipo y recibe actualizaciones instantáneas para tomar decisiones informadas.',
	'Establece prioridades claras y ajusta los plazos según las necesidades del proyecto',
	'Facilita la comunicación entre los miembros del equipo con espacios compartidos para archivos.',
	'Diseña tu panel de control para ver lo que más te interesa, desde gráficos de progreso hasta plazos críticos.'
]

export default function Page() {
	const [showModal, setShowModal] = useState(false)
	const [appSelected, SetAppSelected] = useState<App | null>(app)

	const param = useParams()
	console.log(param)


	const totalScore = reviews.reduce((acc, review) => acc + review.score, 0)
	const averageScore = Number((totalScore / reviews.length).toFixed(1))

	return (
		<section className="grid grid-rows-2 gap-20 md:grid-cols-5 md:grid-rows-1 md:gap-[8%]">
			<div className="flex flex-col space-y-8 md:col-span-3">
				<b>{app.title}</b>
				<p className="text-sm">{app.detailedDescription}</p>
				<div className="flex gap-10">
					<RatingStars rating={averageScore} totalVotes={reviews.length} />
				</div>
				<picture className="relative aspect-video w-full">
					<Image
						fill
						sizes="500px"
						src={app.image}
						alt="app image"
						className="rounded-lg"
					/>
				</picture>
				<div className="space-y-8 rounded-lg bg-[#1F2937] p-6">
					<div className="flex h-fit gap-2">
						<picture className="relative aspect-square h-fit w-24 overflow-hidden rounded-full">
							<Image src={'/img/user_avatar.png'} fill alt="user image" />
						</picture>
						<div>
							<p className="mb-2 text-sm font-semibold">Sebastián Ríos</p>
							<p className="text-sm">
								Experto en desarrollo de aplicaciones no-code con más de 5 años
								de experiencia en AppSheet y Power Apps, ayudando a empresas y
								emprendedores.
							</p>
						</div>
					</div>
					<div>
						<b>Todo para la gestion de tus proyectos</b>
						<div className='p-4'>
							<CheckedList item={projectList} />
						</div>
					</div>
					<div>
						<b>Acerca de esta app</b>
						<p className="text-sm">{app.detailedDescription}</p>
					</div>
					<Button>COMPRAR APP</Button>
					<Share />
					<div className='space-y-8'>
						<h2 className='font-semibold text-xl'>
							Una aplicación que te ayudará a gestionar mejor tus proyectos
						</h2>
						<p className='text-sm'>¿Quieres optimizar tus procesos y mejorar la productividad de tu pequeña empresa sin invertir una fortuna en desarrollo de software?  Esta aplicación te permitirá  gestionar tus proyectos, clientes, inventario y mucho más. Imagina tener una herramienta a medida que se adapte a las necesidades únicas de tu negocio, sin necesidad de escribir una sola línea de código.Gracias a esta aplicación podrás: automatizar tareas repetitivas, mejorar la colaboración entre equipos, acceder a tus datos en tiempo real y tomar decisiones más informadas. </p>
					</div>
					<InfoFuncApp contentPillar={app.functionalities} functionalities={app.functionalities} sector={app.sector} toolsAndPlatforms={app.toolsAndPlatforms} />
					<Reviews reviews={reviews} />
				</div>
			</div>

			<div className="flex h-full w-full flex-col gap-10 md:col-span-2">
				<div className='flex h-fit flex-col gap-10 rounded-lg p-4 items-center justify-center'>
					<Image src={MobileImg} alt='mobile-app' width={216} height={416} />
					<Button variant='secondary' onClick={() => setShowModal(true)}>Ver en modo escritorio</Button>
					<DeskImageModal setShowModal={setShowModal} show={showModal} />
				</div>
				<div className="flex h-fit flex-col gap-2 rounded-lg bg-white/10 p-4">
					<div className="flex h-fit w-full gap-2 border-b p-3">
						<picture className="relative aspect-square h-fit w-16 overflow-hidden rounded-full">
							<Image
								src={'/img/user_avatar.png'}
								fill
								alt="user image"
								sizes="64px"
							/>
						</picture>
						<div>
							<span className="mb-2 flex items-center gap-3 text-sm font-semibold">
								<p>Sebastián Ríos</p>
								<ProTag />
							</span>
							<p className="text-sm">Instructor y desarrollador</p>
						</div>
					</div>
					<div className="space-y-2 p-3">
						<p className="flex items-center gap-2">
							<Star className="text-primary-a-400" /> Calificación del
							instructor: 4
						</p>
						<p className="flex items-center gap-2">
							<MessageSquare className="text-primary-a-400" />4 {'(54 reseñas)'}
						</p>
						<p className="flex items-center gap-2">
							<GraduationCap className="text-primary-a-400" /> 60 estudiantes
						</p>
						<p className="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								color="primary-a-400"
							>
								<path
									color="#9f74dc"
									d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
								/>
								<path color="#9f74dc" d="m10 15 5-3-5-3z" />
							</svg>{' '}
							77 cursos
						</p>
					</div>
				</div>
				<div className="du flex gap-2 justify-center">
					{app.toolsAndPlatforms.map((technology, i: number) => (
						<TechnologyTag
							technology={technology.toLocaleLowerCase() as Technology}
							key={'technology-' + i}
							size='xl'
						/>
					))}
				</div>
				<div className='bg-white/10 p-6 rounded-lg'>
					<div className='flex items-center justify-center mb-10'>
						<p className='text-lg font-bold'>¿Que recibirás?</p>
					</div>
					<div className='flex flex-col justify-start space-y-6'>
						<p className='text-sm font-bold text-primary-b-300'>La compra incluye</p>
						<p className='text-sm font-bold'>App para gestion de proyectos</p>
						<p>Acceso completo a la aplicación: Descargá y utilizá la app en todos tus dispositivos sin restricciones.</p>
						<p>Actualizaciones gratuitas: Disfrutá de mejoras y nuevas funcionalidades sin costo adicional.</p>
						<p>Soporte técnico dedicado: Asistencia personalizada para resolver cualquier duda o inconveniente que tengas.</p>
						<p>Guías y tutoriales: Materiales de apoyo que te ayudarán a aprovechar al máximo todas las características de la app.</p>
					</div>
				</div>
				<div className="flex flex-col items-center gap-4">
					<Button>COMPRAR APP</Button>
					<Button icon={<ShoppingCart />} variant="secondary">Añadir al carrito</Button>
				</div>
				<div className='flex flex-col items-center space-y-6 mt-10 border-2 border-primary-b-300 rounded-lg p-6'>
					<p className='text-lg font-semibold'>Con la compra de esta app tiene un 50% OFF en la compra del cursos: Gestión de inventarios con AppSheet</p>
					<ApplicationCard app={app} setProductSelected={SetAppSelected} />
				</div>
			</div>
			<div className='w-screen my-10 space-y-10'>
				<div className='space-y-4'>
					<p className='text-base font-bold'>Aplicaciones recomendadas</p>
					<p className='text-sm'>Explorá soluciones listas para usar. Encontrá la app perfecta para tu proyecto y empezá a trabajar de inmediato.</p>
				</div>
				<div className='w-fit flex flex-col lg:flex-row flex-wrap justify-between gap-4 items-center'>
					<ApplicationCard app={app} setProductSelected={SetAppSelected} />
					<ApplicationCard app={app} setProductSelected={SetAppSelected} />
					<ApplicationCard app={app} setProductSelected={SetAppSelected} />
					<ApplicationCard app={app} setProductSelected={SetAppSelected} />
				</div>
			</div>
		</section>
	)
}
