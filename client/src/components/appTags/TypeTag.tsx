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
					'border-app_tags-type-course-text bg-app_tags-type-course-bg text-app_tags-type-course-text':
						type === 'COURSE',
					'border-app_tags-type-app-text bg-app_tags-type-app-bg text-app_tags-type-app-text':
						type === 'app',
					'border-app_tags-type-lesson-text bg-app_tags-type-lesson-bg text-app_tags-type-lesson-text':
						type === 'LESSON',
					'border-app_tags-type-mentoring-text bg-app_tags-type-mentoring-bg text-app_tags-type-mentoring-text':
						type === 'mentoring',
					'border-app_tags-type-project-text bg-app_tags-type-project-bg text-app_tags-type-project-text':
						type === 'project'
				}
			)}
		>
			<span className="text-xs font-bold">{typeTags[type]}</span>
		</article>
	)
}
