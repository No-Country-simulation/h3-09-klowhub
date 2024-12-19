'use client'
import Button from '@/components/buttons/Button'
import StripeButton from '@/components/buttons/StripeButton'
import CartConfirmModal from '@/components/modals/CartConfirmModal'
import useStore from '@/lib/store'
import { Coupon } from '@/models/coupon.model'
import moneyFormat from '@/utils/moneyFormat'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const coupons: Coupon[] = [
	{
		name: 'VERANO2024',
		code: 'W5IGVSyk',
		discount: 20
	},
	{
		name: 'BIENVENIDA10',
		code: 'wnZeyWGK',

		discount: 10
	},
	{
		name: 'BLACKFRIDAY50',
		code: 'AKR9sxLW',
		discount: 50
	}
]

export default function PaymentMethod() {
	const { getTotalCart, cart, emptyCart } = useStore()
	const [discountInput, setDiscountInput] = useState('')
	const [invalidCouponMessage, setInvalidCouponMessage] = useState<
		string | null
	>(null)
	const [activeDiscount, setActiveDiscount] = useState<Coupon | null>(null)
	const [totalResume, setTotalResume] = useState(getTotalCart())
	const [showModalConfirmation, setShowModalConfirmation] = useState(false)
	const param = useSearchParams()
	useEffect(() => {
		if (param.get('status') === 'success') {
			emptyCart()
			setShowModalConfirmation(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loadDiscount = () => {
		const coupon = coupons.filter((item) => item.code === discountInput)[0]
		if (coupon) {
			setActiveDiscount(coupon)
			const amountDiscount = (getTotalCart() * coupon.discount) / 100
			const totalWhitDiscount = getTotalCart() - amountDiscount
			setTotalResume(totalWhitDiscount)
			setInvalidCouponMessage(null)
		} else {
			setInvalidCouponMessage('Cupón no valido')
			setActiveDiscount(null)
		}
	}
	useEffect(() => {
		if (discountInput.length > 0) {
			loadDiscount()
		} else {
			setTotalResume(getTotalCart())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getTotalCart()])
	return (
		<article>
			<div className="mt-5 flex h-fit w-full flex-col gap-6 rounded-lg bg-card p-4">
				<b>Resumen</b>
				<div className="space-y-1">
					<div className="flex justify-between">
						<p>subtotal</p>
						<p>{moneyFormat(getTotalCart())}</p>
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
				{invalidCouponMessage && (
					<p className="text-xs text-red-500">{invalidCouponMessage}</p>
				)}
				<div className="flex justify-between">
					<b>Total</b>
					<p>{moneyFormat(totalResume)}</p>
				</div>
				<div className="space-y-5">
					<p>Selecciona un método de pago</p>
					<div className="grid h-fit w-full grid-cols-3 gap-5">
						<StripeButton
							items={cart}
							activeDiscount={activeDiscount}
							disabled={cart.length < 1}
						>
							<span className="relative flex aspect-video cursor-pointer rounded-lg bg-slate-100">
								<Image
									src={'/img/stripe-logo.png'}
									alt=""
									width={120}
									height={45}
									className="m-auto aspect-video rounded-lg object-contain p-2"
								/>
							</span>
						</StripeButton>

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
				<CartConfirmModal
					setShowModalConfirmation={setShowModalConfirmation}
					showModalConfirmation={showModalConfirmation}
				/>
			)}
		</article>
	)
}
