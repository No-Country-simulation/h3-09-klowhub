import SectionLinkButton from '@/components/buttons/SectionLinkButton'
import { sections } from '@/constants/sections.constant'

export default function SectionsLinkButtons() {
	return (
		<section className="flex justify-between">
			{Object.keys(sections).map((section: string) => (
				<SectionLinkButton
					key={section}
					section={section as keyof typeof sections}
				/>
			))}
		</section>
	)
}
