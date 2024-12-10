import { Lesson, Module } from '@/models/course.model'
import * as Accordion from '@radix-ui/react-accordion'
import ModuleAccordionItem from './ModuleAccordionItem'

interface AddedModulesAccordionProps {
	modules: Module[]
	deleteModule: (moduleIndex: number) => void
	addModuleLesson: (moduleIndex: number, lesson: Lesson) => void
	deleteModuleLesson: (moduleIndex: number, lessonIndex: number) => void
}
export default function AddedModulesAccordion({
	modules,
	deleteModule,
	addModuleLesson,
	deleteModuleLesson
}: AddedModulesAccordionProps) {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-xl font-bold">Módulos</h2>
			<Accordion.Root type="multiple">
				<div className="flex flex-col gap-6">
					{modules.map((module, index) => (
						<ModuleAccordionItem
							key={index}
							module={module}
							moduleIndex={index}
							deleteModule={deleteModule}
							addModuleLesson={addModuleLesson}
							deleteModuleLesson={deleteModuleLesson}
						/>
					))}
				</div>
			</Accordion.Root>
		</div>
	)
}
