'use client'
import TabListAndPanels from '@/components/Tabs/TabListAndPanels'
import { Course, Lesson, Module } from '@/models/course.model'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CourseDetailsPanel from './components/CourseDetailsPanel'
import GeneralInformationPanel from './components/GeneralInformationPanel'
import ModulesLessonsPanel from './components/ModulesLessonsPanel'

export default function CreateCoursePage() {
	const [tabValue, setTabValue] = useState(1)
	const [formData, setFormData] = useState({})
	const [addedModules, setAddedModules] = useState<Module[]>([])

	const { register, handleSubmit, control, setValue, watch } = useForm<Course>()

	const nextStep = (data: object) => {
		setFormData((prevData) => ({ ...prevData, ...data }))
		setTabValue(tabValue + 1)
	}

	const onSubmit = (data: object) => {
		const finalData = { ...formData, ...data, modules: addedModules }
		console.log('Datos finales para enviar: ', finalData)
	}

	const addModule = (module: Module) => {
		setAddedModules((prevModules) => [...prevModules, module])
	}

	const deleteModule = (moduleIndex: number) => {
		setAddedModules((prevModules) =>
			prevModules.filter((_, index) => index !== moduleIndex)
		)
	}

	const addModuleLesson = (moduleIndex: number, lesson: Lesson) => {
		setAddedModules((prevModules) =>
			prevModules.map((module, index) =>
				index === moduleIndex
					? { ...module, lessons: [...module.lessons, lesson] }
					: module
			)
		)
	}

	const deleteModuleLesson = (moduleIndex: number, lessonIndex: number) => {
		setAddedModules((prevModules) =>
			prevModules.map((module, index) =>
				index === moduleIndex
					? {
							...module,
							lessons: module.lessons.filter(
								(_, index) => index !== lessonIndex
							)
						}
					: module
			)
		)
	}

	const labels = [
		'Información general',
		'Detalles del curso',
		'Módulos y lecciones'
	]

	const panels = [
		<GeneralInformationPanel
			key={1}
			handleSubmit={handleSubmit}
			nextStep={nextStep}
			register={register}
			control={control}
			watch={watch}
		/>,
		<CourseDetailsPanel
			key={2}
			handleSubmit={handleSubmit}
			nextStep={nextStep}
			register={register}
			setValue={setValue}
		/>,
		<ModulesLessonsPanel
			key={3}
			handleSubmit={handleSubmit}
			nextStep={onSubmit}
			addedModules={addedModules}
			addModule={addModule}
			deleteModule={deleteModule}
			addModuleLesson={addModuleLesson}
			deleteModuleLesson={deleteModuleLesson}
		/>
	]

	return (
		<>
			<h4 className="mb-12 font-bold">
				Lanza tu curso: Comparte tu conocimiento
			</h4>
			<TabListAndPanels
				labels={labels}
				panels={panels}
				tabValue={tabValue}
				setTabValue={setTabValue}
			/>
		</>
	)
}
