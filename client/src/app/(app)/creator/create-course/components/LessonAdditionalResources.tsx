import { Files } from 'lucide-react'

export default function LessonAdditionalResources({
	additionalResources
}: {
	additionalResources: string[]
}) {
	return (
		<>
			<p className="mb-3 text-sm font-semibold">Recursos adicionales</p>
			<div className="flex flex-col gap-3">
				{additionalResources?.map((resource, index) => {
					return (
						<div
							key={index}
							className="w-fit rounded-lg bg-white/15 px-2 py-1 text-sm font-semibold"
						>
							<a
								href={resource}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2"
							>
								<Files size={20} className="text-primary-b-300" />
								<p>{resource}</p>
							</a>
						</div>
					)
				})}
			</div>
		</>
	)
}
