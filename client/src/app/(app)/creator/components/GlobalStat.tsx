import React from 'react'

interface GlobalStatProps {
	title: string
	value: string | number
}

export default function GlobalStat({ title, value }: GlobalStatProps) {
	return (
		<div className='bg-white/10 rounded-md p-4 shadow-md text-center text-white w-full'>
			<h3 className='text-sm font-medium'>{title}</h3>
			<p className='text-xl font-bold text-primary-b-300 mt-2'>{value}</p>
		</div>
	)
}

