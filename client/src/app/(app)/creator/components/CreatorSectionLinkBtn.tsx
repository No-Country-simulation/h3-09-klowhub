import { sections } from '@/constants/creator.sections.constant'
import clsx from 'clsx'
import Link from 'next/link'

type Section = keyof typeof sections

interface SectionLinkButtonProps {
	section: Section
}

export default function CreatorSectionLinkBtn({ section }: SectionLinkButtonProps) {
	return (
		<Link
			href={sections[section].href}
			className={clsx(
				'relative flex h-24 w-56 items-center justify-center rounded-xl bg-section-button px-4 text-lg font-bold text-white xl:w-72 xl:text-xl 2xl:w-80',
				{
					'bg-cover bg-left': section === 'learn',
					'bg-contain': section === 'appstore',
					'bg-cover bg-right': section === 'projects',
					'bg-auto': section === 'consultancy'
				}
			)}
		>
			<div className="absolute size-full rounded-xl bg-black opacity-40 hover:bg-white hover:opacity-20" />
			<p className="pointer-events-none z-10 text-center">
				{sections[section].text}
			</p>
		</Link>
	)
}
