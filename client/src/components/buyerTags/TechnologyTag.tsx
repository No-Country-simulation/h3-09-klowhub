import { platforms } from '@/constants/filters.constant'
import clsx from 'clsx'
import Image from 'next/image'

export type Technology = (typeof platforms)[keyof typeof platforms]

interface TechnologyTagProps {
	technology: Technology
	size?: 'l' | 'xl'
}

export default function TechnologyTag({
	technology,
	size = 'l'
}: TechnologyTagProps) {
	const tech = technology.toLowerCase()
	const technologyData = {
		icon: `/svg/${tech}.svg`,
		name: technology
	}

	return (
		<article
			className={clsx('flex items-center gap-3 rounded-lg bg-white/10 px-3', {
				'h-[37px] w-[144px]': size === 'l',
				'h-[60px] w-[170px]': size === 'xl'
			})}
		>
			<Image
				src={technologyData.icon}
				alt={'Etiqueta de tecnología'}
				width={size === 'l' ? 44 : 50}
				height={size === 'l' ? 44 : 50}
				className={clsx({
					'h-[22px] w-auto': size === 'l',
					'h-[50px] w-auto': size === 'xl'
				})}
			/>
			<p
				className={clsx('font-semibold', {
					'text-xs': size === 'l',
					'text-sm': size === 'xl'
				})}
			>
				{technologyData.name}
			</p>
		</article>
	)
}
