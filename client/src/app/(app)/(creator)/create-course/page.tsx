'use client'
import TabListAndPanels from '@/components/Tabs/TabListAndPanels'
import { Course } from '@/models/course.model'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CourseDetailsPanel from './components/CourseDetailsPanel'
import GeneralInformationPanel from './components/GeneralInformationPanel'
import ModulesLessonsPanel from './components/ModulesLessonsPanel'

export default function CreateCoursePage() {
	const [tabValue, setTabValue] = useState(1)
	const [formData, setFormData] = useState({})

	const { register, handleSubmit, watch, reset, control, setValue } =
		useForm<Course>()

	// Avanzar al siguiente paso
	const nextStep = (data: object) => {
		console.log(data)
		setFormData((prevData) => ({ ...prevData, ...data }))
		setTabValue(tabValue + 1)
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
			nextStep={nextStep}
			register={register}
		/>
	]

	return (
		<>
			<h4>Lanza tu curso: Comparte tu conocimiento</h4>
			<TabListAndPanels
				labels={labels}
				panels={panels}
				tabValue={tabValue}
				setTabValue={setTabValue}
			/>
		</>
	)
}
