import { Modal } from 'flowbite-react'
import React from 'react'
import Button from '../buttons/Button'
import Image from 'next/image'
import Link from 'next/link'
interface Props {
	showModalConfirmation: boolean
	setShowModalConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}
export default function CartConfirmModal({
	setShowModalConfirmation,
	showModalConfirmation
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
					<b>¡Felicidades! Estás listo para aprender</b>
					<p className="text-sm">
						Tu compra fue exitosa. Accede ahora y comienza a mejorar tus
						habilidades. ¡Te espera una experiencia de aprendizaje increíble!
					</p>
					<div className="flex flex-col items-center gap-10">
						<Image
							src={'/svg/checkConfirmModal.svg'}
							width={100}
							height={100}
							alt="check icon"
						/>
						<div className="flex gap-4 max-md:flex-col">
							<Link href={'/learn/my-learning'}>
								<Button variant="secondary">Ver mis cursos</Button>
							</Link>
							<Link href={''}>
								<Button variant="secondary">Ver mis aplicaciones</Button>
							</Link>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}
