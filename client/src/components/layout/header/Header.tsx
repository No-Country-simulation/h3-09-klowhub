'use client'
import HomePlatformSwitch from '@/components/buttons/HomePlatformSwitch'
import Logo from './Logo'
import NavLinks from './NavLinks'
import UserActions from './UserActions'
import { useState } from 'react'

export default function Header() {
	const [isEnabled, setIsEnabled] = useState(true)

	function handleState() {
		setIsEnabled(!isEnabled)
	}

	return (
		<header className="w-full bg-[url('/img/header-bg.png')] bg-center bg-cover pt-3">
			<nav className="flex flex-wrap justify-between items-center bg-[#1F2026] bg-opacity-70 px-4 md:px-9 py-3 relative">
				{/* Sección Izquierda */}
				<div className="flex flex-wrap items-center space-x-4">
					<Logo />
					<div className="mt-2 md:mt-0">
						<HomePlatformSwitch enabled setEnabled={handleState} />
					</div>
					<div className="hidden md:flex items-center space-x-6 ml-4">
						<NavLinks />
					</div>
				</div>

				{/* Sección Derecha */}
				<div className="relative">
					<UserActions />
				</div>
			</nav>
		</header>
	)
}
