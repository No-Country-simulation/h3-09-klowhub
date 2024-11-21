import { Bell } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface IconWithBadgeProps {
	icon: React.ReactNode
	count: number | 0
	items: string[]
	isNotification?: boolean
	onClick?: () => void
}

export default function IconBadge({ icon, count, items, isNotification, onClick }: IconWithBadgeProps) {
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
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
					<span className="absolute -top-3 -right-3 bg-white text-black text-xs rounded-full px-2">
						{count}
					</span>
				)}
			</button>
			{isNotification && isOpen && (
				<div ref={dropdownRef} className="absolute right-0 mt-2 bg-[#1F2026] shadow-lg rounded-lg p-2 w-[598px] z-40">
					<div className="border-b border-primary-b-200 flex items-center justify-start gap-2 p-2">
						<Bell />
						<span>Notificaciones</span>
					</div>
					{items.length > 0 ? (
						items.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-4 border-b border-primary-b-200 last:border-none text-white"
							>
								{item}
							</div>
						))
					) : (
						<div className="text-gray-500 text-sm">No hay notificaciones</div>
					)}
				</div>
			)}
		</div>
	)
}
