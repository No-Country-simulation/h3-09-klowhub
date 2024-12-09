'use client'
import React from 'react'
import useStore from '@/lib/store'
import CartItem from './CartItem'
export default function CartList() {
	const { cart } = useStore()
	return (
		<article className="md:col-span-2">
			{cart.length < 1 && (
				<div className="mt-5 flex h-full items-center justify-center rounded-lg bg-white/10 p-4">
					<p>El carrito esta vacío</p>
				</div>
			)}
			{cart.map((item) => (
				<CartItem key={item.title} item={item} />
			))}
		</article>
	)
}
