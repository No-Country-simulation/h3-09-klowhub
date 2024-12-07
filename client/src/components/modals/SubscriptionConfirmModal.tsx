import { Modal } from 'flowbite-react'
import React from 'react'
import Button from '../buttons/Button'
import Image from 'next/image'
import Link from 'next/link'
import { Subscription } from '@/models/subscription.model'
interface Props {
	showModalConfirmation: boolean
	setShowModalConfirmation: React.Dispatch<React.SetStateAction<boolean>>
	subscriptionSelected: Subscription
}
export default function SubscriptionConfirmModal({
	setShowModalConfirmation,
	showModalConfirmation,
	subscriptionSelected
}: Props) {
	return (
		<Modal
			show={showModalConfirmation}
			onClose={() => setShowModalConfirmation(false)}
			theme={{
				content: {
					inner: 'bg-card rounded-lg sm:p-6'
				},
				header: {
					base: 'border-b-0 flex'
				}
			}}
		>
			<Modal.Header></Modal.Header>
			<Modal.Body>
				<div className="flex flex-col space-y-6 text-center">
					<h3>
						¡Bienvenido al plan{' '}
						<b className="uppercase">{subscriptionSelected.level}</b>!
					</h3>
					<p className="text-sm">
						Gracias por suscribirte al plan{' '}
						<b className="uppercase">{subscriptionSelected.level}</b>. Ahora
						tienes acceso a los grandes beneficios de KlowHub. ¡Empieza a
						explorar todas las ventajas hoy mismo!
					</p>
					<div className="flex flex-col items-center gap-10">
						<Image
							src={'/svg/checkConfirmModal.svg'}
							width={100}
							height={100}
							alt="check icon"
						/>
						<div className="flex gap-4 max-md:flex-col">
							<Link href={'/creator'}>
								<Button>Accede al dashboard</Button>
							</Link>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}
