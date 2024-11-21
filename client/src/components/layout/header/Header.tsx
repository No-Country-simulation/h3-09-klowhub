
import Logo from './Logo'
import NavLinks from './NavLinks'
import UserActions from './UserActions'

export default function Header() {
	return (
		<header className="w-full flex justify-between bg-[#1F2026] mt-4 px-6 py-3">
			<div className="flex justify-around items-center">
				<Logo />
				<div className="flex items-center space-x-10 ml-10">
					<NavLinks />
				</div>
			</div>
			<UserActions />
		</header>
	)
}
