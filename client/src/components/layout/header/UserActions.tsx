'use client'
import ExplorerCreatorSwitch from '@/components/buttons/ExplorerCreatorSwitch'
import { Bell, ShoppingCart, Mail } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import IconBadge from './IconBadge'

export default function UserActions() {

	const notifications = [
		'first message', 'second message', 'third message'
	]
	const [userRole, SetUserRole] = useState()

	const handleRole = () => {
		SetUserRole(!userRole)
	}

	return (
		<div className="flex items-center space-x-6">
			<div className='flex items-center justify-between space-x-6'>
				<IconBadge icon={<Bell />} count={1} items={notifications} />
				<IconBadge icon={<ShoppingCart />} count={2} />
				<IconBadge icon={<Mail />} count={3} />
			</div>

			<ExplorerCreatorSwitch enabled setEnabled={handleRole} />

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
