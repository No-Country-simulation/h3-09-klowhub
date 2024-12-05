import MyListbox from '@/components/inputs/MyListbox'
import { Course } from '@/models/course.model'
import { Control, Controller } from 'react-hook-form'

interface ToolsAndPlatListboxProps {
	control: Control<Course>
}

export default function ToolsAndPlatListbox({
	control
}: ToolsAndPlatListboxProps) {
	return (
		<Controller
			name="toolsAndPlatforms"
			control={control}
			defaultValue={[]}
			rules={{ required: true }}
			render={({ field }) => (
				<MyListbox
					label="Herramientas y plataformas"
					options={[
						{ value: 'appsheet', label: 'AppSheet' },
						{ value: 'powerapps', label: 'PowerApps' },
						{ value: 'bubble', label: 'BubbleIO' }
					]}
					value={field.value}
					onChange={field.onChange}
					multiple={true}
				/>
			)}
		/>
	)
}
