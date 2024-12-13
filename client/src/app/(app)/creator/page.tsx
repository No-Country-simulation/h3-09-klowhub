'use client'
import { Project } from '@/models/project'
import CreatorSectLinkBtns from './components/CreatorSectionsLinkBtns'
import GlobalStatsList from './components/GlobalStatsList'
import HomeBanner from './components/HomeBanner'
import ProjectsTable from './components/ProjectsTable'
import SalesChart from './components/SalesChart'

export default function CreatorHome() {
	const mockProjects: Project[] = [
		{
			id: '1',
			author: {
				id: 'u1',
				name: 'Juan Pérez',
				image: 'https://randomuser.me/api/portraits/men/32.jpg'
			},
			amount: 650,
			type: 'COURSE',
			status: 'pending',
			platform: 'POWERAPPS'
		},
		{
			id: '2',
			author: {
				id: 'u2',
				name: 'Ana Gómez',
				image: 'https://randomuser.me/api/portraits/women/45.jpg'
			},
			amount: 850,
			type: 'LESSON',
			status: 'pending',
			platform: 'APPSHEET'
		},
		{
			id: '3',
			author: {
				id: 'u3',
				name: 'Carlos López',
				image: 'https://randomuser.me/api/portraits/men/77.jpg'
			},
			amount: 1200,
			type: 'app',
			status: 'pending',
			platform: 'APPSHEET'
		},
		{
			id: '4',
			author: {
				id: 'u4',
				name: 'María Fernández',
				image: 'https://randomuser.me/api/portraits/women/34.jpg'
			},
			amount: 500,
			type: 'project',
			status: 'pending',
			platform: 'POWERAPPS'
		},
		{
			id: '4',
			author: {
				id: 'u4',
				name: 'Xoana Nievas',
				image: 'https://randomuser.me/api/portraits/women/71.jpg'
			},
			amount: 700,
			type: 'LESSON',
			status: 'pending',
			platform: 'APPSHEET'
		}
	]
	const statsData = [
		{ title: 'Ganancias totales del mes', value: '$2850' },
		{ title: 'Cursos publicados', value: 5 },
		{ title: 'Aplicaciones transferidas en el mes', value: 11 },
		{ title: 'Horas de mentoría', value: 27 }
	]

	return (
		<div className="flex flex-col gap-12">
			<HomeBanner />
			<CreatorSectLinkBtns />
			<div className="space-y-4 rounded-lg bg-card px-6 py-4">
				<p className="text-sm font-bold">Mis proyectos</p>
				<p className="text-sm font-normal">
					Revisa los detalles, realiza entregas y mantén la comunicación con el
					creador para asegurar el éxito de tu trabajo.
				</p>
				<div className="flex flex-col xl:flex-row items-start gap-6">
					<div className="w-full xl:flex-grow">
						<ProjectsTable projects={mockProjects} />
					</div>
					<div className="w-full xl:w-[300px]">
						<GlobalStatsList stats={statsData} />
					</div>
				</div>
			</div>
			<SalesChart />
		</div>
	)
}
