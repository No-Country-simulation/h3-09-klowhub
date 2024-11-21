import Footer from '@/components/layout/footer'
import { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<main className="min-h-screen px-14 py-10">{children}</main>
			<Footer />
		</>
	)
}
