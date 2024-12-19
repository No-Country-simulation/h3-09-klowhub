import { ArcElement, Chart } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import LatestSalesTable, { CourseSale } from './LatestSalesTable'
Chart.register(ArcElement)

// TODO: Borrar data mockeada
const salesMock: CourseSale[] = [
	{ id: '1', buyer: { name: 'Juan Pérez', image: '/img/profile_test.jpeg' }, amount: 100, date: new Date(), state: 'finished' },
	{ id: '2', buyer: { name: 'María González', image: '/img/profile_test.jpeg' }, amount: 200, date: new Date(), state: 'finished' },
	{ id: '3', buyer: { name: 'Carlos Rodríguez', image: '/img/profile_test.jpeg' }, amount: 300, date: new Date(), state: 'pending' },
	{ id: '4', buyer: { name: 'Ana López', image: '/img/profile_test.jpeg' }, amount: 400, date: new Date(), state: 'finished' },
	{ id: '5', buyer: { name: 'Pedro Martínez', image: '/img/profile_test.jpeg' }, amount: 500, date: new Date(), state: 'pending' }
]

// TODO: Borrar data mockeada
const data = {
	labels: ['Red', 'Blue'],
	datasets: [
		{
			label: '# of Votes',
			data: [12, 19],
			backgroundColor: ['#9D32BC', '#DFD1F3'],
			borderWidth: 0,
			spacing: 8,
			cutout: '80%'
		}
	]
}

const options = {
	responsive: true,
	maintainAspectRatio: false,
}

export default function LatestSales() {
	return (
		<section className="flex w-full justify-between gap-6">
			<div className="grow">
				<LatestSalesTable sales={salesMock} />
			</div>

			<div className="relative my-2 flex w-full max-w-xs items-center rounded-lg bg-white/10 p-6">
				<div className="w-full h-[200px] md:h-[300px] lg:h-[400px]">
					<Doughnut data={data} options={options} />
				</div>
				<div className="absolute left-0 flex w-full flex-col gap-3 text-center">
					<p className="text-xs font-medium">Balance de cursos</p>
					<p className="text-xl font-bold">$173,6573</p>
				</div>
			</div>
		</section>
	)
}
