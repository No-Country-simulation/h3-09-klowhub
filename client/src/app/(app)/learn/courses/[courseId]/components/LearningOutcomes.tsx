import { Course } from '@/models/course.model'
import { Check } from 'lucide-react'

export default function LearningOutcomes({
	learningOutcomes
}: {
	learningOutcomes: Course['learningOutcomes']
}) {
	return (
		<section>
			<b>Después de completar este curso, serás capaz de</b>
			<ul>
				{Array.isArray(learningOutcomes) &&
					learningOutcomes.map((learn, i) => (
						<li key={'learn-' + i} className="my-2 ml-4 flex gap-4 text-sm">
							<Check /> {learn}
						</li>
					))}
			</ul>
		</section>
	)
}
