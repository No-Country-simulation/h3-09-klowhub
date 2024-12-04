'use client'
import Button from '@/components/buttons/Button'
import Input from '@/components/inputs/Input'
import TextArea from '@/components/inputs/TextArea'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function AddModule() {
	const [showModuleForm, setShowModuleForm] = useState(false)

	const handleAddModuleClick = () => {
		setShowModuleForm(true)
	}

	return (
		<>
			{!showModuleForm ? (
				<div
					role="button"
					onClick={handleAddModuleClick}
					className="flex w-full items-center justify-center gap-6 rounded-2xl border border-dashed border-primary-b-300 bg-white/10 p-10 hover:text-primary-b-300 active:text-primary-b-600"
				>
					<Plus size={32} />
					<p>Agregar módulo</p>
				</div>
			) : (
				<div className="flex flex-col gap-6 rounded-lg bg-white/10 p-6">
					<Input
						label="Título del módulo"
						placeholder="Agrega un nombre para el módulo "
					/>
					<TextArea
						label="Descripción"
						placeholder="Escribe una descripción básica del módulo"
					/>
					<div className="flex w-full justify-end">
						<Button type="button" variant="secondary">
							Agregar
						</Button>
					</div>
				</div>
			)}
		</>
	)
}
