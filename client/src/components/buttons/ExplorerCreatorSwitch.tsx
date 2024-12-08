import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { Backpack, Rocket } from 'lucide-react'
import useStore from '@/lib/store'
import { useRouter } from 'next/navigation'

export default function ExplorerCreatorSwitch() {
	const { role, toggleRole } = useStore()
	const router = useRouter()

	return (
		<div className="flex w-[174px] items-center justify-between px-[6px]">
			<p className="text-sm font-semibold">
				{role === 'Creator' ? 'Creador' : 'Explorador'}
			</p>
			<Switch
				checked={role === 'Creator'}
				onChange={() => {
					toggleRole()
					router.push(role === 'Creator' ? '/' : '/creator')
				}}
				className="group relative inline-flex h-[35px] w-[76px] items-center rounded-full bg-primary-b-500 transition"
			>
				<span className="z-0 h-[26px] w-[34px] translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-[38px]" />
				<div className="absolute z-20 flex w-full justify-center gap-4">
					<Backpack
						className={clsx('size-5', {
							'text-primary-b-500': role !== 'Creator',
							'text-white': role === 'Creator',
						})}
					/>
					<Rocket
						className={clsx('size-5', {
							'text-primary-b-500': role === 'Creator',
							'text-white': role !== 'Creator',
						})}
					/>
				</div>
			</Switch>
		</div>
	)
}
