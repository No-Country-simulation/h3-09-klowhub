'use client'
import {
	courseAdapter,
	lessonAdapter,
	moduleAdapter,
	resourceAdapter
} from '@/adapters/create-course.adapter'
import TabListAndPanels from '@/components/Tabs/TabListAndPanels'
import { Course, Lesson, Module } from '@/models/course.model'
import {
	createCourse,
	createLesson,
	createModule,
	createResource
} from '@/services/courses.service'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CourseDetailsPanel from './components/CourseDetailsPanel'
import GeneralInformationPanel from './components/GeneralInformationPanel'
import ModulesLessonsPanel from './components/ModulesLessonsPanel'

// Configuración inicial del curso
const initialCourseState: Course = {
	id: '',
	platform: 'POWERAPPS',
	relatedTags: [],
	title: '',
	image: '',
	shortDescription: '',
	price: 0,
	functionalities: [],
	language: '',
	sector: '',
	toolsAndPlatforms: [],
	contentType: 'Gratuito',
	courseType: 'COURSE',
	level: 'basic',
	contentPillar: '',
	learningOutcomes: [],
	prerequisites: [],
	detailedDescription: '',
	creator: '1111',
	reviews: []
}

export default function CreateCoursePage() {
	const [tabValue, setTabValue] = useState(1)
	const [formData, setFormData] = useState<Course>(initialCourseState)
	const [addedModules, setAddedModules] = useState<Module[]>([])

	const { register, handleSubmit, control, setValue, watch } = useForm<Course>()

	const router = useRouter()

	const nextStep = (data: object) => {
		setFormData((prevData) => ({ ...prevData, ...data }))
		setTabValue(tabValue + 1)
	}

	//
	const handleError = (error: unknown, context: string) => {
		console.log(`Error en ${context}:`, error)
	}

	const postResources = async (
		moduleIndex: number,
		lessonIndex: number,
		lessonId: string
	) => {
		const additionalResources = addedModules[moduleIndex].lessons[lessonIndex]
			.additionalResources as string[] | undefined
		const adaptedResourcesToRequest = additionalResources?.map((resource) =>
			resourceAdapter(resource, lessonId)
		)
		if (!adaptedResourcesToRequest) return
		for (const [
			resourceIndex,
			adaptedResource
		] of adaptedResourcesToRequest.entries()) {
			try {
				const createdResource = await createResource(adaptedResource)

				if (!createdResource.id) {
					throw new Error('No se pudo crear el recurso')
				}
			} catch (error) {
				handleError(
					error,
					`postResources (módulo ${moduleIndex}, lección ${lessonIndex}), recurso ${resourceIndex}`
				)
			}
		}
	}

	const postLessons = async (moduleIndex: number, moduleId: string) => {
		const adaptedLessonsToRequest = addedModules[moduleIndex].lessons?.map(
			(lesson, index) => lessonAdapter(lesson, moduleId, index)
		)
		if (!adaptedLessonsToRequest) return
		for (const [
			lessonIndex,
			adaptedLesson
		] of adaptedLessonsToRequest.entries()) {
			try {
				const createdLesson = await createLesson(adaptedLesson)

				if (!createdLesson.id) {
					throw new Error('No se pudo crear la lección')
				}

				const lessonId = createdLesson.id

				const additionalResources =
					addedModules[moduleIndex].lessons[lessonIndex].additionalResources

				if (additionalResources?.length) {
					await postResources(moduleIndex, lessonIndex, lessonId)
				}
			} catch (error) {
				handleError(
					error,
					`postLessons (módulo ${moduleIndex}, lección ${lessonIndex})`
				)
			}
		}
	}

	const postModules = async (courseId: string) => {
		const adaptedModulesToRequest = addedModules.map((module, index) =>
			moduleAdapter(module, courseId, index)
		)
		if (!adaptedModulesToRequest) return

		for (const [
			moduleIndex,
			adaptedModule
		] of adaptedModulesToRequest.entries()) {
			try {
				const createdModule = await createModule(adaptedModule)

				if (!createdModule.id) {
					throw new Error('No se pudo crear el módulo')
				}

				const moduleId = createdModule.id

				await postLessons(moduleIndex, moduleId)
			} catch (error) {
				handleError(error, `postModules (módulo ${moduleIndex})`)
			}
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const postCourse = async (finalData: any) => {
		try {
			const adaptedCourseToRequest = courseAdapter(finalData)

			const createdCourse = await createCourse(adaptedCourseToRequest)

			if (!createdCourse.id) {
				throw new Error('No se pudo crear el curso')
			}

			const courseId = createdCourse.id

			await postModules(courseId)
		} catch (error) {
			handleError(error, 'postCourse')
		}
	}

	//

	const onSubmit = async (data: object) => {
		const finalData = { ...formData, ...data, modules: addedModules }
		await postCourse(finalData)
		router.push('/creator/my-courses')
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
		// TODO: Remover archivos de Cloudinary
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
			watch={watch}
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
