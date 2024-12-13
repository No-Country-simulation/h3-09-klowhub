import Image from 'next/image'
import useStore from '@/lib/store'
import { useRouter } from 'next/navigation'

const explorerRoute = {
	href: '/',
}
const creatorRoute = {
	href: '/creator',
}

export default function Logo() {
	const { role } = useStore()
	const activeRoute = role === 'Explorer' ? explorerRoute : creatorRoute
	const router = useRouter()

	const handleRoute = () => {
		router.push(`${activeRoute.href}`)
	}

	return (
		<div onClick={handleRoute} className="cursor-pointer">
			<Image
				src="/img/logo_header.png"
				alt="logo image"
				width={52}
				height={54}
				priority
			/>
		</div>
	)
}

