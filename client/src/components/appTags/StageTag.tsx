import { stageTags } from '@/constants/tags.constant'
import clsx from 'clsx'
import { CodeXml, PencilLine } from 'lucide-react'

type Stage = keyof typeof stageTags

interface StageTagProps {
	stage: Stage
}

export default function StageTag({ stage }: StageTagProps) {
	const icon = (status: Stage) => {
		switch (status) {
			case 'design':
				return <PencilLine size={12} />
			case 'development':
				return <CodeXml size={12} />
		}
	}
	return (
		<article
			className={clsx(
				'flex h-7 w-fit items-center justify-center gap-1 rounded-[4px] px-2',
				{
					'bg-app_tags-stage-design-bg text-app_tags-stage-design-text':
						stage === 'design',
					'bg-app_tags-stage-development-bg text-app_tags-stage-development-text':
						stage === 'development'
				}
			)}
		>
			{icon(stage)}
			<span className="text-sm font-bold">{stageTags[stage]}</span>
		</article>
	)
}
