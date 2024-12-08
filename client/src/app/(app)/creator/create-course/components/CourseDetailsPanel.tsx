'use client'
import Button from '@/components/buttons/Button'
import TextArea from '@/components/inputs/TextArea'
import { Course } from '@/models/course.model'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import Image from 'next/image'
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
	const handleRemoveImage = async () => {
		try {
			if (resource) {
				const publicId = resource.split('/').pop()?.split('.')[0]
				const response = await fetch('/api/cloudinary/delete-image', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ publicId })
				})
				if (!response.ok) {
					throw new Error('Failed to delete image from Cloudinary')
				}
				setValue('image', '')
				setResource('')
			}
		} catch (error) {
			console.error('Error deleting image from Cloudinary:', error)
		}
	}

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

					<div className="flex-col space-y-6">
						{/* <FileInput
							label="Subí una imagen que represente tu curso de manera atractiva para utilizarla de portada"
							onFileChange={(files) => onFileChange(files)}
							files={files}
						/> */}
						<p className="text-sm font-semibold text-white">
							Subí una imagen que represente tu curso de manera atractiva para
							utilizarla de portada
						</p>
						<CldUploadWidget
							signatureEndpoint="/api/cloudinary/sign-image"
							onSuccess={(result, { widget }) => {
								const uploadedInfo = result?.info as CloudinaryUploadWidgetInfo
								setValue('image', uploadedInfo.secure_url)
								setResource(uploadedInfo.secure_url)
							}}
							onQueuesEnd={(result, { widget }) => {
								widget.close()
							}}
						>
							{({ open }) => {
								function handleOnClick() {
									handleRemoveImage()
									open()
								}
								return (
									<>
										{resource && (
											<div className="flex items-center">
												<Image
													src={resource}
													alt="preview"
													width={500}
													height={500}
													className="h-40 w-fit rounded-lg object-scale-down"
												/>
												<Button
													type="button"
													variant="tertiary"
													size="l"
													onClick={handleRemoveImage}
												>
													Remover imagen
												</Button>
											</div>
										)}
										<Button onClick={handleOnClick}>Agrega una imagen</Button>
									</>
								)
							}}
						</CldUploadWidget>
					</div>
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
