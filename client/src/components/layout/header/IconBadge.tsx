import { Bell } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface IconWithBadgeProps {
	icon: React.ReactNode
	count: number | 0
	items: string[]
	isNotification?: boolean
	onClick?: () => void
}

export default function IconBadge({
	icon,
	count,
	items,
	isNotification,
	onClick
}: IconWithBadgeProps) {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	function toggleDropdown() {
		if (isNotification) {
			setIsOpen(!isOpen)
		} else if (onClick) {
			onClick()
		}
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isOpen])

	return (
		<div className="relative">
			<button onClick={toggleDropdown} className="relative flex items-center">
				{icon}
				{count > 0 && (
					<span className="absolute -right-3 -top-3 rounded-full bg-white px-2 text-xs text-black">
						{count}
					</span>
				)}
			</button>
			{isNotification && isOpen && (
				<div
					ref={dropdownRef}
					className="absolute right-0 z-40 mt-6 w-[500px] rounded-lg bg-card p-2 shadow-lg"
				>
					<div className="flex items-center justify-start gap-2 border-b border-primary-b-200 p-2">
						<Bell />
						<span className="text-[16px] font-medium">Notificaciones</span>
					</div>
					{items.length > 0 ? (
						items.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between border-b border-primary-b-200 p-2 text-[14px] font-light text-white last:border-none"
							>
								{item}
							</div>
						))
					) : (
						<div className="text-sm text-gray-500">No hay notificaciones</div>
					)}
				</div>
			)}
		</div>
	)
}
