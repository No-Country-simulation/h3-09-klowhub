import RadioGroup, { Option } from '@/components/inputs/RadioGroup'
import { levels } from '@/constants/filters.constant'
import { Course } from '@/models/course.model'
import { UseFormRegister } from 'react-hook-form'

interface LevelRadioGroupProps {
	register: UseFormRegister<Course>
}
export default function LevelRadioGroup({ register }: LevelRadioGroupProps) {
	const options: Option[] = Object.entries(levels).map(
		([key, value]): Option => {
			return {
				label: value,
				value: key
			}
		}
	)

	return (
		<section className="flex w-1/2 flex-col gap-6">
			<h6 className="text-sm font-semibold">Nivel de competencia</h6>
			<RadioGroup
				options={options}
				{...register('level', { required: true })}
			/>
		</section>
	)
}
