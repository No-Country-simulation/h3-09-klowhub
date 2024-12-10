import React from 'react'
import GlobalStat from './GlobalStat'
import Button from '@/components/buttons/Button'

interface GlobalStatsListProps {
	stats: { title:string, value:string | number}[]
}

export default function GlobalStatsList({stats}:GlobalStatsListProps) {
	return (
		<div className='grid grid-cols-1 gap-2 rounded-lg'>
			{stats.map((stat,index) => (
				<GlobalStat key={index} title={stat.title} value={stat.value}/>
			))}
			<Button variant='tertiary'>Ver ganancias</Button>
		</div>
	)
}
