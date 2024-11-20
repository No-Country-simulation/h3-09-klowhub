import { Switch } from '@headlessui/react'
import clsx from 'clsx'

interface HomePlatformSwitchProps {
	enabled: boolean
	setEnabled: (enabled: boolean) => void
}

export default function HomePlatformSwitch({
	enabled = false,
	setEnabled
}: HomePlatformSwitchProps) {
	return (
		<Switch
			checked={enabled}
			onChange={setEnabled}
			className="group relative inline-flex h-[31px] w-[155px] items-center rounded-lg bg-white/20 transition"
		>
			<span
				className={clsx(
					'z-0 h-[23px] translate-x-1 rounded-lg bg-primary-b-500 transition group-data-[checked]:translate-x-[68px]',
					{
						'w-[47px]': !enabled,
						'w-[84px]': enabled
					}
				)}
			/>
			<div className="absolute z-20 flex w-full justify-between gap-4 px-2">
				<span className={clsx('text-sm font-semibold text-white')}>Home</span>
				<span className={clsx('text-sm font-semibold text-white')}>
					Plataforma
				</span>
			</div>
		</Switch>
	)
}
