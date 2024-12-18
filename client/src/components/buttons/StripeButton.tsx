'use client'
import { App } from '@/models/app.model'
import { Coupon } from '@/models/coupon.model'
import { Course } from '@/models/course.model'
import { createOrder } from '@/services/checkout.service'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const { data: session } = useSession()

	const handleClick = async () => {
		setLoading(true)
		try {
			const res = await createOrder(items, session?.user.id as string)
			if (res.status === 201) {
				router.push(res.data.paymentSession.url)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}
	return (
		<button role="link" onClick={handleClick} disabled={disabled}>
			{loading ? <Loader2 className="m-auto animate-spin" /> : children}
		</button>
	)
}
