'use client'
import TabListAndPanels from '@/components/Tabs/TabListAndPanels'
import { Course } from '@/models/course.model'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import GeneralInformationPanel from './components/GeneralInformationPanel'

export default function CreateCoursePage() {
	const [step, setStep] = useState(1)
	const [formData, setFormData] = useState({})

	const { register, handleSubmit, watch, reset } = useForm<Course>()

	// Avanzar al siguiente paso
	const nextStep = (data: object) => {
		setFormData((prevData) => ({ ...prevData, ...data }))
		setStep(step + 1)
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
		/>,
		<div key={1}>Contenido</div>,
		<div key={2}>Preguntas</div>
	]

	return (
		<>
			<h4>Lanza tu curso: Comparte tu conocimiento</h4>
			<TabListAndPanels labels={labels} panels={panels} />
		</>
	)
}
