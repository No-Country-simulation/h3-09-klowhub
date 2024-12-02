'use client'
import ExplorerCreatorSwitch from '@/components/buttons/ExplorerCreatorSwitch'
import { Bell, Mail, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import IconBadge from './IconBadge'
import useStore from '@/lib/store'

export default function UserActions() {
	const notifications = [
		'first notification',
		'second notification',
		'third notification'
	]

	const [userMode, setUserMode] = useState(false)

	function handleCart() {
		window.location.href = '/cart'
	}

	function handleMsgs() {
		window.location.href = '/messages'
	}
	const { cart } = useStore()
	return (
		<div className="flex items-center space-x-6">
			<div className="flex items-center justify-between space-x-6">
				<IconBadge
					icon={<Bell />}
					count={3}
					items={notifications}
					isNotification
				/>
				<IconBadge
					icon={<ShoppingCart />}
					count={cart.length}
					items={[]}
					onClick={handleCart}
				/>
				<IconBadge icon={<Mail />} count={3} items={[]} onClick={handleMsgs} />
			</div>
			<ExplorerCreatorSwitch enabled={userMode} setEnabled={setUserMode} />
			<div className="h-8 w-8 overflow-hidden rounded-full bg-gray-400">
				<Image
					src="/img/user_avatar.png"
					alt="User profile"
					className="h-full w-full object-cover"
					width={40}
					height={40}
				/>
			</div>
		</div>
	)
}
