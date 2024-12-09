'use client'
import Button from '@/components/buttons/Button'
import MyCldUploadWidget from '@/components/cloudinary/MyCldUploadWidget'
import TextArea from '@/components/inputs/TextArea'
import { Course } from '@/models/course.model'
import { useState } from 'react'
import {
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue
} from 'react-hook-form'
import PanelContainer from './PanelContainer'

interface CourseDetailsPanelProps {
	nextStep: (data: object) => void
	handleSubmit: UseFormHandleSubmit<Course, undefined>
	register: UseFormRegister<Course>
	setValue: UseFormSetValue<Course>
}

export default function CourseDetailsPanel({
	nextStep,
	handleSubmit,
	register,
	setValue
}: CourseDetailsPanelProps) {
	const [resource, setResource] = useState<string>()
	// const [files, setFiles] = useState<FileList>()
	// const onFileChange = (files: FileList | null) => {
	// 	if (!files) return
	// 	setFiles(files)
	// 	setValue('image', files[0])
	// }

	return (
		<form onSubmit={handleSubmit(nextStep)} className="flex flex-col gap-4">
			<PanelContainer className="flex">
				<div className="flex grow flex-col gap-12">
					<section>
						<TextArea
							label="Decinos qué van a aprender tus estudiantes al finalizar el curso."
							placeholder="Escribí los temas y beneficios separados por comas."
							{...register('learningOutcomes', { required: true })}
						/>
					</section>

					<section>
						<TextArea
							label="Requisitos previos"
							placeholder="Indicá los requisitos separados por comas."
							{...register('prerequisites', { required: true })}
						/>
					</section>

					<section>
						<TextArea
							label="Hacé una descripción detallada del contenido y de los beneficios que ofrece."
							placeholder="Describí el contenido y los beneficios de forma detallada."
							{...register('detailedDescription', { required: true })}
						/>
					</section>

					{/* Cloudinary */}
					<MyCldUploadWidget
						label="Subí una imagen que represente tu curso de manera atractiva para utilizarla de portada"
						setFormValue={setValue}
						formField="image"
						setResource={setResource}
						resource={resource}
						resourceType="image"
					/>
					{/* Cloudinary */}

					{/* <div className="flex-col space-y-6">
						<FileInput
							label="Subí una imagen que represente tu curso de manera atractiva para utilizarla de portada"
							onFileChange={(files) => onFileChange(files)}
							files={files}
						/>
					</div> */}
				</div>
				<div className="w-80"></div>
			</PanelContainer>
			<div className="flex w-full justify-end">
				<Button type="submit" className="w-16">
					Continuar
				</Button>
			</div>
		</form>
	)
}
