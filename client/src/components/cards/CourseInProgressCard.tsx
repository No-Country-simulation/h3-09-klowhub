import { Card, Progress } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../buttons/Button'
import CategoryTag from '../buyerTags/CategoryTag'
import TechnologyTag, { Technology } from '../buyerTags/TechnologyTag'
const course = {
	id: 1,
	title: 'Automatización de flujos de trabajo con AppSheet',
	description:
		'Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos.',
	price: 100,
	rating: 3,
	totalVotes: 26,
	categories: ['CRM', 'Clientes', 'Ventas'],
	stack: ['appsheet'],
	image: 'https://picsum.photos/200'
}
export function CourseInProgressCard() {
	return (
		<Card
			theme={{
				root: {
					children: 'p-2  gap-3 flex flex-col w-full',
					horizontal: {
						on: 'md:max-w-full max-sm:flex-col flex-row '
					}
				},
				img: {
					horizontal: {
						on: 'max-w-[300px]'
					}
				}
			}}
			horizontal
			className={`overflow-hidden border-none bg-card`}
			renderImage={() => (
				<picture className="relative aspect-video sm:w-1/4">
					<span className="absolute left-2 top-2 z-20">
						<CategoryTag>Curso</CategoryTag>
					</span>
					<Image
						fill
						sizes="200px"
						src={course.image}
						alt="app image"
						className="z-0 object-cover"
					/>
				</picture>
			)}
		>
			<h5 className="text-sm font-bold">{course.title}</h5>
			<p className="text-sm">{course.description}</p>
			<div className="flex gap-2">
				{course.stack.map((technology, i) => (
					<TechnologyTag
						technology={technology as Technology}
						key={'technology-' + i}
					/>
				))}
			</div>
			<div className="flex flex-wrap gap-4">
				{course.categories.map((category, i) => (
					<CategoryTag key={i}>{category}</CategoryTag>
				))}
			</div>
			<Progress
				theme={{
					color: {
						pink: 'bg-primary-b-400'
					}
				}}
				color="pink"
				progress={45}
				progressLabelPosition="outside"
				textLabel="Mi progreso"
				textLabelPosition="outside"
				size="sm"
				labelProgress
				labelText
			/>
			<Link href={`/app/${course.id}`}>
				<Button className="min-w-0 p-2 text-xs" size="l">
					Continuar viendo
				</Button>
			</Link>
		</Card>
	)
}
