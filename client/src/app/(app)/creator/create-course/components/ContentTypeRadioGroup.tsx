import Input from '@/components/inputs/Input'
import RadioGroup, { Option } from '@/components/inputs/RadioGroup'
import { Course } from '@/models/course.model'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'

interface ContentTypeRadioGroupProps {
	register: UseFormRegister<Course>
	watch: UseFormWatch<Course>
}

export default function ContentTypeRadioGroup({
	register,
	watch
}: ContentTypeRadioGroupProps) {
	const contentTypeOptions: Option[] = [
		{ value: 'free', label: 'Gratuito' },
		{ value: 'paid', label: 'Pago' }
	]

	const selectedContentType = watch('contentType')

	return (
		<section className="flex w-1/2 flex-col gap-6">
			<h6 className="text-sm font-semibold">
				¿Qué tipo de contenido estás buscando: gratuito o premium?
			</h6>
			<RadioGroup
				options={contentTypeOptions}
				{...register('contentType', { required: true })}
			/>
			{selectedContentType === 'paid' && (
				<Input
					label="Precio"
					type="number"
					className="w-1/2"
					placeholder="Ej: 1000"
					{...register('price', { required: true })}
				/>
			)}
		</section>
	)
}
