import Button from '@/components/buttons/Button'
import TechnologyTag from '@/components/buyerTags/TechnologyTag'
import { Course } from '@/models/course.model'
import { EllipsisVertical } from 'lucide-react'
import CourseAbout from './CourseAbout'
import CourseAudience from './CourseAudience'
import CourseInclusions from './CourseInclusions'
import CoursePrerequisites from './CoursePrerequisites'
import CreatorSection from './CreatorSection'
import InstructorHighlight from './InstructorHighlight'
import LearningOutcomes from './LearningOutcomes'

interface CourseDetailsProps {
	course: Course
}

export default function CourseDetails({ course }: CourseDetailsProps) {
	return (
		<section className="flex h-fit flex-col gap-6 rounded-lg bg-white/10 px-6 py-7">
			<div className="flex items-center justify-between">
				<h4 className="font-bold">{course.title}</h4>
				<EllipsisVertical />
			</div>

			<div className="flex items-end justify-between">
				<CreatorSection creator={course.creator} />
				<TechnologyTag technology={course.platform} />
			</div>

			<section className="flex justify-between">
				<Button size="l">Suscribirme</Button>
				<Button variant="secondary" size="l">
					Compartir
				</Button>
			</section>

			<section className="flex flex-col gap-6">
				<LearningOutcomes learningOutcomes={course.learningOutcomes} />
				<CourseAbout detailedDescription={course.detailedDescription} />
				<InstructorHighlight creator={course.creator} />
				<CourseAudience />
				<CoursePrerequisites prerequisites={course.prerequisites} />
				<CourseInclusions platform={course.platform} />
			</section>
		</section>
	)
}
