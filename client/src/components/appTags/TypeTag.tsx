import { typeTags } from '@/constants/tags.constant'
import clsx from 'clsx'

type Type = keyof typeof typeTags

interface TypeTagProps {
	type: Type
}

export default function TypeTag({ type }: TypeTagProps) {
	return (
		<article
			className={clsx(
				'flex h-7 w-fit items-center justify-center rounded-xl border px-2',
				{
					'bg-app_tags-type-course-bg text-app_tags-type-course-text border-app_tags-type-course-text':
						type === 'course',
					'bg-app_tags-type-app-bg text-app_tags-type-app-text border-app_tags-type-app-text':
						type === 'app',
					'bg-app_tags-type-lesson-bg text-app_tags-type-lesson-text border-app_tags-type-lesson-text':
						type === 'lesson',
					'bg-app_tags-type-mentoring-bg text-app_tags-type-mentoring-text border-app_tags-type-mentoring-text':
						type === 'mentoring',
					'bg-app_tags-type-project-bg text-app_tags-type-project-text border-app_tags-type-project-text':
						type === 'project'
				}
			)}
		>
			<span className="text-xs font-bold">{typeTags[type]}</span>
		</article>
	)
}
