'use client'
import Button from '@/components/buttons/Button'
import Input from '@/components/inputs/Input'
import TextArea from '@/components/inputs/TextArea'
import { Module } from '@/models/course.model'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface AddModuleProps {
	onAdd: (module: Module) => void
}

export default function AddModule({ onAdd }: AddModuleProps) {
	const [showModuleForm, setShowModuleForm] = useState(false)
	const [moduleData, setModuleData] = useState<Module>({
		title: '',
		description: '',
		lessons: []
	})
	// const { handleSubmit, register, reset } = useForm<Module>()

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setModuleData((prev) => ({ ...prev, [name]: value }))
	}

	const handleAddModule = () => {
		onAdd(moduleData) // Enviar datos al padre
		setShowModuleForm(false)
		setModuleData({ title: '', description: '', lessons: [] })
	}

	return (
		<>
			{!showModuleForm ? (
				<div
					role="button"
					onClick={() => setShowModuleForm(true)}
					className="flex w-full items-center justify-center gap-6 rounded-2xl border border-dashed border-primary-b-300 bg-white/10 p-10 hover:text-primary-b-300 active:text-primary-b-600"
				>
					<Plus size={32} />
					<p>Agregar módulo</p>
				</div>
			) : (
				<div className="flex flex-col gap-6 rounded-lg bg-white/10 p-6">
					<Input
						name="title"
						label="Título del módulo"
						placeholder="Agrega un nombre para el módulo "
						value={moduleData.title}
						onChange={handleInputChange}
					/>
					<TextArea
						name="description"
						label="Descripción"
						placeholder="Escribe una descripción básica del módulo"
						value={moduleData.description}
						onChange={handleInputChange}
					/>
					<div className="flex w-full justify-end">
						<Button
							type="button"
							variant="tertiary"
							onClick={() => setShowModuleForm(false)}
						>
							Cancelar
						</Button>
						<Button type="button" variant="secondary" onClick={handleAddModule}>
							Agregar
						</Button>
					</div>
				</div>
			)}
		</>
	)
}
