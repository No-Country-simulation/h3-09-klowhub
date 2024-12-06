'use client'
import HomeBanner from './components/HomeBanner'
import CreatorSectLinkBtns from './components/CreatorSectionsLinkBtns'
import ProjectsTable from './components/ProjectsTable';
import { Project } from '@/models/project'
import GlobalStatsList from './components/GlobalStatsList';
import SalesChart from './components/SalesChart';


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
			type: 'course',
			status: 'pending',
			platform: 'powerapps'
		},
		{
			id: '2',
			author: {
				id: 'u2',
				name: 'Ana Gómez',
				image: 'https://randomuser.me/api/portraits/women/45.jpg'
			},
			amount: 850,
			type: 'lesson',
			status: 'pending',
			platform: 'appsheet'
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
			platform: 'appsheet'
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
			platform: 'powerapps'
		},
		{
			id: '4',
			author: {
				id: 'u4',
				name: 'Xoana Nievas',
				image: 'https://randomuser.me/api/portraits/women/71.jpg'
			},
			amount: 700,
			type: 'lesson',
			status: 'pending',
			platform: 'appsheet'
		},
	];
	const statsData = [
		{ title: 'Ganancias totales del mes', value: '$2850' },
		{ title: 'Cursos publicados', value: 5 },
		{ title: 'Aplicaciones transferidas en el mes', value: 11 },
		{ title: 'Horas de mentoría', value: 27 },
	]

	return (
		<div className='flex flex-col gap-12'>
			<HomeBanner />
			<CreatorSectLinkBtns />
			<div className='bg-card py-4 px-6 rounded-lg space-y-4'>
				<p className='text-sm font-bold'>Mis proyectos</p>
				<p className='text-sm font-normal'>Revisa los detalles, realiza entregas y mantén la comunicación con el creador para asegurar el éxito de tu trabajo.</p>
				<div className='flex items-start gap-6'>
					<div className='flex-grow'>
						<ProjectsTable projects={mockProjects} />
					</div>
					<div className='w-[300px]'>
						<GlobalStatsList stats={statsData} />
					</div>
				</div>
			</div>
			<SalesChart />
		</div>
	)
}
