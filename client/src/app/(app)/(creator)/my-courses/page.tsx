import Button from '@/components/buttons/Button'
import LatestSalesTable, { CourseSale } from './components/LatestSalesTable'

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

export default function MyCoursesPage() {
	return (
		<>
			<h6>Mis cursos</h6>

			<div>
				<h4>Últimas ventas</h4>
				<Button>Crear curso</Button>
			</div>

			<div>
				<section>
					<LatestSalesTable sales={salesMock} />
				</section>
				<section></section>
			</div>
		</>
	)
}
