'use client'
import Button from '@/components/buttons/Button'
import MyCldUploadWidget from '@/components/cloudinary/MyCldUploadWidget'
import Input from '@/components/inputs/Input'
import TextArea from '@/components/inputs/TextArea'
import { Lesson } from '@/models/course.model'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface AddLessonProps {
	onAdd: (moduleIndex: number, lesson: Lesson) => void
	moduleIndex: number
}

export default function AddLesson({ onAdd, moduleIndex }: AddLessonProps) {
	const [showModuleForm, setShowModuleForm] = useState(false)
	const [lessonData, setLessonData] = useState<Lesson>({
		title: '',
		description: '',
		contentLink: '',
		image: ''
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setLessonData((prev) => ({ ...prev, [name]: value }))
	}

	const handleImageChange = (image: string) => {
		if (!image) return
		setLessonData((prev) => ({ ...prev, image }))
	}

	const handleVideoChange = (contentLink: string) => {
		if (!contentLink) return
		setLessonData((prev) => ({ ...prev, contentLink }))
	}

	const handleResourcesChange = (additionalResource: string) => {
		if (!additionalResource) return
		const additionalResources = [additionalResource]
		setLessonData((prev) => ({ ...prev, additionalResources }))
	}

	const handleAddLesson = () => {
		onAdd(moduleIndex, lessonData) // Enviar datos al padre
		setShowModuleForm(false)
		setLessonData({ title: '', description: '', contentLink: '', image: '' })
	}

	return (
		<>
			{!showModuleForm ? (
				<div
					role="button"
					onClick={() => setShowModuleForm(true)}
					className="flex w-full items-center justify-center gap-6 rounded-lg border border-dashed border-primary-b-300 bg-white/10 p-4 hover:text-primary-b-300 active:text-primary-b-600"
				>
					<Plus />
					<p>Agregar lección</p>
				</div>
			) : (
				<div className="flex flex-col gap-6 rounded-lg bg-white/10 p-6">
					<Input
						name="title"
						label="Título de la lección"
						placeholder="Agrega un nombre para la lección "
						value={lessonData.title}
						onChange={handleInputChange}
					/>
					<TextArea
						name="description"
						label="Descripción"
						placeholder="Escribe una descripción básica del módulo"
						value={lessonData.description}
						onChange={handleInputChange}
					/>
					{/* <FileInput
						label="Agrega la imagen de la lección"
						name="image"
						onFileChange={handleImageChange}
					/>
					<FileInput
						label="Agrega el video de la lección"
						name="contentLink"
						onFileChange={handleVideoChange}
						accept="video/*"
					/>
					<FileInput
						label="Agrega recursos adicionales (opcional)"
						name="additionalResources"
						onFileChange={handleResourcesChange}
						accept="image/*, application/pdf"
						multiple
					/> */}
					{/* Cloudinary */}
					<MyCldUploadWidget
						label="Agrega la imagen de la lección"
						setResource={handleImageChange}
						resourceType="image"
						resource={lessonData.image as string}
					/>
					<MyCldUploadWidget
						label="Agrega el video de la lección"
						setResource={handleVideoChange}
						resourceType="video"
						resource={lessonData.contentLink as string}
					/>
					<MyCldUploadWidget
						label="Agrega recursos adicionales (opcional)"
						setResource={handleResourcesChange}
						resourceType="raw"
						resource={lessonData.additionalResources?.[0] as string}
					/>
					{/* Cloudinary */}
					<div className="flex w-full justify-end">
						<Button
							type="button"
							variant="tertiary"
							onClick={() => setShowModuleForm(false)}
						>
							Cancelar
						</Button>
						<Button type="button" variant="secondary" onClick={handleAddLesson}>
							Agregar
						</Button>
					</div>
				</div>
			)}
		</>
	)
}
