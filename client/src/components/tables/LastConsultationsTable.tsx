import { Consultation } from '@/models/consultation.model'
import clsx from 'clsx'
import Image from 'next/image'
import CardStatusTag from '../appTags/CardStatusTag'
import TechnologyTag from '../buyerTags/TechnologyTag'

interface LastConsultationsTableProps {
	consultations: Consultation[]
}

export default function LastConsultationsTable({
	consultations
}: LastConsultationsTableProps) {
	return (
		<div className="relative overflow-x-auto">
			<table className="w-full border-separate border-spacing-y-2 text-left text-sm font-semibold text-white">
				<thead className="bg-white/10">
					<tr>
						<th scope="col" className="w-[514px] rounded-tl-md px-6 py-4">
							Consulta
						</th>
						<th scope="col" className="px-6 py-4">
							Autor
						</th>
						<th scope="col" className="px-6 py-4">
							Fecha
						</th>
						<th scope="col" className="px-6 py-4">
							Plataforma
						</th>
						<th scope="col" className="rounded-tr-md px-6 py-4">
							Estado
						</th>
					</tr>
				</thead>
				<tbody>
					{consultations.map((consultation, index) => (
						<tr key={index} className="h-36 bg-white/10">
							<th
								scope="row"
								className={clsx('py-6 pl-6', {
									'rounded-tl-lg': index === 0,
									'rounded-bl-lg': index === consultations.length - 1
								})}
							>
								<div className="flex h-24 flex-col gap-4 overflow-hidden">
									<p>{consultation.title}</p>
									<p>{consultation.description}</p>
								</div>
							</th>
							<td className="py-6 pl-6 font-normal">
								<div className="flex items-center">
									{consultation.autor.image && (
										<Image
											src={consultation.autor.image}
											alt={consultation.autor.name}
											height={500}
											width={500}
											className="mr-6 h-12 w-12 rounded-full object-cover"
										/>
									)}
									<p className="w-max">{consultation.autor.name}</p>
								</div>
							</td>
							<td className="py-6 pl-6">
								{consultation.date.toLocaleDateString('es')}
							</td>
							<td className="py-6 pl-6">
								<TechnologyTag technology={consultation.platform} />
							</td>
							<td
								className={clsx('p-6', {
									'rounded-tr-lg': index === 0,
									'rounded-br-lg': index === consultations.length - 1
								})}
							>
								<CardStatusTag status={consultation.state} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
