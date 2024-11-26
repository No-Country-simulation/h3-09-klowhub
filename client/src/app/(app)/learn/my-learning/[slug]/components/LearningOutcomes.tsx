import { Check } from 'lucide-react'

interface LearningOutcomesProps {
	learningOutcomes: string[]
}
export default function LearningOutcomes({
	learningOutcomes
}: LearningOutcomesProps) {
	return (
		<article className="flex flex-col gap-3">
			<h6 className="text-sm font-semibold">
				Después de completar este curso, serás capaz de
			</h6>
			{learningOutcomes.map((outcome, idx) => {
				return (
					<div key={idx} className="ml-4 flex gap-4">
						<Check />
						<p className="text-sm">{outcome}</p>
					</div>
				)
			})}
		</article>
	)
}
