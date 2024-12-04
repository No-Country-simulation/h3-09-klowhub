import Button from '@/components/buttons/Button'
import { Lesson } from '@/models/course.model'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronsUpDown } from 'lucide-react'
import LessonAdditionalResources from './LessonAdditionalResources'
import LessonMediaPreview from './LessonMediaPreview'

interface LessonAccordionItemProps {
	lesson: Lesson
	lessonIndex: number
	moduleIndex: number
	deleteModuleLesson: (moduleIndex: number, lessonIndex: number) => void
}
export default function LessonAccordionItem({
	lesson,
	lessonIndex,
	moduleIndex,
	deleteModuleLesson
}: LessonAccordionItemProps) {
	const handleDeleteLesson = () => {
		deleteModuleLesson(moduleIndex, lessonIndex)
	}
	return (
		<Accordion.Item
			value={`item-${lessonIndex}`}
			className="rounded-lg bg-white/5 p-6"
		>
			<Accordion.Trigger className="flex h-6 w-full items-center justify-between text-left">
				<p className="text-sm font-semibold">
					Lección {lessonIndex + 1}: {lesson.title}
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
				<div className="flex w-full justify-end">
					<Button
						variant="tertiary"
						size="l"
						type="button"
						onClick={handleDeleteLesson}
					>
						Eliminar Lección
					</Button>
				</div>
			</Accordion.Content>
		</Accordion.Item>
	)
}
