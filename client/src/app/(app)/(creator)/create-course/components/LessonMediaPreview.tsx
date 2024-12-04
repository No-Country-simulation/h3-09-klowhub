import { Lesson } from '@/models/course.model'
import Image from 'next/image'

export default function LessonMediaPreview({ lesson }: { lesson: Lesson }) {
	return (
		<>
			<p className="mb-3 text-sm font-semibold">Contenido de la lección</p>
			<div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
				<div className="flex flex-col gap-1">
					<Image
						src={lesson.image as string}
						alt={lesson.title}
						width={900}
						height={600}
						className="h-48 w-fit rounded-lg object-scale-down"
					/>
					<p>Imágen de la lección</p>
				</div>
				<div className="flex flex-col gap-1">
					<video
						key={lesson.contentLink}
						controls
						className="h-48 w-fit rounded-lg"
					>
						<source src={lesson.contentLink} type="video/mp4" />
					</video>
					<p>Video</p>
				</div>
			</div>
		</>
	)
}
