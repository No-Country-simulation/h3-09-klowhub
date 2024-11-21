'use client'
import Footer from '@/components/layout/Footer'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const path = usePathname().split('/')[2]
	console.log(path)

	const bgImage = `url('/img/${path}-bg.png')`
	return (
		<main className="flex min-h-dvh flex-col">
			<section
				style={{
					backgroundImage: bgImage,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover'
				}}
				className="relative flex min-h-[85vh] flex-grow"
			>
				<h1 className="relative m-9 hidden text-5xl font-semibold md:flex">
					KlowHub
				</h1>
				<div className="ml-auto w-full bg-[#20222F3B] backdrop-blur-lg md:w-1/2">
					{children}
				</div>
			</section>
			<Footer />
		</main>
	)
}
