import { Coupon } from '@/models/coupon.model'
import { Course } from '@/models/course.model'
import { DigitalProduct } from '@/models/product.model'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import App from 'next/app'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const {
		items,
		activeDiscount,
		userId
	}: {
		items: Array<DigitalProduct>
		activeDiscount: Coupon | null
		userId: string
	} = await req.json()

	try {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`,
			{
				buyerUserId: 'bc4317b3-07ec-4f8a-bc24-67e89a8c20c0',
				items: items.map((item) => {
					const type = Object.prototype.hasOwnProperty.call(item, 'contentType')
						? 'COURSE'
						: 'APP'
					return {
						productId: item.id,
						quantity: 1,
						price: item.price,
						type
					}
				})
			}
		)
		console.log(data)
		return NextResponse.json({ data }, { status: 200 })
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
