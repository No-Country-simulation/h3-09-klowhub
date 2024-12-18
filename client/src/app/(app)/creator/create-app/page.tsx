'use client'
import {
	appAdapter,
	resourceAdapter
} from '@/adapters/create-app.adapter'
import TabListAndPanels from '@/components/Tabs/TabListAndPanels'
import { App } from '@/models/app.model'
import {
	createApp,
	createResource
} from '@/services/apps.service'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import GeneralInformationPanel from './components/GeneralInfoPanel'
import MultimediaPanel from './components/MultimediaPanel'

const initialAppState: App = {
	id: '',
	title: '',
	shortDescription: '',
	price: 0,
	platform: 'POWERAPPS',
	language: '',
	sector: '',
	toolsAndPlatforms: [],
	functionalities: [],
	relatedTags: [],
	image: '',
	reviews: [],
	targetAudience: '',
	benefits: [],
	additionalMedia: [],
	detailedDescription: '',
	links: {
		mobile: '',
		desktop: ''
	}
}

export default function CreateAppPage() {
	const [tabValue, setTabValue] = useState(1)
	const [formData, setFormData] = useState<App>(initialAppState)
	const [resources, setResources] = useState<string[]>([])

	const { register, handleSubmit, control } = useForm<App>()
	const router = useRouter()

	// Función para pasar al siguiente paso
	const nextStep = (data: Partial<App>) => {
		setFormData((prevData) => ({ ...prevData, ...data }))
		setTabValue(tabValue + 1)
	}

	// Publicar recursos (ej. imágenes o archivos multimedia)
	const postResources = async (appId: string) => {
		const adaptedResources = resources.map((resource) =>
			resourceAdapter(resource, appId)
		)
		for (const adaptedResource of adaptedResources) {
			await createResource(adaptedResource)
		}
	}

	// Publicar la app final
	const postApp = async (finalData: App) => {
		try {
			const adaptedApp = appAdapter(finalData)
			const createdApp = await createApp(adaptedApp)
			if (createdApp.id) {
				await postResources(createdApp.id)
				router.push('/creator/my-apps')
			} else {
				throw new Error('No se pudo crear la app')
			}
		} catch (error) {
			console.error('Error al crear la app:', error)
		}
	}

	// Función principal de submit
	const onSubmit = async (data: App) => {
		const finalData = { ...formData, ...data }
		await postApp(finalData)
	}

	const labels = ['Información general', 'Multimedia y recursos']
	const panels = [
		<GeneralInformationPanel key='general' nextStep={nextStep} />,
		<MultimediaPanel
			key='multimedia'
			setResources={setResources}
			handleSubmit={handleSubmit(onSubmit)}
		/>
	]

	return (
		<TabListAndPanels
			labels={labels}
			panels={panels}
			tabValue={tabValue}
			setTabValue={setTabValue}
		/>
	)
}
