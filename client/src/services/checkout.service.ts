import { Coupon } from '@/models/coupon.model'
import { DigitalProduct } from '@/models/product.model'
import axios from 'axios'

export async function createOrder(
	items: Array<DigitalProduct>,
	userId: string,
	activeDiscountCode: Coupon['code'] | null
) {
	const fixedItems = items.map((item) => {
		const type = Object.prototype.hasOwnProperty.call(item, 'contentType')
			? 'COURSE'
			: 'APP'
		return {
			productId: item.id,
			quantity: 1,
			type
		}
	})

	const data = await axios.post(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`,
		{
			buyerUserId: userId,
			items: fixedItems,
			discounts: activeDiscountCode ? [{ coupon: activeDiscountCode }] : []
		}
	)
	return data
}

export async function getOrdersByUserId(userId: string) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/all`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userId })
		}
	)
	if (!response.ok) {
		throw new Error('Failed to fetch orders')
	}
	return await response.json()
}
