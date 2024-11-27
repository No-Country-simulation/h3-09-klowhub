'use client'
import { Course } from '@/models/course.model'
import { useEffect, useState } from 'react'
import LessonsPreviewList from './LessonsPreviewList'
import ModulesAccordion from './ModulesAccordion'

interface CourseContentViewerProps {
	course: Course
}
export default function CourseContentViewer({
	course
}: CourseContentViewerProps) {
	const [activeModuleIndex, setActiveModuleIndex] = useState(0)
	const [activeLessonIndex, setActiveLessonIndex] = useState(0)
	const [videoLink, setVideoLink] = useState<string>()

	useEffect(() => {
		if (course.modules) {
			setVideoLink(course.modules[0].lessons[0].contentLink)
		} else if (course.contentLink) {
			setVideoLink(course.contentLink)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!course.modules) return
		setActiveLessonIndex(0)
		setVideoLink(course.modules[activeModuleIndex].lessons[0].contentLink)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeModuleIndex])

	useEffect(() => {
		if (!course.modules) return
		setVideoLink(
			course.modules[activeModuleIndex].lessons[activeLessonIndex].contentLink
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeLessonIndex])
	return (
		<section className="flex justify-between gap-12 rounded-xl bg-white/10 px-6 pb-6 pt-8">
			<div className="flex w-3/4 flex-col gap-4">
				<video key={videoLink} controls className="min-w-80 rounded-xl">
					<source src={videoLink} type="video/mp4" />
				</video>

				{course.modules && (
					<LessonsPreviewList
						lessons={course.modules[activeModuleIndex].lessons}
						setActiveLessonIndex={setActiveLessonIndex}
					/>
				)}
			</div>

			<div className="flex grow justify-center">
				{course.modules && (
					<ModulesAccordion
						modules={course.modules}
						activeLessonIndex={activeLessonIndex}
						setActiveModuleIndex={setActiveModuleIndex}
						setActiveLessonIndex={setActiveLessonIndex}
					/>
				)}
			</div>
		</section>
	)
}