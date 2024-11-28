import { Platform } from '@/models/product.model'
import { capitalize } from '@/utils/string.utils'
import { Check } from 'lucide-react'

export default function CourseInclusions({ platform }: { platform: Platform }) {
	const courseInclusions = [
		`Todas las lecciones, videos y materiales de apoyo necesarios para dominar ${capitalize(platform)}.`,
		'Casos de estudio y ejemplos reales para aplicar lo aprendido en situaciones concretas.',
		'Acceso a foros y comunidad para resolver dudas y compartir experiencias.',
		'Certificado de finalización al completar el curso.'
	]
	return (
		<article className="flex flex-col gap-3">
			<h6 className="text-xl font-bold">¿Qué incluye?</h6>
			{courseInclusions.map((inclusion, idx) => {
				return (
					<div key={idx} className="ml-4 flex gap-4">
						<Check />
						<p className="text-sm">{inclusion}</p>
					</div>
				)
			})}
		</article>
	)
}
