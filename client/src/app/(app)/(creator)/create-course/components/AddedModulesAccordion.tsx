import { Module } from '@/models/course.model'
import * as Accordion from '@radix-ui/react-accordion'
import ModuleAccordionItem from './ModuleAccordionItem'

interface AddedModulesAccordionProps {
	modules: Module[]
}
export default function AddedModulesAccordion({
	modules
}: AddedModulesAccordionProps) {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-xl font-bold">Módulos</h2>
			<Accordion.Root type="multiple">
				<div className="flex flex-col gap-6">
					{modules.map((module, index) => (
						<ModuleAccordionItem key={index} module={module} index={index} />
					))}
				</div>
			</Accordion.Root>
		</div>
	)
}
