import Link from 'next/link'

const links = [
	{ label: 'Dashboard', href: '/dashboard' },
	{ label: 'Curso y lecciones', href: '/courses' },
	{ label: 'Appstore', href: '/appstore' },
	{ label: 'Proyectos', href: '/projects' },
	{ label: 'Consultoría', href: '/consulting' },
	{ label: 'Sobre Appsheet', href: '/about' },
]

export default function NavLinks() {
	return (
		<nav className="flex space-x-8 ">
			{links.map(({ label, href }) => (
				<Link
					key={label}
					href={href}
					className="text-[14px] font-semibold text-primary-b-200 p-2 hover:bg-gray-500 hover:rounded-lg hover:text-white"
				>
					{label}
				</Link>
			))}
		</nav>
	)
}



