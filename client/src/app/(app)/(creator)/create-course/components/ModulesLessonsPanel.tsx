import Button from '@/components/buttons/Button'
import { Course, Module } from '@/models/course.model'
import { useState } from 'react'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import AddedModulesAccordion from './AddedModulesAccordion'
import AddModule from './AddModule'
import PanelContainer from './PanelContainer'

interface ModulesLessonsPanelProps {
	nextStep: (data: object) => void
	handleSubmit: UseFormHandleSubmit<Course, undefined>
	register: UseFormRegister<Course>
}

export default function ModulesLessonsPanel({
	nextStep,
	handleSubmit
}: ModulesLessonsPanelProps) {
	const [addedModules, setAddedModules] = useState<Module[]>([
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

	return (
		<form onSubmit={handleSubmit(nextStep)} className="flex flex-col gap-4">
			<PanelContainer className="flex">
				<div className="flex grow flex-col gap-12">
					{addedModules && <AddedModulesAccordion modules={addedModules} />}
					<AddModule />
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
