import { Avatar, Card, Label } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import avatarImg from '/img/user_avatar.png'
import Button from '@/components/buttons/Button'
import Image from 'next/image'
import ProTag from '@/components/buyerTags/ProTag'
import { useRouter } from 'next/navigation'
import MetricTag from './MetricTag'


export default function CreatorProfileCard() {
	const { data: session } = useSession()
	const router = useRouter()

	const metrics = [
		{
			quantity: 25,
			label: 'Cursos publicados'
		},
		{
			quantity: 3,
			label: 'Aplicaciones creadas'
		},
		{
			quantity: 75,
			label: 'Subscriptores'
		},
	]

	return (
		<Card className='flex flex-col border-none bg-card gap-3 rounded-lg p-6 shadow-lg'>
			<div className='flex gap-12'>
				<div className='flex flex-col w-[25%] items-center gap-2'>
					<Image src={session?.user?.image || '/client/public/img/user_avatar.png'} alt='user avatar' width={175} height={175} className='rounded-full' />
					<Button size='l' variant='tertiary'>Editar foto de perfil</Button>
					<p className='text-xl font-bold'>{session?.user?.name || 'Jhon Doe'}</p>
				</div>
				<div className='flex flex-col w-[70%] gap-3'>
					<div className='flex items-center gap-1'>
						<p className='text-primary-a-100 text-lg font-bold'>Creador</p>
						<ProTag />
					</div>
					<div className='flex items-start space-x-6'>
						{metrics.map((metric, index) => (
							<MetricTag key={index} quantity={metric.quantity} label={metric.label} />
						))
						}
					</div>
					<div className='bg-gray-700 rounded-lg p-2 space-y-2 bg-opacity-40'>
						<p className='text-lg font-bold'>Sobre mi</p>
						<p className='text-sm leading-6 font-light tracking-wider'>Con más de 8 años de experiencia en el desarrollo de aplicaciones no-code, Juan Pérez se ha convertido en un referente en el uso de AppSheet, la plataforma de desarrollo de aplicaciones de Google. Su pasión por la tecnología y su enfoque en la simplificación de procesos empresariales lo han llevado a ayudar a cientos de empresas a transformar sus operaciones mediante aplicaciones personalizadas, sin necesidad de código.</p>
					</div>
				</div>
			</div>
			<div className='flex justify-between items-center bg-white/10 p-6 rounded-lg'>
				<div className='space-y-2'>
					<p className='text-[16px] leading-5 font-bold'>Mis cursos</p>
					<p className='text-[14px] leading-6 font-light'>Gestiona todos tus cursos</p>
				</div>
				<Button variant='secondary' onClick={() => router.push('/creator/my-courses')}>Ver mis cursos</Button>
			</div>
		</Card>
	)
}
