'use client'
import React from 'react'
import useStore from '@/lib/store'
import CartItem from './CartItem'
export default function CartList() {
	const { cart } = useStore()
	return (
		<article className="md:col-span-2">
			{cart.map((item) => (
				<CartItem key={item.id} item={item} />
			))}
		</article>
	)
}
