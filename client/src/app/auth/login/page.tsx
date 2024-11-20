import Link from 'next/link'

export default function page() {
	return (
		<div>
			<p>login</p>
			<Link href={'register'}>register</Link>
		</div>
	)
}
