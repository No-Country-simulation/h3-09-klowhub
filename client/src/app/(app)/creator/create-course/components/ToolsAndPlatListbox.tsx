import MyListbox from '@/components/inputs/MyListbox'
import { toolsAndPlatforms } from '@/constants/filters.constant'
import { Course } from '@/models/course.model'
import { Option } from '@/models/option.model'
import { Control, Controller } from 'react-hook-form'

interface ToolsAndPlatListboxProps {
	control: Control<Course>
}

export default function ToolsAndPlatListbox({
	control
}: ToolsAndPlatListboxProps) {
	const options: Option[] = Object.entries(toolsAndPlatforms).map(
		([key, value]): Option => {
			return {
				label: value,
				value: key
			}
		}
	)
	return (
		<Controller
			name="toolsAndPlatforms"
			control={control}
			defaultValue={[]}
			rules={{ required: true }}
			render={({ field }) => (
				<MyListbox
					label="Herramientas y plataformas"
					options={options}
					value={field.value}
					onChange={field.onChange}
					multiple={true}
				/>
			)}
		/>
	)
}
