'use client'
import HomePlatformSwitch from '@/components/buttons/HomePlatformSwitch'
import { useState } from 'react'
import Logo from './Logo'
import NavLinks from './NavLinks'
import UserActions from './UserActions'


export default function Header() {
	const [isEnabled, setIsEnabled] = useState(true)

	return (
		<header className="w-full bg-[url('/img/header-bg.png')] bg-cover bg-center pt-3">
			<nav className="relative flex flex-wrap items-center justify-between bg-[#1F2026] bg-opacity-70 px-4 py-3 md:px-9">
				<div className="flex flex-wrap items-center space-x-4">
					<Logo />
					<div className="mt-2 md:mt-0">
						<HomePlatformSwitch enabled={isEnabled} setEnabled={setIsEnabled} />
					</div>
					<div className="ml-4 hidden items-center space-x-6 md:flex">
						<NavLinks />
					</div>
				</div>
				<div className="relative">
					<UserActions />
				</div>
			</nav>
		</header>
	)
}
