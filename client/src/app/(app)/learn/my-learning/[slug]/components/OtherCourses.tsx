import { AppCourseCard } from '@/components/cards/AppCourseCard'

export default function OtherCourses() {
	return (
		<section className="flex flex-col gap-6 rounded-lg bg-white/10 p-6">
			<h6 className="font-bold">Cursos que te pueden interesar</h6>
			{Array.from({ length: 3 }).map((_, idx) => {
				return <AppCourseCard key={idx} />
			})}
		</section>
	)
}
