import FinishedCourses from './components/FinishedCourses'
import MyCourses from './components/MyCourses'

export default function MyLearningPage() {
	return (
		<div className="flex flex-col gap-12">
			<MyCourses />
			<FinishedCourses />
		</div>
	)
}
