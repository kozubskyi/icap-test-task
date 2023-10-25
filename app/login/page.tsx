import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import options from '../api/auth/[...nextauth]/options'
import LoginForm from '@/components/LoginForm'

export default async function LoginPage() {
	const session = await getServerSession(options)

	if (session) redirect('/table')

	return (
		<div className="flex justify-center items-center flex-col h-screen">
			<LoginForm />
		</div>
	)
}
