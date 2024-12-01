import RadioGroup, { Option } from '@/components/inputs/RadioGroup'
import { Course } from '@/models/course.model'
import { UseFormRegister } from 'react-hook-form'

interface LevelRadioGroupProps {
	register: UseFormRegister<Course>
}
export default function LevelRadioGroup({ register }: LevelRadioGroupProps) {
	const levelOptions: Option[] = [
		{ value: 'basic', label: 'Básico' },
		{ value: 'intermediate', label: 'Intermedio' },
		{ value: 'advanced', label: 'Avanzado' }
	]
	return (
		<section className="flex w-1/2 flex-col gap-6">
			<h6 className="text-sm font-semibold">Nivel de competencia</h6>
			<RadioGroup
				options={levelOptions}
				{...register('level', { required: true })}
			/>
		</section>
	)
}
