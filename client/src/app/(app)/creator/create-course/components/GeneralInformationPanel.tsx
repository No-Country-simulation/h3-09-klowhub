import Button from '@/components/buttons/Button'
import Input from '@/components/inputs/Input'
import TextArea from '@/components/inputs/TextArea'
import { Course } from '@/models/course.model'
import {
	Control,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormWatch
} from 'react-hook-form'
import ContentAccessInfo from './ContentAccessInfo'
import ContentTypeRadioGroup from './ContentTypeRadioGroup'
import CourseTypeRadioGroup from './CourseTypeRadioGroup'
import FunctionalitiesListbox from './FunctionalitiesListbox'
import LanguageListbox from './LanguageListbox'
import LevelRadioGroup from './LevelRadioGroup'
import PanelContainer from './PanelContainer'
import PlatformRadioGroup from './PlatformRadioGroup'
import SectorListbox from './SectorListbox'
import TagsListbox from './TagsListbox'
import ToolsAndPlatListbox from './ToolsAndPlatListbox'

interface GeneralInformationPanelProps {
	nextStep: (data: object) => void
	handleSubmit: UseFormHandleSubmit<Course, undefined>
	register: UseFormRegister<Course>
	control: Control<Course, any>
	watch: UseFormWatch<Course>
}

export default function GeneralInformationPanel({
	nextStep,
	handleSubmit,
	register,
	control,
	watch
}: GeneralInformationPanelProps) {
	return (
		<form onSubmit={handleSubmit(nextStep)} className="flex flex-col gap-4">
			<PanelContainer className="flex">
				<div className="flex grow flex-col gap-12">
					<Input
						label="Título del curso/lección"
						placeholder="Nombrá tu curso o lección"
						className="w-96"
						{...register('title', { required: true })}
					/>

					<ContentAccessInfo />

					<div className="flex">
						<ContentTypeRadioGroup register={register} watch={watch} />
						<CourseTypeRadioGroup register={register} />
					</div>

					<section>
						<TextArea
							label="Contá de qué trata, en no más de 3 líneas."
							placeholder="Escribie una descripción básica del proyecto"
							{...register('shortDescription', { required: true })}
						/>
					</section>

					<div className="flex">
						<LevelRadioGroup register={register} />
						<PlatformRadioGroup register={register} />
					</div>

					<div className="flex gap-2 xl:gap-40">
						<div className="w-full">
							<LanguageListbox control={control} />
						</div>
						<div className="w-full">
							<SectorListbox control={control} />
						</div>
					</div>

					<div className="flex gap-2 xl:gap-40">
						<div className="w-full">
							<Input
								label="Define el contenido de tu curso"
								placeholder="Pilar de contenido"
								{...register('contentPillar', { required: true })}
							/>
						</div>
						<div className="w-full">
							<ToolsAndPlatListbox control={control} />
						</div>
					</div>

					<div className="flex gap-2 xl:gap-40">
						<div className="w-full">
							<FunctionalitiesListbox control={control} />
						</div>
						<div className="w-full">
							<TagsListbox control={control} />
						</div>
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
