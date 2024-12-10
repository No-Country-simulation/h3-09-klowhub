import MyListbox from '@/components/inputs/MyListbox'
import { functionalities } from '@/constants/filters.constant'
import { Course } from '@/models/course.model'
import { Option } from '@/models/option.model'
import { Control, Controller } from 'react-hook-form'

interface FunctionalitiesListboxProps {
	control: Control<Course>
}

export default function FunctionalitiesListbox({
	control
}: FunctionalitiesListboxProps) {
	const options: Option[] = Object.entries(functionalities).map(
		([key, value]): Option => {
			return {
				label: value,
				value: key
			}
		}
	)
	return (
		<Controller
			name="functionalities"
			control={control}
			defaultValue={[]}
			rules={{ required: true }}
			render={({ field }) => (
				<MyListbox
					label="Funcionalidades"
					options={options}
					value={field.value}
					onChange={field.onChange}
					multiple={true}
				/>
			)}
		/>
	)
}
