import type { Metadata } from 'next'
import Header from '@/components/Header'

export const metadata: Metadata = {
	title: 'Table | ICAP Group test task',
}

export default function TableLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
		</>
	)
}
