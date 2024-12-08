import { Course } from '@/models/course.model'
import { Check } from 'lucide-react'

export default function Prerequisites({
	prerequisites
}: {
	prerequisites: Course['prerequisites']
}) {
	return (
		<section>
			<b>Requisitos</b>
			<ul>
				{Array.isArray(prerequisites) &&
					prerequisites.map((requisite, i) => (
						<li key={'requisite-' + i} className="my-2 ml-4 flex gap-4 text-sm">
							<Check /> {requisite}
						</li>
					))}
			</ul>
		</section>
	)
}
