'use client'
import Image from 'next/image'
import { ChangeEvent, InputHTMLAttributes } from 'react'

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	accept?: string
	onFileChange?: (files: FileList | null) => void
	files?: FileList
}
export default function FileInput({
	label,
	accept = 'image/*',
	onFileChange,
	files,
	...props
}: FileInputProps) {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (onFileChange) {
			onFileChange(files)
		}
		if (props.onChange) {
			props.onChange(event)
		}
	}

	return (
		<div className={`flex flex-col space-y-6`}>
			{label && (
				<label className="text-sm font-semibold text-white">{label}</label>
			)}
			{files && (
				<Image
					src={URL.createObjectURL(files[0])}
					alt="preview"
					width={500}
					height={500}
					className="h-40 w-fit object-scale-down"
				/>
			)}
			<input
				type="file"
				accept={accept}
				onChange={handleChange}
				className="block w-1/2 cursor-pointer rounded-lg border border-primary-b-300 bg-white/10 text-sm text-primary-b-300 focus:outline-none focus:ring-2 focus:ring-primary-b-300"
				{...props}
			/>
		</div>
	)
}
