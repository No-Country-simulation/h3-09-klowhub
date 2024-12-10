'use client'
import { Course } from '@/models/course.model'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import Image from 'next/image'
import { UseFormSetValue } from 'react-hook-form'
import Button from '../buttons/Button'

export type ResourceType = 'image' | 'video' | 'raw'

interface MyCldUploadWidgetProps {
	label: string
	setFormValue?: UseFormSetValue<Course>
	formField?: keyof Course
	setResource?: (resource: string) => void
	resource?: string
	resourceType?: ResourceType
}

export default function MyCldUploadWidget({
	label,
	setFormValue,
	formField,
	setResource,
	resource,
	resourceType
}: MyCldUploadWidgetProps) {
	const handleRemoveResource = async () => {
		if (!resource) return

		const fileName = resource.split('/').pop()?.split('.')[0]
		if (!fileName) {
			console.error('Invalid resource URL format')
			return
		}

		const publicId = `klowhub/${fileName}`
		try {
			const response = await fetch('/api/cloudinary/delete-image', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ publicId })
			})
			if (!response.ok) {
				throw new Error('Failed to delete resource from Cloudinary')
			}
			setFormValue?.(formField as keyof Course, '')
			setResource?.('')
		} catch (error) {
			console.error('Error deleting resource from Cloudinary:', error)
		}
	}

	const renderPreview = () => {
		if (!resource) return null

		switch (resourceType) {
			case 'image':
				return (
					<Image
						src={resource}
						alt="preview"
						width={500}
						height={500}
						className="h-40 w-fit rounded-lg object-scale-down"
					/>
				)
			case 'video':
				return (
					<video key={resource} controls className="h-40 w-fit rounded-lg">
						<source src={resource} type="video/mp4" />
					</video>
				)
			case 'raw':
				return (
					<iframe
						src={resource}
						width={500}
						height={500}
						className="h-40 w-fit rounded-lg object-scale-down"
					/>
				)
			default:
				return null
		}
	}

	return (
		<div className="flex-col space-y-6">
			<p className="text-sm font-semibold text-white">{label}</p>
			<CldUploadWidget
				options={{
					folder: 'klowhub',
					resourceType,
					multiple: false
				}}
				signatureEndpoint="/api/cloudinary/sign-image"
				onSuccess={(result) => {
					const uploadedInfo = result?.info as CloudinaryUploadWidgetInfo
					if (uploadedInfo?.secure_url) {
						setFormValue?.(formField as keyof Course, uploadedInfo.secure_url)
						setResource?.(uploadedInfo.secure_url)
					}
				}}
				onQueuesEnd={(result, { widget }) => {
					widget.close()
				}}
			>
				{({ open }) => {
					const handleOnClick = () => {
						handleRemoveResource()
						open()
					}
					return (
						<>
							{resource && (
								<div className="flex items-center space-x-4">
									{renderPreview()}
									<Button
										type="button"
										variant="tertiary"
										size="l"
										onClick={handleRemoveResource}
									>
										Remover
									</Button>
								</div>
							)}
							<Button type="button" onClick={handleOnClick}>
								Seleccionar archivo
							</Button>
						</>
					)
				}}
			</CldUploadWidget>
		</div>
	)
}
