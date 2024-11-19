import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { Backpack, Rocket } from 'lucide-react'

interface ExplorerCreatorSwitchProps {
	enabled: boolean
	setEnabled: (enabled: boolean) => void
}

export default function ExplorerCreatorSwitch({
	enabled = false,
	setEnabled
}: ExplorerCreatorSwitchProps) {
	return (
		<div className="flex w-[174px] items-center justify-between px-[6px]">
			<p className="text-sm font-semibold">
				{enabled ? 'Creador' : 'Explorador'}
			</p>
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className="group relative inline-flex h-[35px] w-[76px] items-center rounded-full bg-primary-b-500 transition"
			>
				<span className="z-0 h-[26px] w-[34px] translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-[38px]" />
				<div className="absolute z-20 flex w-full justify-center gap-4">
					<Backpack
						className={clsx('size-5', {
							'text-primary-b-500': !enabled,
							'text-white': enabled
						})}
					/>
					<Rocket
						className={clsx('size-5', {
							'text-primary-b-500': enabled,
							'text-white': !enabled
						})}
					/>
				</div>
			</Switch>
		</div>
	)
}
