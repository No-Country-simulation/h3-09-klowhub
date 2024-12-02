import MyListbox from '@/components/inputs/MyListbox'
import { Course } from '@/models/course.model'
import { Control, Controller } from 'react-hook-form'

interface TagsListboxProps {
	control: Control<Course>
}

;['Automatización', 'No Code', 'AppSheet']
export default function TagsListbox({ control }: TagsListboxProps) {
	return (
		<Controller
			name="relatedTags"
			control={control}
			defaultValue={[]}
			rules={{ required: true }}
			render={({ field }) => (
				<MyListbox
					label="Agrega etiquetas relacionadas"
					options={[
						{ value: 'automation', label: 'Automatización' },
						{ value: 'no-code', label: 'No Code' },
						{ value: 'appsheet', label: 'AppSheet' }
					]}
					value={field.value}
					onChange={field.onChange}
					multiple={true}
				/>
			)}
		/>
	)
}
