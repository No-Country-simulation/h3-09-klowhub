import { sections } from '@/constants/creator.sections.constant'
import CreatorSectionLinkBtn from './CreatorSectionLinkBtn'

export default function CreatorSectLinkBtns() {
	return (
		<section className="flex justify-between">
			{Object.keys(sections).map((section: string) => (
				<CreatorSectionLinkBtn
					key={section}
					section={section as keyof typeof sections}
				/>
			))}
		</section>
	)
}
