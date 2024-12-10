import RadioGroup, { Option } from '@/components/inputs/RadioGroup'
import { platforms } from '@/constants/filters.constant'
import { Course } from '@/models/course.model'
import { UseFormRegister } from 'react-hook-form'

interface PlatformRadioGroupProps {
	register: UseFormRegister<Course>
}
export default function PlatformRadioGroup({
	register
}: PlatformRadioGroupProps) {
	const options: Option[] = Object.entries(platforms).map(
		([key, value]): Option => {
			return {
				label: value,
				value: key
			}
		}
	)
	return (
		<section className="flex w-1/2 flex-col gap-6">
			<h6 className="text-sm font-semibold">Plataforma</h6>
			<RadioGroup
				options={options}
				{...register('platform', { required: true })}
			/>
		</section>
	)
}
