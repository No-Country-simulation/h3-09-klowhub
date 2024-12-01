import CategoryTag from '@/components/buyerTags/CategoryTag'
import { Course } from '@/models/course.model'
import React from 'react'
interface Props {
	contentPillar: Course['contentPillar']
	sector: Course['sector']
	functionalities: Course['functionalities']
	toolsAndPlatforms: Course['toolsAndPlatforms']
}
export default function InfoFunctionalities({
	contentPillar,
	sector,
	functionalities,
	toolsAndPlatforms
}: Props) {
	return (
		<section>
			<b>Información y funcionalidades de la app</b>
			<div className="my-2 flex w-full flex-col justify-evenly gap-3 rounded-lg border border-primary-a-300 p-2 text-center lg:flex-row">
				<ul className="flex flex-col items-center gap-2">
					<li>Funcionalidades</li>
					{functionalities.map((item, i) => (
						<CategoryTag key={i}>{item}</CategoryTag>
					))}
				</ul>
				<ul className="flex flex-col items-center gap-2">
					<li>Herramientas y plataformas</li>
					{toolsAndPlatforms.map((item, i) => (
						<CategoryTag key={i}>{item}</CategoryTag>
					))}
				</ul>
				<ul className="flex flex-col items-center gap-2">
					<li>Sector</li>
					<CategoryTag>{sector}</CategoryTag>
				</ul>
				<ul className="flex flex-col items-center gap-2">
					<li>Pilar de contenido</li>
					<CategoryTag>{contentPillar}</CategoryTag>
				</ul>
			</div>
		</section>
	)
}
