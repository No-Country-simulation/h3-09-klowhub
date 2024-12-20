import { Coupon } from '@/models/coupon.model'
import { Course } from '@/models/course.model'
import App from 'next/app'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(
	'sk_test_51NUxNAE8eiHCQU5rcRB7steaLxr7oaffQXrHmqOlFNKsIKvqojWQCLOOtZZRN9q8itJosnAkXDetMXp7jLlv3jjA00kFcIcc3V',
	{
		apiVersion: '2024-11-20.acacia'
	}
)

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(req: NextRequest) {
	const {
		items,
		activeDiscount
	}: { items: Array<Course | App>; activeDiscount: Coupon | null } =
		await req.json()

	try {
		const couponCreated = activeDiscount
			? await stripe.coupons.create({
				name: activeDiscount.name,
				percent_off: activeDiscount.discount
			})
			: null
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			line_items: items.map((item: any) => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: item.title
					},
					unit_amount: item.price * 100
				},
				quantity: 1
			})),
			mode: 'payment',
			discounts: couponCreated ? [{ coupon: couponCreated.id }] : [],
			success_url: `${req.headers.get('origin')}/cart?status=success`,
			cancel_url: `${req.headers.get('origin')}/cart`
		})

		return NextResponse.json({ id: session.id }, { status: 200 })
	} catch (err) {
		if (err instanceof Error) {
			// Handle the error as an instance of the Error class
			return NextResponse.json({ error: err.message }, { status: 500 })
		} else {
			// Handle other types of errors
			return NextResponse.json(
				{ error: 'An unknown error occurred' },
				{ status: 500 }
			)
		}
	}
}
