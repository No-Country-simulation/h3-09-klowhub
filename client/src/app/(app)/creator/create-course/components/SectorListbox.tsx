import MyListbox from '@/components/inputs/MyListbox'
import { Course } from '@/models/course.model'
import { Control, Controller } from 'react-hook-form'

interface SectorListboxProps {
	control: Control<Course>
}

export default function SectorListbox({ control }: SectorListboxProps) {
	return (
		<Controller
			name="sector"
			control={control}
			defaultValue=""
			rules={{ required: true }}
			render={({ field }) => (
				<MyListbox
					label="Elige el sector al que deseas dirigir tu curso"
					options={[
						{ value: 'sales-and-crm', label: 'Ventas y CRM' },
						{ value: 'finance', label: 'Finanzas y Contabilidad' }
					]}
					value={field.value}
					onChange={field.onChange}
					multiple={false}
				/>
			)}
		/>
	)
}
