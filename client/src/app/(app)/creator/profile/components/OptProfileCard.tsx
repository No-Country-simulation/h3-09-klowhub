import { Card } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'
import profileOpt from '../../../../../../public/img/profile-opt.png'
import Button from '@/components/buttons/Button';

export default function OptProfileCard() {
	return (
		<Card className="bg-card border-none shadow-lg">
			<div className="flex flex-col items-center space-y-4">
				<Image
					src={profileOpt}
					alt="Optimiza tu perfil"
					className="w-full h-48 object-cover rounded-t-lg"
				/>
				<p className="text-sm font-semibold text-center ">
					Optimiza tu Perfil
				</p>
				<p className="text-[12px] leading-[22px] font-medium text-center">
					Optimizá tu perfil y llevá tus apps al siguiente nivel. Accedé a
					recursos exclusivos que te ayudarán a mejorar tus habilidades y
					maximizar el potencial de tus proyectos.
				</p>
				<Button variant='primary'>Ir a los recursos</Button>
			</div>
		</Card>
	);
}
