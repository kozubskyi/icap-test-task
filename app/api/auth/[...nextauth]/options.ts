import type { AuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { login } from '@/services/auth'

const options: AuthOptions = {
	providers: [
		Credentials({
			credentials: {
				username: { label: 'username', type: 'text', required: true },
				password: { label: 'password', type: 'password', required: true },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) return null

				const data = await login({ username: credentials.username, password: credentials.password })

				if (!data) return null

				return data as User
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
}

export default options
