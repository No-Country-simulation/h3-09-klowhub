import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Tooltip
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend
)

const chartData = {
	labels: [
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre'
	],
	datasets: [
		{
			label: 'Appsheets',
			data: [1200, 1300, 1150, 1400, 1600, 1500, 1700, 1750],
			backgroundColor: '#702486',
			borderRadius: 10
		},
		{
			label: 'Cursos',
			data: [120, 150, 110, 130, 170, 140, 180, 190],
			backgroundColor: '#DFD1F3',
			borderRadius: 10
		},
		{
			label: 'PowerApps',
			data: [450, 500, 480, 550, 620, 580, 700, 750],
			backgroundColor: '#9F74DC',
			borderRadius: 10
		},
		{
			label: 'Mentorships',
			data: [800, 850, 780, 900, 950, 910, 1000, 1030],
			backgroundColor: '#D194E2',
			borderRadius: 10
		}
	]
}

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false,
			position: 'top' as const,
			labels: {
				color: '#FFFFFF'
			}
		},
		tooltip: {
			enabled: true,
			callbacks: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				label: (context: any) => {
					return `$${context.raw}`
				}
			}
		}
	},
	scales: {
		x: {
			ticks: {
				color: '#DFD1F3'
			},
			grid: {
				display: false
			}
		},
		y: {
			ticks: {
				color: '#DFD1F3',
				callback: function (tickValue: string | number) {
					return `$${tickValue}`
				}
			},
			grid: {
				color: '#E5E7EB'
			}
		}
	}
}

export default function SalesChart() {
	return (
		<section className="rounded-lg bg-card p-6">
			<div className="mb-4 rounded-lg bg-white/10 p-2">
				<p className="text-sm font-semibold text-white">
					Ventas por Indicador - Últimos 8 Meses
				</p>
			</div>
			<div className="h-[350px] w-full rounded-lg bg-white/10 p-4">
				<Bar data={chartData} options={chartOptions} />
			</div>
		</section>
	)
}
