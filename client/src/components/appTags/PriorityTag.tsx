import { priorityTags } from '@/constants/tags.constant'
import clsx from 'clsx'
import { Circle } from 'lucide-react'

type Priority = keyof typeof priorityTags

interface PriorityTagProps {
	priority: Priority
}

export default function PriorityTag({ priority }: PriorityTagProps) {
	return (
		<article
			className={clsx(
				'flex h-8 w-fit items-center justify-center gap-2 rounded-xl border px-2',
				{
					'bg-app_tags-priority-high-bg text-app_tags-priority-high-text border-app_tags-priority-high-text':
						priority === 'high',
					'bg-app_tags-priority-medium-bg text-app_tags-priority-medium-text border-app_tags-priority-medium-text':
						priority === 'medium',
					'bg-app_tags-priority-low-bg text-app_tags-priority-low-text border-app_tags-priority-low-text':
						priority === 'low'
				}
			)}
		>
			<Circle
				size={12}
				fill={clsx({
					'#FF0000': priority === 'high',
					'#FFB800': priority === 'medium',
					'#07C30E': priority === 'low'
				})}
			/>
			<span className="text-xs font-medium">{priorityTags[priority]}</span>
		</article>
	)
}
