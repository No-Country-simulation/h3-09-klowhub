'use client'
import HomePlatformSwitch from '@/components/buttons/HomePlatformSwitch'
import { useState } from 'react'
import Logo from './Logo'
import NavLinks from './NavLinks'
import UserActions from './UserActions'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Header() {
	const [isEnabled, setIsEnabled] = useState(true)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const router = useRouter()

	const handleLinkClick = () => {
		setIsMenuOpen(false)
	}

	const handleLogoClick = () => {
		if (isEnabled) {
			router.push('/')
		} else {
			router.push('/creator')
		}
	}

	return (
		<header className="w-full bg-[url('/img/header-bg.png')] bg-cover bg-center pt-3">
			<nav className="relative flex flex-wrap items-center justify-between bg-[#1F2026] bg-opacity-70 px-4 py-3 md:px-9">
				<div className="flex flex-wrap items-center space-x-4">
					<Logo onClick={handleLogoClick} />
					<div className="mt-2 md:mt-0">
						<HomePlatformSwitch enabled={isEnabled} setEnabled={setIsEnabled} />
					</div>
					<div className="hidden items-center xl:flex">
						<NavLinks />
					</div>
				</div>
				<div className="relative">
					<UserActions />
				</div>
				{/* Mobile icon menu */}
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="xl:hidden"
					aria-label="Toggle Menu"
				>
					{isMenuOpen ? (
						<X className="h6 w-6 text-white" />
					) : (
						<Menu className="h6 w-6 text-white" />
					)}
				</button>
			</nav>
			{/* Modal mobile menu */}
			{isMenuOpen && (
				<div className="fixed right-0 top-20 z-30 h-96 w-full bg-custom-gradient xl:hidden">
					{/* Centered NavLinks */}
					<div className="flex h-full flex-col items-center justify-center space-y-6">
						<NavLinks isVertical onLinkClick={handleLinkClick} />
					</div>
				</div>
			)}
		</header>
	)
}
