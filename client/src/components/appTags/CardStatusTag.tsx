import { cardStatusTags } from '@/constants/tags.constant'
import clsx from 'clsx'
import { CircleCheck, CircleEllipsis, Timer } from 'lucide-react'

type Status = keyof typeof cardStatusTags

interface CardStatusTagProps {
	status: Status
}

export default function CardStatusTag({ status }: CardStatusTagProps) {
	const icon = (status: Status) => {
		switch (status) {
			case 'finished':
			case 'published':
			case 'solved':
				return <CircleCheck size={16} />
			case 'inProgress':
				return <CircleEllipsis size={16} />
			case 'notStarted':
			case 'pending':
				return <Timer size={16} />
		}
	}
	return (
		<article
			className={clsx(
				'flex h-8 w-fit items-center justify-center gap-1 rounded-xl border px-2',
				{
					'border-app_tags-status-card-success-text bg-app_tags-status-card-success-bg text-app_tags-status-card-success-text':
						status === 'finished' ||
						status === 'solved' ||
						status === 'published',
					'border-app_tags-status-card-inProgress-text bg-app_tags-status-card-inProgress-bg text-app_tags-status-card-inProgress-text':
						status === 'inProgress',
					'border-app_tags-status-card-pending-text bg-app_tags-status-card-pending-bg text-app_tags-status-card-pending-text':
						status === 'notStarted' || status === 'pending'
				}
			)}
		>
			{icon(status)}
			<span className="text-xs font-medium">{cardStatusTags[status]}</span>
		</article>
	)
}
