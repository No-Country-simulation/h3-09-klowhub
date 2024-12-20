import 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			email: string
			token: string
			image: string
			name: string
		}
	}
}
