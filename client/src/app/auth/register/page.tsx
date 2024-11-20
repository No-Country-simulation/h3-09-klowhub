import Link from 'next/link'

export default function page() {
	return (
		<div>
			<p>register</p>
			<Link href={'login'}>login</Link>
		</div>
	)
}
