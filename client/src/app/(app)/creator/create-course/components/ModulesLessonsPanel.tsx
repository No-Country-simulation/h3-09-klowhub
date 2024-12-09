import Button from '@/components/buttons/Button'
import { Course, Lesson, Module } from '@/models/course.model'
import { UseFormHandleSubmit, UseFormWatch } from 'react-hook-form'
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
	watch: UseFormWatch<Course>
}

export default function ModulesLessonsPanel({
	nextStep,
	handleSubmit,
	addedModules,
	addModule,
	deleteModule,
	addModuleLesson,
	deleteModuleLesson,
	watch
}: ModulesLessonsPanelProps) {
	const isFieldFilled = (value: any) => {
		if (Array.isArray(value)) return value.length > 0
		if (value instanceof File || value instanceof Blob) return value.size > 0
		return !!value?.toString().trim()
	}

	const allFieldsFilled = Object.values(watch()).every(isFieldFilled)

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
			<div className="flex w-full flex-col items-end">
				<div>
					<Button type="submit" className="w-16" disabled={!allFieldsFilled}>
						Publicar
					</Button>
					{!allFieldsFilled && (
						<p className="text-center text-sm text-red-500">
							* Complete todos los campos
						</p>
					)}
				</div>
			</div>
		</form>
	)
}
