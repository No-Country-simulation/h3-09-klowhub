import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'randomuser.me',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'h3-09-klowhub-331623778555.us-central1.run.app',
				pathname: '/_next/image'
			}
		]
	}
}

export default nextConfig
