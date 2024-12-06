import Button from '@/components/buttons/Button'
import { Subscription } from '@/models/subscription.model'
import moneyFormat from '@/utils/moneyFormat'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow
} from 'flowbite-react'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const subscriptions: Subscription[] = [
	{
		id: '1',
		level: 'starter',
		price: 0,
		details: [
			'Acceso limitado a funciones básicas.',
			'Ideal para principiantes que desean explorar la plataforma.',
			'Soporte por correo electrónico.',
			'Uso de plantillas predefinidas y recursos básicos.'
		],
		commissions: [
			{ method: 'PayPal', percentage: 20 },
			{ method: 'Stripe', percentage: 15 },
			{ method: 'Crypto', percentage: 12 }
		]
	},
	{
		id: '2',
		level: 'professional',
		price: 9.99,
		details: [
			'Acceso limitado a funciones básicas.',
			'Ideal para principiantes que desean explorar la plataforma.',
			'Soporte por correo electrónico.',
			'Uso de plantillas predefinidas y recursos básicos.'
		],
		commissions: [
			{ method: 'PayPal', percentage: 20 },
			{ method: 'Stripe', percentage: 15 },
			{ method: 'Crypto', percentage: 12 }
		]
	},
	{
		id: '3',
		level: 'expert',
		price: 15.99,
		details: [
			'Acceso limitado a funciones básicas.',
			'Ideal para principiantes que desean explorar la plataforma.',
			'Soporte por correo electrónico.',
			'Uso de plantillas predefinidas y recursos básicos.'
		],
		commissions: [
			{ method: 'PayPal', percentage: 20 },
			{ method: 'Stripe', percentage: 15 },
			{ method: 'Crypto', percentage: 12 }
		]
	}
]

interface Props {
	nextStep: () => void
	subscriptionSelected: Subscription | null
	setSubscriptionSelected: React.Dispatch<
		React.SetStateAction<Subscription | null>
	>
}

export default function SelectSubscription({
	nextStep,
	subscriptionSelected,
	setSubscriptionSelected
}: Props) {
	return (
		<article className="relative min-h-full w-full space-y-9 rounded-lg bg-card p-5">
			<h1 className="font-bold">¡Bienvenido a la Comunidad de Vendedores!</h1>
			<p className="">
				Elige el plan que mejor se adapte a tus necesidades y comienza a
				monetizar tus creaciones. Desde el plan gratuito hasta las opciones
				premium, cada uno ofrece herramientas diseñadas para maximizar tu éxito
				como creador.
			</p>
			<div>
				<p className="font-bold">Detalles del plan seleccionado</p>
				<p>
					A continuación, encontrarás una descripción detallada de las
					características y beneficios del plan que has elegido.
				</p>
			</div>
			<div className="rounded-lg bg-white/10 p-9">
				<div className="grid grid-cols-3 gap-9 p-10">
					{subscriptions.map((subscription) => (
						<div
							key={subscription.id}
							className={`flex flex-col gap-5 rounded-lg bg-white/15 p-3 outline-none transition-all hover:scale-105 hover:cursor-pointer hover:outline-white ${subscriptionSelected?.id === subscription.id && 'scale-105 outline-primary-b-400 hover:outline-primary-b-400'}`}
							onClick={() => setSubscriptionSelected(subscription)}
						>
							<Image
								src={`/img/subscription-${subscription.level}.webp`}
								alt=""
								width={300}
								height={150}
								className="aspect-video w-full rounded-lg object-fill"
							/>
							<div className="flex flex-col gap-2">
								<b>{subscription.level}</b>
								<b>{moneyFormat(subscription.price)}</b>
								<ul className="list-disc px-5">
									{subscription.details.map((detail, i) => (
										<li
											className="marker:text-primary-b-200"
											key={'detail-' + i}
										>
											{detail}
										</li>
									))}
								</ul>
								<div>
									<p>Comisiones:</p>
									<ul className="list-disc px-5">
										{subscription.commissions.map((commission, i) => (
											<li
												className="marker:text-primary-b-200"
												key={'commission-' + i}
											>
												{commission.method}: {commission.percentage}%
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Table
				theme={{
					head: {
						cell: {
							base: 'border-2 border-primary-b-400 p-3 text-white text-center'
						}
					},
					body: {
						cell: {
							base: 'border-2 border-primary-b-400 p-3 text-xs text-white text-center'
						}
					}
				}}
			>
				<TableHead>
					<TableHeadCell>Comparar planes</TableHeadCell>
					{subscriptions.map((subscription) => (
						<TableHeadCell key={subscription.id}>
							<div className="flex flex-col">
								<p>{subscription.level}</p>
								<p className="font-light">
									{moneyFormat(subscription.price)} mensual
								</p>
							</div>
						</TableHeadCell>
					))}
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>Aspecto</TableCell>
						<TableCell>
							Perfecto para quienes recién empiezan y quieren explorar la
							plataforma.
						</TableCell>
						<TableCell>
							Desbloquea funcionalidades avanzadas y personaliza tu experiencia.
						</TableCell>
						<TableCell>
							Accede a todas nuestras funciones exclusivas y maximiza tu
							potencial como creador.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Limites</TableCell>
						<TableCell>Publica hasta 3 aplicaciones.</TableCell>
						<TableCell>Publica hasta 10 aplicaciones.</TableCell>
						<TableCell>Publicaciones ilimitadas.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Análisis avanzado y personalizado</TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell>
							<CheckCircle className="m-auto text-primary-b-400" />{' '}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Soporte exclusivo 24/7.</TableCell>
						<TableCell></TableCell>
						<TableCell>
							<CheckCircle className="m-auto text-primary-b-400" />{' '}
						</TableCell>
						<TableCell>
							<CheckCircle className="m-auto text-primary-b-400" />{' '}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			{subscriptionSelected && (
				<Button className="absolute -bottom-16 right-0" onClick={nextStep}>
					Continuar
				</Button>
			)}
		</article>
	)
}
