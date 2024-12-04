import MyListbox from '@/components/inputs/MyListbox'
import { Course } from '@/models/course.model'
import { Control, Controller } from 'react-hook-form'

interface LanguageListboxProps {
	control: Control<Course>
}

export default function LanguageListbox({ control }: LanguageListboxProps) {
	return (
		<Controller
			name="language"
			control={control}
			defaultValue=""
			rules={{ required: true }}
			render={({ field }) => (
				<MyListbox
					label="Elige el idioma del curso"
					options={[
						{ value: 'spanish', label: 'Español' },
						{ value: 'english', label: 'Inglés' }
					]}
					value={field.value}
					onChange={field.onChange}
					multiple={false}
				/>
			)}
		/>
	)
}
