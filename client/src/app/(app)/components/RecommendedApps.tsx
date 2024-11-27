import Button from '@/components/buttons/Button'
import { AppCourseCard } from '@/components/cards/AppCourseCard'

export default function RecommendedApps() {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-1">
				<h4 className="text-base font-bold">Aplicaciones recomendadas</h4>
				<p className="text-sm font-normal">
					Explorá soluciones listas para usar. Encontrá la app perfecta para tu
					proyecto y empezá a trabajar de inmediato.
				</p>
			</div>
			<div className="flex w-full flex-wrap justify-between gap-y-8">
				{Array.from({ length: 4 }).map((_, i) => (
					<AppCourseCard key={i} variant="app" />
				))}
			</div>
			<Button variant="secondary" className="mx-auto w-64">
				Ver mas
			</Button>
		</section>
	)
}
