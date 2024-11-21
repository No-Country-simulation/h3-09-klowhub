import { Bell } from 'lucide-react'
import { useState } from 'react'

interface IconWithBadgeProps {
	icon: React.ReactNode
	count: number | 0
	items: string[]
}

export default function IconBadge({ icon, count, items }: IconWithBadgeProps) {

	const [isOpen, setIsOpen] = useState(false)

	function toggleDropdown() {
		setIsOpen(!isOpen)
	}

	return (
		<div className='relative'>
			<button onClick={toggleDropdown} className='relative flex items-center'>
				{icon}
				{count > 0 && (
					<span className='absolute -top-3 -right-3 bg-white text-black text-xs rounded-full px-2'>
						{count}
					</span>
				)}
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 bg-black shadow-lg rounded-lg p-2 w-96">
					<div className='border-b border-primary-b-200 flex items-center justify-start gap-2 p-2'>
						<Bell />
						<span>Notificaciones</span>
					</div>
					{items.length > 0 ? (
						items.map((item, index) => (
							<div key={index} className="flex items-center justify-between p-4 border-b border-primary-b-200 last:border-none text-white">
								{item}
								<span>something beautyful </span>
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

