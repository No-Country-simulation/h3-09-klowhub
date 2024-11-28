import { tabStatusTags } from '@/constants/tags.constant'
import clsx from 'clsx'

type Status = keyof typeof tabStatusTags

interface TabStatusTagProps {
	status: Status
}

export default function TabStatusTag({ status }: TabStatusTagProps) {
	return (
		<article
			className={clsx(
				'flex h-7 w-fit items-center justify-center gap-1 rounded-t-lg px-2',
				{
					'bg-app_tags-status-tab-success-bg text-app_tags-status-tab-success-text':
						status === 'solution' || status === 'solved',
					'bg-app_tags-status-tab-pending-bg text-app_tags-status-tab-pending-text':
						status === 'pending'
				}
			)}
		>
			<span className="text-sm font-semibold">{tabStatusTags[status]}</span>
		</article>
	)
}
