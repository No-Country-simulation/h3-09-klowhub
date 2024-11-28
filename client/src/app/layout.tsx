import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionAuthProvider } from '../context/SessionProvider'

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
		<html lang="es" className="no-scrollbar">
			<body className={` ${inter.className} antialiased`}>
				<SessionAuthProvider>{children}</SessionAuthProvider>
			</body>
		</html>
	)
}
