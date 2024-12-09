import { Subscription } from '@/models/subscription.model'
import moneyFormat from '@/utils/moneyFormat'
import { Card } from 'flowbite-react'
import Image from 'next/image'

export default function BuySubscriptionCard({
	subscriptionSelected
}: {
	subscriptionSelected: Subscription
}) {
	return (
		<div className="relative col-span-2 my-6 h-fit rounded-lg bg-card p-3">
			<div className="border-y p-3">
				<Card
					theme={{
						root: {
							children: ' gap-3 flex flex-col w-full relative h-fit ',
							base: 'flex',
							horizontal: {
								on: 'md:max-w-full max-sm:flex-col flex-row p-3 lg:gap-4'
							}
						}
					}}
					horizontal
					className={`overflow-hidden border-none bg-card`}
					renderImage={() => (
						<picture className="relative flex aspect-square h-fit w-full md:w-72">
							<Image
								src={`/img/subscription-${subscriptionSelected.level}.webp`}
								layout="fill"
								objectFit="cover"
								alt="app image"
								className="rounded-lg"
							/>
						</picture>
					)}
				>
					<div className="flex flex-col gap-2 pl-3">
						<h5 className="text-sm font-bold uppercase">
							{subscriptionSelected.level}
						</h5>
						<ul className="list-disc px-5">
							{subscriptionSelected.details.map((detail, i) => (
								<li
									className="text-sm marker:text-primary-b-200"
									key={'detail-' + i}
								>
									{detail}
								</li>
							))}
						</ul>
						<div>
							<p>Comisiones:</p>
							<ul className="list-disc px-5">
								{subscriptionSelected.commissions.map((commission, i) => (
									<li
										className="text-sm marker:text-primary-b-200"
										key={'commission-' + i}
									>
										{commission.method}: {commission.percentage}%
									</li>
								))}
							</ul>
						</div>
					</div>
					<b className="right-0 text-xl lg:absolute">
						{subscriptionSelected.price > 0
							? moneyFormat(subscriptionSelected.price)
							: 'GRATIS'}
					</b>
				</Card>
			</div>
			{/* <Button
				className="absolute bottom-7 right-0"
				size="l"
				variant="tertiary"
				onClick={() => removeCartsubscriptionSelected(subscriptionSelected)}
			>
				Eliminar
			</Button> */}
		</div>
	)
}
