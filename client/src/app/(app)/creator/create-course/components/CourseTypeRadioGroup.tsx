import RadioGroup, { Option } from '@/components/inputs/RadioGroup'
import { Course } from '@/models/course.model'
import { UseFormRegister } from 'react-hook-form'

interface CourseTypeRadioGroupProps {
	register: UseFormRegister<Course>
}

export default function CourseTypeRadioGroup({
	register
}: CourseTypeRadioGroupProps) {
	const courseTypeOptions: Option[] = [
		{ value: 'course', label: 'Curso' },
		{ value: 'lesson', label: 'Lección' }
	]
	return (
		<section className="flex w-1/2 flex-col gap-6">
			<h6 className="text-sm font-semibold">
				Seleccioná si vas a crear un curso o una lección.
			</h6>
			<RadioGroup
				options={courseTypeOptions}
				{...register('courseType', { required: true })}
			/>
		</section>
	)
}
