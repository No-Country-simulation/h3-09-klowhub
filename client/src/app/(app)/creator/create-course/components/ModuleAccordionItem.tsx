import Button from '@/components/buttons/Button'
import { Lesson, Module } from '@/models/course.model'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronsUpDown } from 'lucide-react'
import AddedLessonsAccordion from './AddedLessonsAccordion'
import AddLesson from './AddLesson'

interface ModuleAccordionItemProps {
	module: Module
	moduleIndex: number
	deleteModule: (moduleIndex: number) => void
	addModuleLesson: (moduleIndex: number, lesson: Lesson) => void
	deleteModuleLesson: (moduleIndex: number, lessonIndex: number) => void
}
export default function ModuleAccordionItem({
	module,
	moduleIndex,
	deleteModule,
	addModuleLesson,
	deleteModuleLesson
}: ModuleAccordionItemProps) {
	function deleteModuleHandler() {
		deleteModule(moduleIndex)
	}

	return (
		<Accordion.Item
			value={`item-${moduleIndex}`}
			className="rounded-lg bg-white/5 p-6"
		>
			<Accordion.Trigger className="flex h-10 w-full items-center justify-between text-left">
				<p className="font-semibold">
					Módulo {moduleIndex + 1}: {module.title}
				</p>
				<ChevronsUpDown size={16} />
			</Accordion.Trigger>
			<Accordion.Content className="flex flex-col gap-6">
				<p className="mt-6 text-sm font-semibold">Descripción</p>
				<p className="text-sm">{module.description}</p>
				<AddedLessonsAccordion
					moduleIndex={moduleIndex}
					lessons={module.lessons}
					deleteModuleLesson={deleteModuleLesson}
				/>
				<AddLesson onAdd={addModuleLesson} moduleIndex={moduleIndex} />
				<div className="flex w-full justify-end">
					<Button
						variant="tertiary"
						type="button"
						onClick={deleteModuleHandler}
					>
						Elimiar Módulo
					</Button>
				</div>
			</Accordion.Content>
		</Accordion.Item>
	)
}
