import Footer from '@/components/layout/footer'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'KlowHub',
	description: 'Aprende, Comparte, Conecta y Monetiza'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<body className={` ${inter.className} antialiased`}>
				<main className="min-h-screen px-14 py-10">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
