import Image from 'next/image'

export default function Logo() {
	return (
		<div className="flex items-center">
			<Image
				src="/img/logo_header.png"
				alt="logo image"
				width={52}
				height={54}
				priority />
		</div>
	)
}
