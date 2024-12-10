import React from 'react'

interface GlobalStatProps {
	title: string
	value: string | number
}

export default function GlobalStat({ title, value }: GlobalStatProps) {
	return (
		<div className="w-full rounded-md bg-white/10 p-4 text-center text-white shadow-md">
			<h3 className="text-sm font-medium">{title}</h3>
			<p className="mt-2 text-xl font-bold text-primary-b-300">{value}</p>
		</div>
	)
}
