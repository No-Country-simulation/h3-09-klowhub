import { Lesson } from '@/models/course.model'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronsUpDown } from 'lucide-react'
import LessonAdditionalResources from './LessonAdditionalResources'
import LessonMediaPreview from './LessonMediaPreview'

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
				<LessonMediaPreview lesson={lesson} />
				{lesson.additionalResources && (
					<LessonAdditionalResources
						additionalResources={lesson.additionalResources}
					/>
				)}
			</Accordion.Content>
		</Accordion.Item>
	)
}
