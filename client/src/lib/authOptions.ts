import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'
import axiosInstance from '@/utils/axiosInstance'


export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'yourmail@gmail.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const { data: user } = await axiosInstance.post('/api/auth/login', {
						email: credentials?.email,
						password: credentials?.password,
					})

					if (user) {
						return user
					}
					return null
				} catch (error) {
					console.error('Authorization error: ', error)
					return null
				}
			},
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),

		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),

		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			console.log('Redirect URL: ', url)
			console.log('Base URL: ', baseUrl)
			return url.startsWith(baseUrl) ? url : baseUrl
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			if (token) {
				session.user = {
					...session.user,
					id: token.id as string
				}
			}
			return session
		},
	},
	pages: {
		signIn: '/auth/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
}
