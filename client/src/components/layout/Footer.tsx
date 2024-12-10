import Link from 'next/link'

export default function Footer() {
	const category = [
		{ name: 'Cursos', url: '#' },
		{ name: 'Aplicaciones', url: '#' },
		{ name: 'Vende un curso', url: '#' },
		{ name: 'Vende una app', url: '#' }
	]

	const about = [
		{ name: 'Instructores', url: '#' },
		{ name: 'Cursos', url: '#' },
		{ name: 'Términos y condiciones', url: '#' },
		{ name: 'Políticas de Privacidad', url: '#' }
	]

	const support = [
		{ name: 'FAQ', url: '#' },
		{ name: 'Contacto', url: '#' },
		{ name: 'Foro', url: '#' }
	]

	return (
		<footer className="w-full bg-custom-gradient pt-14 text-white">
			<div className="container mx-auto mb-28 grid grid-cols-1 gap-4 px-8 md:grid-cols-4">
				<div>
					<h4 className="mb-2 text-sm text-gray-500">Categorías</h4>
					<ul>
						{category.map((cat, index) => (
							<li key={index} className="mb-2">
								<Link href={cat.url} className="">
									{cat.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 className="mb-2 text-sm text-gray-500">Acerca De</h4>
					<ul>
						{about.map((abt, index) => (
							<li key={index} className="mb-2">
								<Link href={abt.url} className="hover:">
									{abt.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 className="mb-2 text-sm text-gray-500">Soporte</h4>
					<ul>
						{support.map((sup, index) => (
							<li key={index} className="mb-2">
								<Link href={sup.url} className="hover:">
									{sup.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h4 className="mb-2 text-sm text-gray-500">Encuéntranos En</h4>
					<ul className="flex space-x-4">
						<li>
							<Link href={'#'}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="white"
									stroke="currentColor"
									strokeWidth="0"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-facebook"
								>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
								</svg>
							</Link>
						</li>
						<li>
							<Link href={'#'}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="white"
									stroke="currentColor"
									strokeWidth="0"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-twitter"
								>
									<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
								</svg>
							</Link>
						</li>
						<li>
							<Link href={'#'}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="white"
									stroke="currentColor"
									strokeWidth="0"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-linkedin"
								>
									<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
									<rect width="4" height="12" x="2" y="9" />
									<circle cx="4" cy="4" r="2" />
								</svg>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="flex flex-row items-center justify-center border-t-2 border-t-zinc-600 py-4">
				<p className="text-xs">© KlowHub.</p>
			</div>
		</footer>
	)
}
