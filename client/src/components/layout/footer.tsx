import React from 'react'
import { FanIcon, AArrowUp, LampCeiling } from 'lucide-react'

export default function Footer() {
	return (
		<footer className="w-full bg-gradient-to-b from-[#1c1b29] to-[#0f0e15] text-white p-8 text-sm">
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<h3 className="mb-2 font-semibold">Categorías</h3>
					<ul className="space-y-1">
						{['Cursos', 'Aplicaciones', 'Vende un Curso', 'Vende una App'].map((item) => (
							<li key={item}>
								<a href="#" className="hover:underline">{item}</a>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className="mb-2 font-semibold">Acerca De</h3>
					<ul className="space-y-1">
						{['Instructores', 'Cursos', 'Términos y condiciones', 'Políticas de Privacidad'].map((item) => (
							<li key={item}>
								<a href="#" className="hover:underline">{item}</a>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className="mb-2 font-semibold">Soporte</h3>
					<ul className="space-y-1">
						{['FAQ', 'Contacto', 'Foro'].map((item) => (
							<li key={item}>
								<a href="#" className="hover:underline">{item}</a>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="container mx-auto flex flex-col items-center md:flex-row justify-between mt-8">
				<div className="flex space-x-4">
					{[FanIcon, AArrowUp, LampCeiling].map((Icon, index) => (
						<a key={index} href="#" className="hover:text-gray-400">
							<Icon size={20} />
						</a>
					))}
				</div>
				<p className="mt-4 md:mt-0">© KnowHub.</p>
			</div>
		</footer>
	)
}
