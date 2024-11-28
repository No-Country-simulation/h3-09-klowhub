import axios from 'axios'
import Image from 'next/image'
import Button from '../buttons/Button'

export default async function ProfessionalsCard() {
	const {
		data: { results },
	} = await axios('https://randomuser.me/api/')
	const user = results[0]

	return (
		<div className=' w-2/3 max-w-[190px] p-2 bg-card flex flex-col justify-center items-center text-center rounded-lg gap-3'>
			<p className='text-sm font-semibold'>Analista de Datos</p>
			<picture className='relative w-3/5 aspect-square rounded-full overflow-hidden'>
				<Image src={user.picture.medium} fill alt='user image' />
			</picture>
			<p className='text-sm font-semibold'>
				{user.name.first} {user.name.last}
			</p>
			<p className='mb-2 text-xs line-clamp-4 leading-5'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
				laudantium nam vero porro. Dolores labore architecto distinctio iure
				esse earum, vel accusantium recusandae commodi minus laudantium nam
				incidunt consequuntur quaerat.
			</p>
			<Button variant='tertiary'>Ver detalles</Button>
		</div>
	)
}
