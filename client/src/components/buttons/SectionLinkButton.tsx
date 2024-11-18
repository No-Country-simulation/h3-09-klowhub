import clsx from 'clsx'
import Link from 'next/link'

type Section = 'learn' | 'appstore' | 'projects' | 'consultancy'

interface SectionLinkButtonProps {
	section: Section
}

export default function SectionLinkButton({ section }: SectionLinkButtonProps) {
	const sectionData = (section: Section) => {
		switch (section) {
			case 'learn':
				return {
					href: '/learn',
					text: 'Aprende en KlowHub'
				}
			case 'appstore':
				return {
					href: '/appstore',
					text: 'Encuentra aplicaciones'
				}
			case 'projects':
				return {
					href: '/projects',
					text: 'Publica proyectos'
				}
			case 'consultancy':
				return {
					href: '/consultancy',
					text: 'Consultas técnicas'
				}
		}
	}

	return (
		<Link
			href={sectionData(section).href}
			className={clsx(
				'relative flex h-24 w-[333.75px] items-center justify-center rounded-xl bg-section-button text-xl font-bold text-white',
				{
					'bg-cover bg-left': section === 'learn',
					'bg-contain': section === 'appstore',
					'bg-cover bg-right': section === 'projects',
					'bg-auto': section === 'consultancy'
				}
			)}
		>
			<div className="absolute size-full rounded-xl bg-black opacity-40 hover:bg-white hover:opacity-20" />
			<p className="pointer-events-none z-10">{sectionData(section).text}</p>
		</Link>
	)
}
