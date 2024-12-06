import { Files } from 'lucide-react'

export default function LessonAdditionalResources({
	additionalResources
}: {
	additionalResources: string[] | FileList
}) {
	if (!additionalResources) return null
	const resources = Array.isArray(additionalResources)
		? additionalResources
		: Array.from(additionalResources)
	return (
		<>
			<p className="mb-3 text-sm font-semibold">Recursos adicionales</p>
			<div className="flex flex-col gap-3">
				{resources?.map((resource, index) => {
					return (
						<div
							key={index}
							className="w-fit rounded-lg bg-white/15 px-2 py-1 text-sm font-semibold"
						>
							<a
								href={
									typeof resource === 'string'
										? resource
										: URL.createObjectURL(resource as File)
								}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2"
							>
								<Files size={20} className="text-primary-b-300" />
								<p>{typeof resource === 'string' ? resource : resource.name}</p>
							</a>
						</div>
					)
				})}
			</div>
		</>
	)
}
