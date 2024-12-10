'use client'
import ExplorerCreatorSwitch from '@/components/buttons/ExplorerCreatorSwitch'
import useStore from '@/lib/store'
import {
	Bell,
	CircleUserRound,
	Info,
	LogOut,
	Mail,
	Settings,
	ShoppingCart
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import avatarImg from '../../../../public/img/user_avatar.png'
import IconBadge from './IconBadge'

export default function UserActions() {
	const { data: session } = useSession()
	const notifications = [
		'Tu nuevo curso NoCode Basics comenzara esta semana',
		'Jhon Doe quiere conectar contigo',
		'Tu pago se ha efectuado con exito'
	]
	const { cart, role } = useStore()
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			if (
				isOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleOutsideClick)
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [isOpen])

	const handleCart = () => (window.location.href = '/cart')
	const handleMsgs = () => (window.location.href = '/messages')

	return (
		<div className="flex items-center space-x-6">
			<div className="flex items-center justify-between space-x-6">
				<IconBadge
					icon={<Bell />}
					count={3}
					items={notifications}
					isNotification
				/>
				{role === 'Explorer' && (
					<IconBadge
						icon={<ShoppingCart />}
						count={cart.length}
						items={[]}
						onClick={handleCart}
					/>
				)}
				<IconBadge icon={<Mail />} count={0} items={[]} onClick={handleMsgs} />
			</div>
			<ExplorerCreatorSwitch />
			<div className="relative" ref={dropdownRef}>
				<div
					className="h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-gray-400"
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<Image
						src={session?.user?.image || avatarImg}
						alt="User profile"
						className="h-full w-full object-cover"
						width={40}
						height={40}
					/>
				</div>
				{isOpen && (
					<div className="absolute right-0 z-20 mt-5 w-[244px] rounded-lg bg-card shadow-lg">
						<div className="border-b px-4 py-2">
							<p className="text-sm font-medium text-white">
								{session?.user?.name || 'Guest'}
							</p>
							<p className="text-xs text-white/50">
								{session?.user?.email || 'guest@gmail.com'}
							</p>
						</div>
						<ul className="py-2">
							<li>
								<Link
									href={'/creator/profile'}
									className="flex items-center gap-3 px-6 py-3 text-sm text-white hover:w-56 hover:rounded-lg hover:bg-white/10"
								>
									<CircleUserRound />
									Perfil
								</Link>
							</li>
							<li>
								<Link
									href={'/settings'}
									className="flex items-center gap-3 px-6 py-3 text-sm text-white hover:w-56 hover:rounded-lg hover:bg-white/10"
								>
									<Settings />
									Configuraciones
								</Link>
							</li>
							<li>
								<Link
									href={'/help'}
									className="flex items-center gap-3 px-6 py-3 text-sm text-white hover:w-56 hover:rounded-lg hover:bg-white/10"
								>
									<Info />
									Ayuda
								</Link>
							</li>
							<li>
								<button
									onClick={() => signOut()}
									className="flex w-full items-center gap-3 px-6 py-3 text-left text-sm text-white hover:w-56 hover:rounded-lg hover:bg-white/10"
								>
									<LogOut />
									Cerrar sesión
								</button>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}
