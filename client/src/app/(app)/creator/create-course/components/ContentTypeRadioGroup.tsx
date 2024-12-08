import Input from '@/components/inputs/Input'
import RadioGroup, { Option } from '@/components/inputs/RadioGroup'
import { contentTypes } from '@/constants/filters.constant'
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
	const options: Option[] = Object.entries(contentTypes).map(
		([key, value]): Option => {
			return {
				label: value,
				value: key
			}
		}
	)

	const selectedContentType = watch('contentType')

	return (
		<section className="flex w-1/2 flex-col gap-6">
			<h6 className="text-sm font-semibold">
				¿Qué tipo de contenido estás buscando: gratuito o premium?
			</h6>
			<RadioGroup
				options={options}
				{...register('contentType', { required: true })}
			/>
			{selectedContentType === 'PAID' && (
				<Input
					label="Precio"
					type="number"
					step="0.01"
					className="w-1/2"
					placeholder="Ej: 1000"
					{...register('price', { required: true })}
				/>
			)}
		</section>
	)
}
