import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'
import axios, { AxiosError } from 'axios'
export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'test@test.com' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				try {
					const { data } = await axios.post(
						`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
						{
							email: credentials?.email,
							password: credentials?.password
						},
						{
							headers: {
								'Content-Type': 'application/json'
							}
						}
					)

					if (!data || data.error) {
						throw new Error(data?.error || 'Credenciales invalidas')
					} else {
						const { data: userData } = await axios.get(
							`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/validate_token/${data.token}`
						)
						return userData
					}
				} catch (error) {
					if (axios.isAxiosError(error)) {
						const axiosError = error as AxiosError<{ error: string }>
						const errorMessage =
							axiosError.response?.data?.error ||
							'Ha ocurrido un error en la autenticacion'
						throw new Error(errorMessage)
					}
					throw new Error('Error inesperado al autenticar')
				}
			}
		}),

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}),

		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string
		}),

		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
		})
	],
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			baseUrl = process.env.NEXTAUTH_URL as string
			console.log('Redirect URL: ', url)
			console.log('Base URL: ', baseUrl)
			return baseUrl
			// if (url.startsWith('/')) {
			// 	return `${baseUrl}${url}`
			// }
			// // Allows callback URLs on the same origin
			// else if (new URL(url).origin === baseUrl) return url
			// return baseUrl
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
		}
	},
	pages: {
		signIn: '/auth/login'
	},
	secret: process.env.NEXTAUTH_SECRET
}
