import { Lesson } from '@/models/course.model'
import Image from 'next/image'

interface LessonsPreviewListProps {
	lessons: Lesson[]
	setActiveLessonIndex: (index: number) => void
}

export default function LessonsPreviewList({
	lessons,
	setActiveLessonIndex
}: LessonsPreviewListProps) {
	return (
		<section className="flex flex-col gap-3 rounded-xl bg-white/5 px-6 py-4">
			<h6 className="font-semibold">Vista previa</h6>
			<div className="flex gap-2 overflow-y-hidden">
				{lessons.map((lesson, idx) => {
					return (
						<div
							key={lesson.title}
							className="flex h-32 w-48 flex-col"
							role="button"
							onClick={() => {
								setActiveLessonIndex(idx)
							}}
						>
							<Image
								src={lesson.image}
								alt={lesson.title}
								width={500}
								height={500}
								className="h-20 w-48 rounded-md object-cover"
							/>
							<h3 className="w-48 p-4">Lección {idx + 1}</h3>
						</div>
					)
				})}
			</div>
		</section>
	)
}
