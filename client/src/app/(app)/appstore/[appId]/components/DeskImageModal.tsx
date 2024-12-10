import { Modal } from 'flowbite-react'
import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import DesktopImg from '../../../../../../public/img/desktop-app.png'

interface Props {
	setShowModal: Dispatch<SetStateAction<boolean>>
	show: boolean
}

export default function DeskImageModal({ setShowModal, show }: Props) {
	return (
		<Modal
			show={show}
			onClose={() => setShowModal(false)}
			theme={{
				content: {
					inner: 'bg-[#323238] rounded-lg sm:p-4 w-fit'
				},
				header: {
					base: 'border-b-0 flex'
				},
				body: {
					base: 'w-[800px] h-[528px]'
				}
			}}
		>
			<Modal.Header />
			<Modal.Body>
				<Image src={DesktopImg} alt="modal-img" />
			</Modal.Body>
		</Modal>
	)
}
