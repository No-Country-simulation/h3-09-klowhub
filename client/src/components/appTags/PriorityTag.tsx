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
					'border-app_tags-priority-high-text bg-app_tags-priority-high-bg text-app_tags-priority-high-text':
						priority === 'high',
					'border-app_tags-priority-medium-text bg-app_tags-priority-medium-bg text-app_tags-priority-medium-text':
						priority === 'medium',
					'border-app_tags-priority-low-text bg-app_tags-priority-low-bg text-app_tags-priority-low-text':
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
