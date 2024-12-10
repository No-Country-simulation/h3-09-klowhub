'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import CartListSkeleton from './CartList.skeleton'
import PaymentMethodSkeleton from './PaymentMethod.skeleton'

const CartList = dynamic(() => import('./CartList'), {
	ssr: false,
	loading: () => <CartListSkeleton />
})
const PaymentMethod = dynamic(() => import('./PaymentMethod'), {
	ssr: false,
	loading: () => <PaymentMethodSkeleton />
})
export default function CartSection() {
	return (
		<>
			<CartList />
			<PaymentMethod />
		</>
	)
}
