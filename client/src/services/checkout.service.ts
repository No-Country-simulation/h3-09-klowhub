import { DigitalProduct } from '@/models/product.model'
import axios from 'axios'

export async function createOrder(items: Array<DigitalProduct>) {
	const fixedItems = items.map((item) => {
		const type = Object.prototype.hasOwnProperty.call(item, 'contentType')
			? 'COURSE'
			: 'APP'
		return {
			productId: item.id,
			quantity: 1,
			price: item.price
			// type
		}
	})
	console.log(fixedItems)

	const data = await axios.post(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`,
		{
			// buyerUserId: 'bc4317b3-07ec-4f8a-bc24-67e89a8c20c0',
			items: fixedItems
		}
	)
	console.log(data)

	return data
}
