import { ReactNode } from 'react'

interface PanelContainerProps {
	children: ReactNode
	className?: string
}

export default function PanelContainer({
	children,
	className
}: PanelContainerProps) {
	return (
		<section className={`rounded-lg bg-card px-6 py-12 ${className}`}>
			{children}
		</section>
	)
}
