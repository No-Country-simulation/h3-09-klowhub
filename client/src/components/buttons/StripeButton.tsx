'use client'
import { App } from '@/models/app.model'
import { Coupon } from '@/models/coupon.model'
import { Course } from '@/models/course.model'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
)
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
	const handleClick = async (event: React.MouseEvent) => {
		const stripe = await stripePromise

		if (!stripe) {
			console.error('Failed to load Stripe')
			return
		}

		const result = await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify({ items, activeDiscount })
		})

		if (!result.ok) {
			const errorMessage = await result.text()
			console.error(errorMessage)
		} else {
			const session = await result.json()
			stripe.redirectToCheckout({ sessionId: session.id })
		}
	}

	return (
		<button role="link" onClick={handleClick} disabled={disabled}>
			{children}
		</button>
	)
}