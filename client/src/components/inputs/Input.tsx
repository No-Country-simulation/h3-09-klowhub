import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

export default function Input({ label, ...props }: InputProps) {
	return (
		<label className="flex flex-col gap-6">
			{label && <span className="text-sm font-semibold">{label}</span>}
			<input
				{...props}
				className={`h-11 rounded-lg border border-[#E5E7EB] px-3 text-black ${props.className}`}
			/>
		</label>
	)
}
