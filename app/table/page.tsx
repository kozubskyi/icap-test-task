import Table from '@/components/Table'
import Pagination from '@/components/Pagination'

export default function TablePage() {
	return (
		<div className="p-16 flex justify-center items-center flex-col">
			<Table />
			<Pagination />
		</div>
	)
}
