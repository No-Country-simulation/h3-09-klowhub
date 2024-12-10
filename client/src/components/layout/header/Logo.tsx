import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
	return (
		<div className="">
			<Link href={'/'}>
				<Image
					src="/img/logo_header.png"
					alt="logo image"
					width={52}
					height={54}
					priority
				/>
			</Link>
		</div>
	)
}
