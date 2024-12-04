import { Lesson } from '@/models/course.model'
import * as Accordion from '@radix-ui/react-accordion'
import LessonAccordionItem from './LessonAccordionItem'

interface AddedLessonsAccordionProps {
	lessons: Lesson[]
}
export default function AddedLessonsAccordion({
	lessons
}: AddedLessonsAccordionProps) {
	return (
		<Accordion.Root type="multiple">
			<div className="flex flex-col gap-3">
				{lessons.map((lesson, index) => {
					return (
						<LessonAccordionItem key={index} lesson={lesson} index={index} />
					)
				})}
			</div>
		</Accordion.Root>
	)
}
