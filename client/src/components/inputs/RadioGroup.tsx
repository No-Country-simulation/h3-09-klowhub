import { InputHTMLAttributes } from 'react'

export interface Option {
	value: string
	label: string
}

interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
	name?: string
	options: Option[]
	className?: string
}

export default function RadioGroup({
	name,
	options,
	className,
	...props
}: RadioGroupProps) {
	return (
		<div className={`flex flex-col gap-3 ${className}`}>
			{options.map((option) => (
				<label key={option.value} className="flex items-center gap-4">
					<input type="radio" name={name} value={option.value} {...props} />
					<span className="text-sm">{option.label}</span>
				</label>
			))}
		</div>
	)
}
