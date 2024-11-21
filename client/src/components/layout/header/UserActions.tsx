'use client'
import ExplorerCreatorSwitch from '@/components/buttons/ExplorerCreatorSwitch'
import { Bell, ShoppingCart, Mail } from 'lucide-react'
import Image from 'next/image'
import IconBadge from './IconBadge'
import { useState } from 'react'

export default function UserActions() {

	const notifications = [
		'first notification', 'second notification', 'third notification'
	]

	const [userMode, setUserMode] = useState(false)

	function handleUserMode() {
		setUserMode(!userMode)
	}

	function handleCart() {
		window.location.href = '/cart'
	}

	function handleMsgs() {
		window.location.href = '/messages'
	}

	return (
		<div className="flex items-center space-x-6">
			<div className='flex items-center justify-between space-x-6'>
				<IconBadge icon={<Bell />} count={3} items={notifications} isNotification />
				<IconBadge icon={<ShoppingCart />} count={2} items={[]} onClick={handleCart} />
				<IconBadge icon={<Mail />} count={3} items={[]} onClick={handleMsgs} />
			</div>
			<ExplorerCreatorSwitch enabled={false} setEnabled={handleUserMode} />
			<div className="w-8 h-8 rounded-full bg-gray-400 overflow-hidden">
				<Image
					src="/img/user_avatar.png"
					alt="User profile"
					className="w-full h-full object-cover"
					width={40}
					height={40}
				/>
			</div>
		</div>
	)
}
