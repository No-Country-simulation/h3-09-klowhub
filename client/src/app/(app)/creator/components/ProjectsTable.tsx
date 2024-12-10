
import CardStatusTag from '@/components/appTags/CardStatusTag';
import Button from '@/components/buttons/Button';
import { Project } from '@/models/project';
import { BookOpenCheck, Camera, CircleDollarSign, Eye, Factory, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import TypeTag from '../../../../components/appTags/TypeTag';

interface CreatorProjects {
	projects: Project[];
}

export default function ProjectsTable({ projects }: CreatorProjects) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full border-separate border-spacing-y-1 text-left text-sm font-semibold text-white">
				<thead className="bg-white/10">
					<tr>
						<th scope="col" className="px-6 py-4 rounded-tl-md">
							<span className="inline-block align-middle">
								<Camera />
							</span>
						</th>
						<th scope="col" className="px-6 py-4">
							<span className="inline-block align-middle">
								<User />
							</span>
							<span className="inline-block align-middle ml-2">Nombre de cliente</span>
						</th>
						<th scope="col" className="px-6 py-4">
							<span className="inline-block align-middle">
								<CircleDollarSign />
							</span>
							<span className="inline-block align-middle ml-2">Monto</span>
						</th>
						<th scope="col" className="px-6 py-4">
							<span className="inline-block align-middle">
								<BookOpenCheck />
							</span>
							<span className="inline-block align-middle ml-2">Tipo</span>
						</th>
						<th scope="col" className="px-6 py-4">
							<span className="inline-block align-middle">
								<Eye />
							</span>
							<span className="inline-block align-middle ml-2">Estado</span>
						</th>
						<th scope="col" className="px-6 py-4 rounded-tr-md">
							<span className="inline-block align-middle">
								<Factory />
							</span>
							<span className="inline-block align-middle ml-2">Plataforma</span>
						</th>
					</tr>
				</thead>
				<tbody >
					{projects.map((project, index) => (
						<tr key={index} className="h-[70px] bg-white/10 rounded-tl-lg">
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
								<span><TypeTag type={project.type} /></span>
							</td>
							<td className="px-4 py-2">
								<span className="flex items-center gap-2">
									<CardStatusTag status={project.status} />
								</span>
							</td>
							<td className="px-4 py-2 ">
								<Button variant='tertiary'>Ver detalle</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
