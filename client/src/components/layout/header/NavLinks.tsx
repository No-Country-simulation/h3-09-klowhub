import Link from 'next/link'
import useStore from '@/lib/store';

const linksExplorer = [
	{ label: "Dashboard", href: "/" },
	{ label: "Curso y lecciones", href: "/learn/courses" },
	{ label: "Appstore", href: "/appstore" },
	{ label: "Proyectos", href: "/projects" },
	{ label: "Consultoría", href: "/consulting" },
	{ label: "Sobre Appsheet", href: "/about" },
];
const linksCreator = [
	{ label: "Dashboard", href: "/creator" },
	{ label: "Ganancias", href: "/creator" },
	{ label: "Mis productos", href: "/creator/my-courses" },
	{ label: "Buscar trabajo", href: "/creator" },
	{ label: "Sobre AppSheet", href: "/creator" },
];

export default function NavLinks() {
	const { role } = useStore()
	const links = role === 'Creator' ? linksCreator : linksExplorer

	return (
		<nav className="flex space-x-8">
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
	);
}



