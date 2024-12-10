import React from 'react'

interface Metrics {
	quantity: number
	label: string
}

export default function MetricTag({ quantity, label }: Metrics) {
	return (
		<div className="flex w-fit items-baseline gap-1 py-2">
			<p className="text-xl font-bold text-primary-b-200">{quantity}</p>
			<p className="text-sm font-bold">{label}</p>
		</div>
	)
}
