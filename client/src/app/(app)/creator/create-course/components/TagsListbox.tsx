import MyListbox from '@/components/inputs/MyListbox'
import { relatedTags } from '@/constants/filters.constant'
import { Course } from '@/models/course.model'
import { Option } from '@/models/option.model'
import { Control, Controller } from 'react-hook-form'

interface TagsListboxProps {
	control: Control<Course>
}

;['Automatización', 'No Code', 'AppSheet']
export default function TagsListbox({ control }: TagsListboxProps) {
	const options: Option[] = Object.entries(relatedTags).map(
		([key, value]): Option => {
			return {
				label: value,
				value: key
			}
		}
	)
	return (
		<Controller
			name="relatedTags"
			control={control}
			defaultValue={[]}
			rules={{ required: true }}
			render={({ field }) => (
				<MyListbox
					label="Agrega etiquetas relacionadas"
					options={options}
					value={field.value}
					onChange={field.onChange}
					multiple={true}
				/>
			)}
		/>
	)
}
