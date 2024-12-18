import { DigitalProduct } from '@/models/product.model'
import axios from 'axios'

export async function createOrder(
	items: Array<DigitalProduct>,
	userId: string
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
	console.log(fixedItems)

	const data = await axios.post(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`,
		{
			buyerUserId: userId,
			items: fixedItems
		}
	)
	console.log(data)

	return data
}
