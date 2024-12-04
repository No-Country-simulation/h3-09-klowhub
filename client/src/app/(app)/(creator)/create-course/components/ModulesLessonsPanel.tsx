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
	updateModuleLessons: (moduleIndex: number, lessons: Lesson[]) => void
}

export default function ModulesLessonsPanel({
	nextStep,
	handleSubmit,
	addedModules,
	addModule,
	updateModuleLessons
}: ModulesLessonsPanelProps) {
	return (
		<form onSubmit={handleSubmit(nextStep)} className="flex flex-col gap-4">
			<PanelContainer className="flex">
				<div className="flex grow flex-col gap-12">
					{addedModules && <AddedModulesAccordion modules={addedModules} />}
					<AddModule onAdd={addModule} />
				</div>
				<div className="w-80"></div>
			</PanelContainer>
			<div className="flex w-full justify-end">
				<Button type="submit" className="w-16">
					Publicar
				</Button>
			</div>
		</form>
	)
}
