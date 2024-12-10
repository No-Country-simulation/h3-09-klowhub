import { Card } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'
import profileOpt from '../../../../../../public/img/profile-opt.png'
import Button from '@/components/buttons/Button'

export default function OptProfileCard() {
	return (
		<Card className="border-none bg-card shadow-lg">
			<div className="flex flex-col items-center space-y-4">
				<Image
					src={profileOpt}
					alt="Optimiza tu perfil"
					className="h-48 w-full rounded-t-lg object-cover"
				/>
				<p className="text-center text-sm font-semibold">Optimiza tu Perfil</p>
				<p className="text-center text-[12px] font-medium leading-[22px]">
					Optimizá tu perfil y llevá tus apps al siguiente nivel. Accedé a
					recursos exclusivos que te ayudarán a mejorar tus habilidades y
					maximizar el potencial de tus proyectos.
				</p>
				<Button variant="primary">Ir a los recursos</Button>
			</div>
		</Card>
	)
}
