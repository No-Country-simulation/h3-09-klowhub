'use client'
import Button from '@/components/buttons/Button'
import { ArcElement, Chart } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
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

const data = {
	labels: ['Red', 'Blue'],
	datasets: [
		{
			label: '# of Votes',
			data: [12, 19],
			backgroundColor: ['#9D32BC', '#DFD1F3'],
			borderWidth: 0,
			spacing: 5,
			cutout: '70%'
		}
	]
}

export default function MyCoursesPage() {
	return (
		<>
			<h6 className="mb-12 font-bold">Mis cursos</h6>

			<div className="mb-6 flex items-center justify-between">
				<h4 className="font-bold">Últimas ventas</h4>
				<Button>Crear curso</Button>
			</div>

			<div className="rounded-lg bg-card p-6">
				<section className="flex justify-between gap-6">
					<div className="grow">
						<LatestSalesTable sales={salesMock} />
					</div>
					<div className="relative my-2 flex w-72 items-center rounded-lg bg-white/10 px-6">
						<Doughnut data={data} />
						<div className="absolute left-0 flex w-72 flex-col gap-3 text-center">
							<p className="text-xs font-medium">Balance de cursos</p>
							<p className="text-xl font-bold">$173,6573</p>
						</div>
					</div>
				</section>

				<section></section>
			</div>
		</>
	)
}
