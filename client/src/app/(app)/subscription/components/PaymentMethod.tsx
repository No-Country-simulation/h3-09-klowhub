'use client'
import Button from '@/components/buttons/Button'
import SubscriptionConfirmModal from '@/components/modals/SubscriptionConfirmModal'
import { Subscription } from '@/models/subscription.model'
import moneyFormat from '@/utils/moneyFormat'
import Image from 'next/image'
import React, { useState } from 'react'
interface Coupon {
	name: string
	discount: number
}
const coupons: Coupon[] = [
	{
		name: 'VERANO2024',
		discount: 20
	},
	{
		name: 'BIENVENIDA10',
		discount: 10
	},
	{
		name: 'BLACKFRIDAY50',
		discount: 50
	}
]

export default function PaymentMethod({
	subscriptionSelected
}: {
	subscriptionSelected: Subscription
}) {
	const [discountInput, setDiscountInput] = useState('')
	const [activeDiscount, setActiveDiscount] = useState<Coupon | null>(null)
	const [totalResume, setTotalResume] = useState(subscriptionSelected.price)
	const [showModalConfirmation, setShowModalConfirmation] = useState(false)

	const loadDiscount = () => {
		const coupon = coupons.filter((item) => item.name === discountInput)[0]
		if (coupon) {
			setActiveDiscount(coupon)
			const amountDiscount =
				(subscriptionSelected.price * coupon.discount) / 100
			const totalWhitDiscount = subscriptionSelected.price - amountDiscount
			setTotalResume(totalWhitDiscount)
		}
	}
	return (
		<article>
			<div className="mt-5 flex h-fit w-full flex-col gap-6 rounded-lg bg-card p-4">
				<b>Resumen</b>
				<div className="space-y-1">
					<div className="flex justify-between">
						<p>subtotal</p>
						<p>{moneyFormat(subscriptionSelected.price)}</p>
					</div>
					<div className="flex justify-between">
						<p>Tarifa de servicio</p>
						<p>{moneyFormat(0)}</p>
					</div>
				</div>
				<div className="space-y-1">
					<p>Cupón de descuento</p>
					<div className="flex justify-between gap-2 max-lg:flex-col">
						<input
							type="text"
							onChange={({ target }) => {
								setDiscountInput(target.value)
							}}
							value={discountInput}
							placeholder="Ingresar cupón"
							className="w-1/2 rounded-lg border-white bg-transparent placeholder:text-white max-lg:w-full"
						/>
						<Button
							size="l"
							variant="secondary"
							className="border-white text-white"
							onClick={loadDiscount}
						>
							Ingresar
						</Button>
					</div>
				</div>
				{activeDiscount && (
					<div className="flex justify-between">
						<p>cupón {activeDiscount.name}</p>
						<p>- {activeDiscount.discount}%</p>
					</div>
				)}
				<div className="flex justify-between">
					<b>Total</b>
					<p>{moneyFormat(totalResume)}</p>
				</div>
				<div className="space-y-5">
					<p>Selecciona un método de pago</p>
					<div className="grid h-fit w-full grid-cols-3 gap-5">
						<span
							className="relative flex aspect-video cursor-pointer rounded-lg bg-slate-100"
							onClick={() => setShowModalConfirmation(true)}
						>
							<Image
								src={'/img/stripe-logo.png'}
								alt=""
								width={120}
								height={45}
								className="m-auto aspect-video rounded-lg object-contain p-2"
							/>
						</span>
						<span className="relative flex aspect-video cursor-pointer rounded-lg bg-slate-100">
							<Image
								src={'/img/payPal-logo.png'}
								alt=""
								width={120}
								height={45}
								className="m-auto aspect-video rounded-lg object-contain p-2"
							/>
						</span>
						<span className="relative flex aspect-video cursor-pointer rounded-lg bg-slate-100">
							<Image
								src={'/img/ethereum-logo.png'}
								alt=""
								width={120}
								height={45}
								className="m-auto aspect-video rounded-lg object-contain p-2"
							/>
						</span>
					</div>
					<p className="text-center text-xs text-secondary-300">
						Al comprar/contratar los productos aceptas los términos y
						condiciones.
					</p>
				</div>
			</div>
			{showModalConfirmation && (
				<SubscriptionConfirmModal
					subscriptionSelected={subscriptionSelected}
					setShowModalConfirmation={setShowModalConfirmation}
					showModalConfirmation={showModalConfirmation}
				/>
			)}
		</article>
	)
}
