import RadioGroup, { Option } from '@/components/inputs/RadioGroup'
import { Course } from '@/models/course.model'
import { UseFormRegister } from 'react-hook-form'

interface ContentTypeRadioGroupProps {
	register: UseFormRegister<Course>
}

export default function ContentTypeRadioGroup({
	register
}: ContentTypeRadioGroupProps) {
	const contentTypeOptions: Option[] = [
		{ value: 'free', label: 'Gratuito' },
		{ value: 'paid', label: 'Pago' }
	]
	return (
		<section className="flex w-1/2 flex-col gap-6">
			<h6 className="text-sm font-semibold">
				¿Qué tipo de contenido estás buscando: gratuito o premium?
			</h6>
			<RadioGroup
				options={contentTypeOptions}
				{...register('contentType', { required: true })}
			/>
		</section>
	)
}
