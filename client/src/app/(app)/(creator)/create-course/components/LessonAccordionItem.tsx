import { Lesson } from '@/models/course.model'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronsUpDown, Files } from 'lucide-react'
import Image from 'next/image'

interface LessonAccordionItemProps {
	lesson: Lesson
	index: number
}
export default function LessonAccordionItem({
	lesson,
	index
}: LessonAccordionItemProps) {
	return (
		<Accordion.Item
			value={`item-${index}`}
			className="rounded-lg bg-white/5 p-6"
		>
			<Accordion.Trigger className="flex h-10 w-full items-center justify-between text-left">
				<p className="text-sm font-semibold">
					Lección {index + 1}: {lesson.title}
				</p>
				<ChevronsUpDown size={16} />
			</Accordion.Trigger>
			<Accordion.Content>
				<p className="mb-3 text-sm font-semibold">Descripción</p>
				<p className="mb-6 text-sm">{lesson.description}</p>
				<p className="mb-3 text-sm font-semibold">Contenido de la lección</p>
				<div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
					<div className="flex flex-col gap-1">
						<Image
							src={lesson.image}
							alt={lesson.title}
							width={900}
							height={600}
							className="h-48 w-fit rounded-lg object-scale-down"
						/>
						<p>Imágen de la lección</p>
					</div>
					<div className="flex flex-col gap-1">
						<video
							key={lesson.contentLink}
							controls
							className="h-48 w-fit rounded-lg"
						>
							<source src={lesson.contentLink} type="video/mp4" />
						</video>
						<p>Video</p>
					</div>
				</div>

				<p className="mb-3 text-sm font-semibold">Recursos adicionales</p>
				<div className="flex flex-col gap-3">
					{lesson.additionalResources?.map((resource, index) => {
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
			</Accordion.Content>
		</Accordion.Item>
	)
}
