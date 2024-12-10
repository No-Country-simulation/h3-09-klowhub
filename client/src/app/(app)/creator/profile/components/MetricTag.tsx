import React from 'react'

interface Metrics {
	quantity: number
	label: string
}

export default function MetricTag({ quantity, label }: Metrics) {
	return (
		<div className='flex items-baseline w-fit py-2 gap-1'>
			<p className='text-primary-b-200 text-xl font-bold'>{quantity}</p>
			<p className='text-sm font-bold'>{label}</p>
		</div>
	)
}
