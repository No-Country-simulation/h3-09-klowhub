import Button from '@/components/buttons/Button'
import { CourseInProgressCard } from '@/components/cards/CourseInProgressCard'
import Link from 'next/link'

export default function MyLearn() {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-1">
				<h4 className="text-base font-bold">Continua tu aprendizaje</h4>
				<p className="text-sm font-normal">
					Retoma donde lo dejaste. Vuelve a ver tu último video y seguí
					aprendiendo sin perder el ritmo.
				</p>
			</div>
			<section className="flex flex-col gap-4">
				<CourseInProgressCard />
			</section>
			<Link href={'/learn/my-learning'} className="mx-auto w-64">
				<Button variant="secondary">Ver todos mis cursos</Button>
			</Link>
		</section>
	)
}
