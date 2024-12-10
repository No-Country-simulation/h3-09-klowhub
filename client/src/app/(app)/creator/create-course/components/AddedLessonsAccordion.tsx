import { Lesson } from '@/models/course.model'
import * as Accordion from '@radix-ui/react-accordion'
import LessonAccordionItem from './LessonAccordionItem'

interface AddedLessonsAccordionProps {
	moduleIndex: number
	lessons: Lesson[]
	deleteModuleLesson: (moduleIndex: number, lessonIndex: number) => void
}
export default function AddedLessonsAccordion({
	moduleIndex,
	lessons,
	deleteModuleLesson
}: AddedLessonsAccordionProps) {
	return (
		<Accordion.Root type="multiple">
			<div className="flex flex-col gap-3">
				{lessons.map((lesson, index) => {
					return (
						<LessonAccordionItem
							key={index}
							lesson={lesson}
							lessonIndex={index}
							moduleIndex={moduleIndex}
							deleteModuleLesson={deleteModuleLesson}
						/>
					)
				})}
			</div>
		</Accordion.Root>
	)
}
