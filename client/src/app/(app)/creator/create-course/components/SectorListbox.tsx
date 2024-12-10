import MyListbox from '@/components/inputs/MyListbox'
import { sector } from '@/constants/filters.constant'
import { Course } from '@/models/course.model'
import { Option } from '@/models/option.model'
import { Control, Controller } from 'react-hook-form'

interface SectorListboxProps {
	control: Control<Course>
}

export default function SectorListbox({ control }: SectorListboxProps) {
	const options: Option[] = Object.entries(sector).map(
		([key, value]): Option => {
			return {
				label: value,
				value: key
			}
		}
	)
	return (
		<Controller
			name="sector"
			control={control}
			defaultValue=""
			rules={{ required: true }}
			render={({ field }) => (
				<MyListbox
					label="Elige el sector al que deseas dirigir tu curso"
					options={options}
					value={field.value}
					onChange={field.onChange}
					multiple={false}
				/>
			)}
		/>
	)
}
