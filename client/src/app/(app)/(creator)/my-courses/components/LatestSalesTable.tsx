import CardStatusTag from '@/components/appTags/CardStatusTag'
import Button from '@/components/buttons/Button'
import { cardStatusTags } from '@/constants/tags.constant'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

interface Buyer {
	name: string
	image?: string
}

export interface CourseSale {
	id: string
	buyer: Buyer
	amount: number
	date: Date
	state: keyof typeof cardStatusTags
}

interface LatestSalesTableProps {
	sales: CourseSale[]
}

export default function LatestSalesTable({ sales }: LatestSalesTableProps) {
	return (
		<div className="relative overflow-x-auto">
			<table className="w-full border-separate border-spacing-y-2 text-left text-sm font-semibold text-white">
				<thead className="bg-white/10">
					<tr>
						<th scope="col" className="w-20 rounded-tl-md px-6 py-4" />
						<th scope="col" className="px-6 py-4">
							Nombre de cliente
						</th>
						<th scope="col" className="px-6 py-4">
							Monto
						</th>
						<th scope="col" className="px-6 py-4">
							Estado
						</th>
						<th scope="col" className="rounded-tr-md px-6 py-4"></th>
					</tr>
				</thead>
				<tbody>
					{sales.map((sale, index) => (
						<tr key={index} className="bg-white/10">
							<th
								scope="row"
								className={clsx('py-4 pl-4', {
									'rounded-tl-lg': index === 0,
									'rounded-bl-lg': index === sales.length - 1
								})}
							>
								<div className="flex items-center">
									{sale.buyer.image && (
										<Image
											src={sale.buyer.image}
											alt={sale.buyer.name}
											height={500}
											width={500}
											className="mr-6 h-12 w-12 rounded-full object-cover"
										/>
									)}
								</div>
							</th>
							<td className="py-4 pl-4 font-normal">
								<p className="w-max">{sale.buyer.name}</p>
							</td>
							<td className="py-4 pl-4">${sale.amount}</td>
							<td className="py-4 pl-4">
								<CardStatusTag status={sale.state} />
							</td>
							<td
								className={clsx('p-4', {
									'rounded-tr-lg': index === 0,
									'rounded-br-lg': index === sales.length - 1
								})}
							>
								<Link href={`/my-courses/sold/${sale.id}`}>
									<Button variant="tertiary">Ver detalles</Button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
