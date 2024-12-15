import { typeTags } from '@/constants/tags.constant'
import clsx from 'clsx'

export type Type = (typeof typeTags)[keyof typeof typeTags]

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
						type === 'Curso',
					'border-app_tags-type-app-text bg-app_tags-type-app-bg text-app_tags-type-app-text':
						type === 'Aplicación',
					'border-app_tags-type-lesson-text bg-app_tags-type-lesson-bg text-app_tags-type-lesson-text':
						type === 'Lección',
					'border-app_tags-type-mentoring-text bg-app_tags-type-mentoring-bg text-app_tags-type-mentoring-text':
						type === 'Mentoría',
					'border-app_tags-type-project-text bg-app_tags-type-project-bg text-app_tags-type-project-text':
						type === 'Proyecto'
				}
			)}
		>
			<span className="text-xs font-bold">{type}</span>
		</article>
	)
}
