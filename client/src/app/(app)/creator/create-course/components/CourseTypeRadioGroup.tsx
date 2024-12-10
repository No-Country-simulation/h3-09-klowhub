import RadioGroup, { Option } from '@/components/inputs/RadioGroup'
import { courseTypes } from '@/constants/filters.constant'
import { Course } from '@/models/course.model'
import { UseFormRegister } from 'react-hook-form'

interface CourseTypeRadioGroupProps {
	register: UseFormRegister<Course>
}

export default function CourseTypeRadioGroup({
	register
}: CourseTypeRadioGroupProps) {
	const options: Option[] = Object.entries(courseTypes).map(
		([key, value]): Option => {
			return {
				label: value,
				value: key
			}
		}
	)
	return (
		<section className="flex w-1/2 flex-col gap-6">
			<h6 className="text-sm font-semibold">
				Seleccioná si vas a crear un curso o una lección.
			</h6>
			<RadioGroup
				options={options}
				{...register('courseType', { required: true })}
			/>
		</section>
	)
}
