import Button from '@/components/buttons/Button'
import { AppCourseCard } from '@/components/cards/AppCourseCard'

export default function RecommendedCourses() {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-1">
				<h4 className="text-base font-bold">Cursos recomendados</h4>
				<p className="text-sm font-normal">
					Descubre los cursos más destacados y lleva tus habilidades al
					siguiente nivel. Aprende de expertos y aplica tus conocimientos en
					proyectos reales con AppSheet.
				</p>
			</div>
			<div className="flex w-full flex-wrap justify-between gap-y-8">
				{Array.from({ length: 3 }).map((_, i) => (
					<AppCourseCard key={i} variant="course" />
				))}
			</div>
			<Button variant="secondary" className="mx-auto w-64">
				Ver mas
			</Button>
		</section>
	)
}
