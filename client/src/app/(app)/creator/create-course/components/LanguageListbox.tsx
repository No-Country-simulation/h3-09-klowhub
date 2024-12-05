import MyListbox from '@/components/inputs/MyListbox'
import { language } from '@/constants/filters.constant'
import { Course } from '@/models/course.model'
import { Option } from '@/models/option.model'
import { Control, Controller } from 'react-hook-form'

interface LanguageListboxProps {
	control: Control<Course>
}

export default function LanguageListbox({ control }: LanguageListboxProps) {
	const options: Option[] = Object.entries(language).map(
		([key, value]): Option => {
			return {
				label: value,
				value: key
			}
		}
	)
	return (
		<Controller
			name="language"
			control={control}
			defaultValue=""
			rules={{ required: true }}
			render={({ field }) => (
				<MyListbox
					label="Elige el idioma del curso"
					options={options}
					value={field.value}
					onChange={field.onChange}
					multiple={false}
				/>
			)}
		/>
	)
}
