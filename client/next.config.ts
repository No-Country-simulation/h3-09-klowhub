import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'randomuser.me',
				port: '',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
