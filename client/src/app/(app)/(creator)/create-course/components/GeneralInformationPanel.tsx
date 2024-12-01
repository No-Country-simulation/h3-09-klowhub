import Input from '@/components/inputs/Input'
import TextArea from '@/components/inputs/TextArea'
import { Course } from '@/models/course.model'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import ContentAccessInfo from './ContentAccessInfo'
import ContentTypeRadioGroup from './ContentTypeRadioGroup'
import CourseTypeRadioGroup from './CourseTypeRadioGroup'
import LevelRadioGroup from './LevelRadioGroup'
import PanelContainer from './PanelContainer'
import PlatformRadioGroup from './PlatformRadioGroup'

interface GeneralInformationPanelProps {
	nextStep: (data: object) => void
	handleSubmit: UseFormHandleSubmit<Course, undefined>
	register: UseFormRegister<Course>
}

export default function GeneralInformationPanel({
	nextStep,
	handleSubmit,
	register
}: GeneralInformationPanelProps) {
	return (
		<form onSubmit={handleSubmit(nextStep)}>
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
						<ContentTypeRadioGroup register={register} />
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
				</div>
				<div className="w-80"></div>
			</PanelContainer>
		</form>
	)
}
