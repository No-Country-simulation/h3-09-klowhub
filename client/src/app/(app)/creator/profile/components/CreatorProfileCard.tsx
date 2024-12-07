import { Avatar, Card } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import avatarImg from '/img/user_avatar.png'
import Button from '@/components/buttons/Button'
import Image from 'next/image'
import ProTag from '@/components/buyerTags/ProTag'


export default function CreatorProfileCard() {
	const { data: session } = useSession()


	return (
		<Card className='flex flex-col border-none bg-card gap-3 rounded-lg p-6 w-[70%] shadow-lg'>
			<div className='flex gap-12 '>
				<div className='flex flex-col items-center gap-2'>
					<Image src={session?.user?.image || '/client/public/img/user_avatar.png'} alt='user avatar' width={175} height={175} className='rounded-full' />
					<Button size='l' variant='tertiary'>Editar foto de perfil</Button>
					<p className='text-xl font-bold'>{session?.user?.name || 'Jhon Doe'}</p>
				</div>
				<div className='flex flex-col gap-3'>
					<div className='flex items-center gap-1'>
						<p className='text-primary-a-100 text-sm font-bold'>Creador</p>
						<ProTag />
					</div>
					<div className='flex items-start'>
						
					</div>
				</div>
			</div>

		</Card>
	)
}
