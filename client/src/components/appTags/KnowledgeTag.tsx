import { knowledgeTags } from '@/constants/tags.constant'
import clsx from 'clsx'

type Knowledge = keyof typeof knowledgeTags

interface KnowledgeTagProps {
	knowledge: Knowledge
}

export default function KnowledgeTag({ knowledge }: KnowledgeTagProps) {
	return (
		<article
			className={clsx(
				'flex h-10 w-fit items-center justify-center gap-1 rounded-lg px-2',
				{
					'bg-app_tags-knowledge-design-bg text-app_tags-knowledge-design-text':
						knowledge === 'design',
					'bg-app_tags-knowledge-appsheet-bg text-app_tags-knowledge-appsheet-text':
						knowledge === 'appsheet',
					'bg-app_tags-knowledge-product-bg text-app_tags-knowledge-product-text':
						knowledge === 'product'
				}
			)}
		>
			<span className="text-sm font-semibold">{knowledgeTags[knowledge]}</span>
		</article>
	)
}
