'use client'

import constants from '@/constants'
import { pageNumberActions } from '@/redux/features/pageNumberSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getTable } from '@/services/table-api'

const { limit } = constants

export default function Pagination() {
	const peopleTotalCount = useAppSelector(state => state.tableData.count)
	const pageNumber = useAppSelector(state => state.pageNumber)
	const dispatch = useAppDispatch()

	const pagesCount = Math.ceil(peopleTotalCount / limit)

	const pages = []

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	const handleClick = async (page: number) => {
		dispatch(getTable(limit, (page - 1) * limit))
		dispatch(pageNumberActions.change(page))
	}

	return (
		<div className="mt-8 text-xs">
			{pages.map(page => (
				<button
					key={page}
					type="button"
					className={`border border-gray-200 w-8 h-8 m-1 rounded ${
						pageNumber === page ? 'font-bold bg-gray-100' : 'bg-white'
					}`}
					onClick={() => handleClick(page)}
				>
					{page}
				</button>
			))}
		</div>
	)
}
