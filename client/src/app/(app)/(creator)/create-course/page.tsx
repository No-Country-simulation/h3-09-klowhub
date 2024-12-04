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
	const [addedModules, setAddedModules] = useState<Module[]>([
		// TODO: Borrar data mockeada
		{
			title: 'Introducción a gestión de inventarios con AppSheet',
			description: 'Descripción del módulo 1',
			lessons: [
				{
					title: 'Lección 1',
					description: 'Descripción de la lección 1',
					contentLink:
						'https://videos.pexels.com/video-files/4370609/4370609-uhd_2560_1440_25fps.mp4',
					image: 'https://picsum.photos/900/600',
					additionalResources: [
						'https://example.com/resource1.pdf',
						'https://example.com/resource2.pdf'
					]
				},
				{
					title: 'Lección 2',
					description: 'Descripción de la lección 2',
					contentLink:
						'https://videos.pexels.com/video-files/6201664/6201664-uhd_2560_1440_24fps.mp4',
					image: 'https://picsum.photos/900/600'
				}
			]
		},
		{
			title: 'Teoria de la gestión de inventarios con AppSheet',
			description: 'Descripción del módulo 2',
			lessons: [
				{
					title: 'Lección 1',
					description: 'Descripción de la lección 1',
					contentLink:
						'https://videos.pexels.com/video-files/4370609/4370609-uhd_2560_1440_25fps.mp4',
					image: 'https://picsum.photos/900/600'
				},
				{
					title: 'Lección 2',
					description: 'Descripción de la lección 2',
					contentLink:
						'https://videos.pexels.com/video-files/6201664/6201664-uhd_2560_1440_24fps.mp4',
					image: 'https://picsum.photos/900/600'
				}
			]
		}
	])

	const { register, handleSubmit, control, setValue } = useForm<Course>()

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

	const updateModuleLessons = (moduleIndex: number, lessons: Lesson[]) => {
		setAddedModules((prevModules) =>
			prevModules.map((module, index) =>
				index === moduleIndex ? { ...module, lessons } : module
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
			updateModuleLessons={updateModuleLessons}
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
