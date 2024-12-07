import RadioGroup, { Option } from '@/components/inputs/RadioGroup'
import { Course } from '@/models/course.model'
import { UseFormRegister } from 'react-hook-form'

interface PlatformRadioGroupProps {
	register: UseFormRegister<Course>
}
export default function PlatformRadioGroup({
	register
}: PlatformRadioGroupProps) {
	const platformOptions: Option[] = [
		{ value: 'appsheet', label: 'AppSheet' },
		{ value: 'powerapps', label: 'PowerApps' }
	]
	return (
		<section className="flex w-1/2 flex-col gap-6">
			<h6 className="text-sm font-semibold">Plataforma</h6>
			<RadioGroup
				options={platformOptions}
				{...register('platform', { required: true })}
			/>
		</section>
	)
}
