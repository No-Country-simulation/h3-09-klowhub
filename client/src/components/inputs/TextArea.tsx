import { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string
}

export default function TextArea({ label, ...props }: TextAreaProps) {
	return (
		<label className="flex flex-col gap-6">
			{label && <span className="text-sm font-semibold">{label}</span>}
			<textarea
				{...props}
				className={`h-40 rounded-lg border border-[#E5E7EB] px-3 text-black ${props.className}`}
			/>
		</label>
	)
}
