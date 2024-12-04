import { Lesson, Module } from '@/models/course.model'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronsUpDown } from 'lucide-react'
import AddedLessonsAccordion from './AddedLessonsAccordion'
import AddLesson from './AddLesson'

interface ModuleAccordionItemProps {
	module: Module
	index: number
	addModuleLesson: (moduleIndex: number, lesson: Lesson) => void
}
export default function ModuleAccordionItem({
	module,
	index,
	addModuleLesson
}: ModuleAccordionItemProps) {
	return (
		<Accordion.Item
			value={`item-${index}`}
			className="rounded-lg bg-white/5 p-6"
		>
			<Accordion.Trigger className="flex h-10 w-full items-center justify-between text-left">
				<p className="font-semibold">
					Módulo {index + 1}: {module.title}
				</p>
				<ChevronsUpDown size={16} />
			</Accordion.Trigger>
			<Accordion.Content className="flex flex-col gap-6">
				<p className="mt-6 text-sm font-semibold">Descripción</p>
				<p className="text-sm">{module.description}</p>
				<AddedLessonsAccordion lessons={module.lessons} />
				<AddLesson onAdd={addModuleLesson} moduleIndex={index} />
			</Accordion.Content>
		</Accordion.Item>
	)
}
