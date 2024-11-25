import { Check } from 'lucide-react'

export default function CoursePrerequisites({
	prerequisites
}: {
	prerequisites: string[]
}) {
	return (
		<article className="flex flex-col gap-3">
			<h6 className="text-xl font-bold">Requisitos</h6>
			{prerequisites.map((prerequisite, idx) => {
				return (
					<div key={idx} className="ml-4 flex gap-4">
						<Check />
						<p className="text-sm">{prerequisite}</p>
					</div>
				)
			})}
		</article>
	)
}
