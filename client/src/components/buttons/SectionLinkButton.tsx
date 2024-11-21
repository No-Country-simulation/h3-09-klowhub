import { sections } from '@/constants/sections.constant'
import clsx from 'clsx'
import Link from 'next/link'

type Section = keyof typeof sections

interface SectionLinkButtonProps {
	section: Section
}

export default function SectionLinkButton({ section }: SectionLinkButtonProps) {
	return (
		<Link
			href={sections[section].href}
			className={clsx(
				'relative flex h-24 w-80 items-center justify-center rounded-xl bg-section-button text-xl font-bold text-white',
				{
					'bg-cover bg-left': section === 'learn',
					'bg-contain': section === 'appstore',
					'bg-cover bg-right': section === 'projects',
					'bg-auto': section === 'consultancy'
				}
			)}
		>
			<div className="absolute size-full rounded-xl bg-black opacity-40 hover:bg-white hover:opacity-20" />
			<p className="pointer-events-none z-10">{sections[section].text}</p>
		</Link>
	)
}
