import { Creator } from '@/models/course.model'

interface InstructorHighlightProps {
	creator: Creator
}
export default function InstructorHighlight({
	creator
}: InstructorHighlightProps) {
	return (
		<article className="flex flex-col gap-3">
			<h6 className="text-xl font-bold">{`¿Por qué aprender con ${creator.name.split(' ')[0]}?`}</h6>
			<p className="text-sm">{`${creator.name} es un apasionado ${creator.bio}`}</p>
		</article>
	)
}
