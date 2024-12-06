import CategoryTag from '@/components/buyerTags/CategoryTag'
import { App } from '@/models/app.model'
import React from 'react'
interface Props {
	contentPillar: App['functionalities']
	sector: App['sector']
	functionalities: App['functionalities']
	toolsAndPlatforms: App['toolsAndPlatforms']
}
export default function InfoFuncApp({
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
					{functionalities.map((item, i) => (
						<CategoryTag key={i}>{item}</CategoryTag>
					))}
				</ul>
			</div>
		</section>
	)
}
