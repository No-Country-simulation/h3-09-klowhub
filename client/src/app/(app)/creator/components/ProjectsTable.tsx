import CardStatusTag from '@/components/appTags/CardStatusTag'
import Button from '@/components/buttons/Button'
import { Project } from '@/models/project'
import {
	BookOpenCheck,
	Camera,
	CircleDollarSign,
	Eye,
	Factory,
	User
} from 'lucide-react'
import Image from 'next/image'
import TypeTag from '../../../../components/appTags/TypeTag'

interface CreatorProjects {
	projects: Project[]
}

export default function ProjectsTable({ projects }: CreatorProjects) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full border-separate border-spacing-y-1 text-left text-sm font-semibold text-white">
				<thead className="bg-white/10">
					<tr>
						<th scope="col" className="rounded-tl-md px-6 py-4">
							<span className="inline-block align-middle">
								<Camera />
							</span>
						</th>
						<th scope="col" className="px-6 py-4">
							<span className="inline-block align-middle">
								<User />
							</span>
							<span className="ml-2 inline-block align-middle">
								Nombre de cliente
							</span>
						</th>
						<th scope="col" className="px-6 py-4">
							<span className="inline-block align-middle">
								<CircleDollarSign />
							</span>
							<span className="ml-2 inline-block align-middle">Monto</span>
						</th>
						<th scope="col" className="px-6 py-4">
							<span className="inline-block align-middle">
								<BookOpenCheck />
							</span>
							<span className="ml-2 inline-block align-middle">Tipo</span>
						</th>
						<th scope="col" className="px-6 py-4">
							<span className="inline-block align-middle">
								<Eye />
							</span>
							<span className="ml-2 inline-block align-middle">Estado</span>
						</th>
						<th scope="col" className="rounded-tr-md px-6 py-4">
							<span className="inline-block align-middle">
								<Factory />
							</span>
							<span className="ml-2 inline-block align-middle">Plataforma</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((project, index) => (
						<tr key={index} className="h-[70px] rounded-tl-lg bg-white/10">
							<td className="px-4 py-2">
								<Image
									src={project.author.image}
									alt={project.author.name}
									width={500}
									height={500}
									className="h-10 w-10 rounded-full"
								/>
							</td>
							<td className="px-4 py-2 font-medium">{project.author.name}</td>
							<td className="px-4 py-2">{`$${project.amount}`}</td>
							<td className="px-4 py-2">
								<span>
									<TypeTag type={project.type} />
								</span>
							</td>
							<td className="px-4 py-2">
								<span className="flex items-center gap-2">
									<CardStatusTag status={project.status} />
								</span>
							</td>
							<td className="px-4 py-2">
								<Button variant="tertiary">Ver detalle</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
