import { Module } from '@/models/course.model'
import * as Accordion from '@radix-ui/react-accordion'
import clsx from 'clsx'
import { ChevronDown, Inbox } from 'lucide-react'

interface ModulesAccordionProps {
	modules: Module[]
	activeLessonIndex: number
	setActiveModuleIndex: (index: number) => void
	setActiveLessonIndex: (index: number) => void
}

export default function ModulesAccordion({
	modules,
	activeLessonIndex,
	setActiveModuleIndex,
	setActiveLessonIndex
}: ModulesAccordionProps) {
	return (
		<section className="max-w-max">
			<Accordion.Root type="single" defaultValue={modules[0]?.title}>
				{modules.map((module, idx) => {
					return (
						<Accordion.Item key={module.title} value={module.title}>
							<Accordion.Header>
								<Accordion.Trigger
									onClick={() => setActiveModuleIndex(idx)}
									className="group flex h-10 w-full items-center justify-between data-[state=open]:text-primary-b-300"
								>
									<div className="flex items-center gap-2">
										<Inbox size={16} />
										<p className="text-start text-sm">{module.title}</p>
									</div>
									<ChevronDown
										size={16}
										className="group-data-[state=open]:rotate-180"
									/>
								</Accordion.Trigger>
							</Accordion.Header>
							<Accordion.Content className="my-4 pl-3">
								<div className="border-l-2 pl-2">
									<div className="bg-white/10">
										{module.lessons.map((lesson, idx) => {
											return (
												<div
													key={lesson.title}
													role="button"
													onClick={() => setActiveLessonIndex(idx)}
													className={clsx('min-h-10 px-3', {
														['rounded-lg bg-white text-primary-b-300']:
															idx === activeLessonIndex
													})}
												>
													<p className={clsx('text-sm font-medium leading-10')}>
														{lesson.title}
													</p>
												</div>
											)
										})}
									</div>
								</div>
							</Accordion.Content>
						</Accordion.Item>
					)
				})}
			</Accordion.Root>
		</section>
	)
}
