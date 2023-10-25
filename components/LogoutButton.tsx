'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
	return (
		<button
			type="button"
			className="bg-rose-600 text-white font-semibold px-2 py-1 rounded-md"
			onClick={() => signOut({ callbackUrl: '/login' })}
		>
			Log out
		</button>
	)
}
