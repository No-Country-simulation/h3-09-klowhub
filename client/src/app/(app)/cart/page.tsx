import Link from 'next/link'
import React from 'react'
import RecommendedCourses from '../components/RecommendedCourses'
import CartSection from './components/CartSection'

export default function page() {
	return (
		<section>
			<h1 className="font-semibold">Carrito de compras</h1>
			<section className="grid grid-flow-row grid-cols-1 gap-8 md:grid-cols-3 md:space-x-4">
				<CartSection />
				<article className="flex flex-col items-center gap-5 md:col-span-3">
					<p className="text-center">
						¿Tenés alguna pregunta? No dudes en escribirnos a
						klowhub@soporte.com o visitar nuestro centro de ayuda. ¡Estamos aquí
						para asistirte!
					</p>
					<div className="w-fit space-x-7">
						<Link className="text-primary-a-300" href={'#'}>
							Centro de ayuda
						</Link>
						<Link className="text-primary-a-300" href={'#'}>
							Soporte
						</Link>
					</div>
				</article>
				<article className="md:col-span-3">
					<RecommendedCourses />
				</article>
			</section>
		</section>
	)
}
