'use client'
import { App } from '@/models/app.model'
import { Coupon } from '@/models/coupon.model'
import { Course } from '@/models/course.model'
import { createOrder } from '@/services/checkout.service'

interface Props {
	children: React.ReactNode
	items: Array<Course | App>
	activeDiscount: Coupon | null
	disabled: boolean
}
export default function StripeButton({
	children,
	items,
	activeDiscount,
	disabled
}: Props) {
	const handleClick = async () => {
		try {
			const res = await createOrder(items)
			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<button role="link" onClick={handleClick} disabled={disabled}>
			{children}
		</button>
	)
}
