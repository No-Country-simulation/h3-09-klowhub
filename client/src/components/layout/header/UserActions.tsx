'use client'
import { useEffect, useRef, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import ExplorerCreatorSwitch from '@/components/buttons/ExplorerCreatorSwitch'
import { Bell, CircleUserRound, Info, LogOut, Mail, Settings, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import IconBadge from './IconBadge'
import useStore from '@/lib/store'
import Link from 'next/link'

export default function UserActions() {
	const { data: session } = useSession()
	const notifications = ['first notification', 'second notification', 'third notification']
	const { cart } = useStore()
	const [userMode, setUserMode] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const img = '/img/user_avatar.png'

	// Cierra el dropdown al hacer clic fuera de él
	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
				<IconBadge icon={<Bell />} count={3} items={notifications} isNotification />
				<IconBadge icon={<ShoppingCart />} count={cart.length} items={[]} onClick={handleCart} />
				<IconBadge icon={<Mail />} count={0} items={[]} onClick={handleMsgs} />
			</div>
			<ExplorerCreatorSwitch enabled={userMode} setEnabled={setUserMode} />
			<div className="relative" ref={dropdownRef}>
				<div
					className="h-8 w-8 overflow-hidden rounded-full bg-gray-400 cursor-pointer"
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<Image
						src={session?.user?.image || img}
						alt="User profile"
						className="h-full w-full object-cover"
						width={40}
						height={40}
					/>
				</div>
				{isOpen && (
					<div className="absolute right-0 mt-5 w-[244px] rounded-lg bg-card shadow-lg z-20">
						<div className="px-4 py-2 border-b">
							<p className="text-sm font-medium text-white">{session?.user?.name || 'Guest'}</p>
							<p className="text-xs text-white/50">{session?.user?.email || 'guest@gmail.com'}</p>
						</div>
						<ul className="py-2">
							<li>
								<Link
									href={'/profile'}
									className="flex items-center px-6 py-3 text-sm text-white hover:bg-white/10 hover:w-56 hover:rounded-lg gap-3"
								>
									<CircleUserRound />
									Perfil
								</Link>
							</li>
							<li>
								<Link
									href={'/settings'}
									className="flex items-center px-6 py-3 text-sm text-white hover:bg-white/10 hover:w-56 hover:rounded-lg gap-3"
								>
									<Settings />
									Configuraciones
								</Link>
							</li>
							<li>
								<Link
									href={'/help'}
									className="flex items-center px-6 py-3 text-sm text-white hover:bg-white/10 hover:w-56 hover:rounded-lg gap-3"
								>
									<Info />
									Ayuda
								</Link>
							</li>
							<li>
								<button
									onClick={() => signOut()}
									className="flex items-center w-full text-left px-6 py-3 text-sm text-white hover:bg-white/10 hover:w-56 hover:rounded-lg gap-3"
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
