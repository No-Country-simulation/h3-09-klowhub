import { Check } from 'lucide-react'
import React from 'react'

interface Props {
	item: string | string[]
}

export default function CheckedList({ item }: Props) {
	const items = Array.isArray(item) ? item : [item]

	return (
		<ul className="w-full">
			{items.map((item, index) => {
				return (
					<li key={index} className="mb-4 flex items-center gap-6">
						<Check />
						<span className="text-[14px]">{item}</span>
					</li>
				)
			})}
		</ul>
	)
}
