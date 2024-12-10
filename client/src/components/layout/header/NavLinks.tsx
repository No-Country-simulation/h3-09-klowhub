import Link from 'next/link'
import useStore from '@/lib/store';

const linksExplorer = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Curso y lecciones', href: '/learn/courses' },
	{ label: 'Appstore', href: '/appstore' },
	{ label: 'Proyectos', href: '/projects' },
	{ label: 'Consultoría', href: '/consulting' },
	{ label: 'Sobre KlowHub', href: '/about' }
]
const linksCreator = [
	{ label: "Dashboard", href: "/creator" },
	{ label: "Ganancias", href: "/creator" },
	{ label: "Mis productos", href: "/creator/my-courses" },
	{ label: "Buscar trabajo", href: "/creator" },
	{ label: "Sobre AppSheet", href: "/creator" },
];

interface NavLinksProps {
	isVertical?: boolean
	onLinkClick?: () => void
}

export default function NavLinks({ isVertical = false, onLinkClick }: NavLinksProps) {
	const { role } = useStore()
	const links = role === 'Creator' ? linksCreator : linksExplorer

	return (
		<ul className={`flex ${isVertical ? 'flex-col items-center space-y-6' : 'space-x-1'}`}>
			{links.map(({ label, href }) => (
				<li key={label}>
					<Link
						href={href}
						className={`${isVertical ? 'text-[16px] font-semibold text-primary-b-200 p-2 hover:bg-gray-500 hover:rounded-lg hover:text-white' : 'text-[14px] font-semibold text-primary-b-200 p-1 2xl:p-2 hover:bg-gray-500 hover:rounded-lg hover:text-white'}`}
						onClick={onLinkClick}
					>
						{label}
					</Link>
				</li>
			))}
		</ul>
	);
}



