import { Subscription } from '@/models/subscription.model'
import Link from 'next/link'
import React from 'react'
import PaymentMethod from './PaymentMethod'
import BuySubscriptionCard from './BuySubscriptionCard'

export default function BuySubscription({
	subscriptionSelected
}: {
	subscriptionSelected: Subscription
}) {
	return (
		<section>
			<p>
				Estás a un paso de acceder a todas las ventajas de nuestra plataforma. A
				continuación, encontrarás el resumen de tu compra. Por favor, revisa los
				detalles antes de continuar con el pago.
			</p>
			<section className="grid grid-flow-row grid-cols-1 gap-8 md:grid-cols-3 md:space-x-4">
				<BuySubscriptionCard subscriptionSelected={subscriptionSelected} />
				<PaymentMethod subscriptionSelected={subscriptionSelected} />
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
			</section>
		</section>
	)
}
