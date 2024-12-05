import clsx from 'clsx'
import { ButtonHTMLAttributes, cloneElement, ReactElement } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: ReactElement
	loading?: boolean
	variant?: 'primary' | 'secondary' | 'tertiary'
	size?: 'xl' | 'l'
}

export default function Button({
	icon,
	loading,
	variant = 'primary',
	size = 'xl',
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			className={clsx(
				'flex items-center justify-center gap-[10px] rounded-lg text-sm font-semibold',
				{
					'bg-primary-b-500 text-white hover:bg-primary-b-400 active:bg-primary-b-600':
						variant === 'primary',
					'text-primary-b-200 hover:text-primary-b-400 active:text-primary-b-600':
						variant !== 'primary',
					'border border-primary-b-200 hover:border-primary-b-400 active:border-primary-b-600':
						variant === 'secondary',
					'h-[45px] min-w-[250px]': size === 'xl',
					'h-[40px] min-w-[140px]': size === 'l'
				},
				props.className
			)}
		>
			{icon && <div>{cloneElement(icon, { size: 20, strokeWidth: 1 })}</div>}
			{loading ? <p>loading...</p> : props.children}
		</button>
	)
}
