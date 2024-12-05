import Button from '@/components/buttons/Button'
import { Course, Lesson, Module } from '@/models/course.model'
import { UseFormHandleSubmit } from 'react-hook-form'
import AddedModulesAccordion from './AddedModulesAccordion'
import AddModule from './AddModule'
import PanelContainer from './PanelContainer'

interface ModulesLessonsPanelProps {
	nextStep: (data: object) => void
	handleSubmit: UseFormHandleSubmit<Course, undefined>
	addedModules: Module[]
	addModule: (module: Module) => void
	deleteModule: (moduleIndex: number) => void
	addModuleLesson: (moduleIndex: number, lesson: Lesson) => void
	deleteModuleLesson: (moduleIndex: number, lessonIndex: number) => void
}

export default function ModulesLessonsPanel({
	nextStep,
	handleSubmit,
	addedModules,
	addModule,
	deleteModule,
	addModuleLesson,
	deleteModuleLesson
}: ModulesLessonsPanelProps) {
	return (
		<form onSubmit={handleSubmit(nextStep)} className="flex flex-col gap-4">
			<PanelContainer className="flex">
				<div className="flex grow flex-col gap-12">
					{addedModules && (
						<AddedModulesAccordion
							modules={addedModules}
							deleteModule={deleteModule}
							addModuleLesson={addModuleLesson}
							deleteModuleLesson={deleteModuleLesson}
						/>
					)}
					<AddModule onAdd={addModule} />
				</div>
				<div className="min-w-80"></div>
			</PanelContainer>
			<div className="flex w-full justify-end">
				<Button type="submit" className="w-16">
					Publicar
				</Button>
			</div>
		</form>
	)
}