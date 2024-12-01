import { Controller } from 'react-hook-form'

interface Option {
	value: string
	label: string
}

interface RadioGroupProps {
	name: string
	options: Option[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: any
	className: string
}

export default function RadioGroup({
	name,
	options,
	control,
	className
}: RadioGroupProps) {
	return (
		<div className={`flex flex-col ${className}`}>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<>
						{options.map((option) => (
							<label key={option.value} className="flex items-center">
								<input
									type="radio"
									value={option.value}
									checked={field.value === option.value}
									onChange={(e) => field.onChange(e.target.value)}
								/>
								<span>{option.label}</span>
							</label>
						))}
					</>
				)}
			/>
		</div>
	)
}
