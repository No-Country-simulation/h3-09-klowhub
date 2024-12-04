import MyListbox from '@/components/inputs/MyListbox'
import { Course } from '@/models/course.model'
import { Control, Controller } from 'react-hook-form'

interface FunctionalitiesListboxProps {
	control: Control<Course>
}

export default function FunctionalitiesListbox({
	control
}: FunctionalitiesListboxProps) {
	return (
		<Controller
			name="functionalities"
			control={control}
			defaultValue={[]}
			rules={{ required: true }}
			render={({ field }) => (
				<MyListbox
					label="Funcionalidades"
					options={[
						{ value: 'apis', label: 'APIs' },
						{ value: 'automation', label: 'Automatización' },
						{ value: 'dinamic-forms', label: 'Formularios dinámicos' }
					]}
					value={field.value}
					onChange={field.onChange}
					multiple={true}
				/>
			)}
		/>
	)
}
