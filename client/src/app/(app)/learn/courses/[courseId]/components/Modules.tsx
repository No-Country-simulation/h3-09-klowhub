import { Course } from '@/models/course.model'
import { Sidebar } from 'flowbite-react'
import { Minus, Plus } from 'lucide-react'
import React from 'react'

export default function Modules({ modules }: { modules: Course['modules'] }) {
	return (
		<section className="flex flex-col gap-2">
			<b className="text-xl">Programa del curso</b>
			<Sidebar
				theme={{
					root: {
						collapsed: {
							on: '',
							off: ''
						},
						inner:
							' flex h-fit flex-col gap-2 rounded-lg bg-white/10 p-4 list-none '
					},
					collapse: {
						button:
							' flex justify-between w-full text-primary-b-300 font-semibold flex-row-reverse gap-4 hover:bg-white/20 rounded-lg p-2'
					},
					item: {
						base: 'hover:bg-white/20 p-2 rounded-lg ml-10',
						content: {
							base: ''
						},
						collapsed: {
							insideCollapse: 'ml-14'
						}
					}
				}}
			>
				<Sidebar.Items>
					{modules?.map((module, i) => (
						<Sidebar.Collapse
							key={'module-' + i}
							label={`Modulo ${i + 1}`}
							renderChevronIcon={(theme, open) => {
								const IconComponent = open ? Minus : Plus

								return <IconComponent aria-hidden />
							}}
						>
							<b className="ml-16">{module.title}</b>

							{module.lessons.map((lesson, i) => (
								<Sidebar.Item key={'lesson-' + i}>{lesson.title}</Sidebar.Item>
							))}
						</Sidebar.Collapse>
					))}
				</Sidebar.Items>
			</Sidebar>
		</section>
	)
}
