import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/header/Header'
import { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main className="min-h-screen px-14 py-10">{children}</main>
			<Footer />
		</>
	)
}
