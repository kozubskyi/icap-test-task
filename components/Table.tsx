'use client'

import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { getTable } from '@/services/table-api'
import { Icon } from '@iconify/react/dist/iconify.js'
import Modal from './Modal'
import IPerson from '@/models/IPerson'

export default function Table() {
	const [isModalOpened, setIsModalOpened] = useState(false)
	const [editingPerson, setEditingPerson] = useState<IPerson | null>(null)
	const { count, results } = useAppSelector(state => state.tableData)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getTable())
	}, [dispatch, getTable])

	const handleEditButtonClick = (person: IPerson) => {
		setEditingPerson(person)
		setIsModalOpened(true)
	}

	return (
		<>
			<p className="mb-4">People total count: {count ?? 0}</p>
			{results ? (
				<div>
					<table className="block border border-gray-200 mx-auto rounded-t-3xl text-xs">
						<thead>
							<tr className="bg-gray-100 text-left">
								<th className="p-4 rounded-ss-3xl">Name</th>
								<th className="p-4">Email</th>
								<th className="p-4">Birthday date</th>
								<th className="p-4">Phone number</th>
								<th className="p-4">Address</th>
								<th className="p-4 rounded-se-3xl">Edit</th>
							</tr>
						</thead>
						<tbody>
							{results.map(person => {
								const { id, name, birthday_date, phone_number, email, address } = person

								return (
									<tr key={id} className="border-t border-gray-200">
										<td className="px-4 py-2">{name}</td>
										<td className="px-4 py-2">{email}</td>
										<td className="px-4 py-2">{birthday_date}</td>
										<td className="px-4 py-2">{phone_number}</td>
										<td className="px-4 py-2">{address}</td>
										<td className="px-4 py-2">
											<button
												type="button"
												className="bg-transparent border border-gray-200 rounded p-1"
												onClick={() => handleEditButtonClick(person)}
											>
												<Icon icon="line-md:pencil-twotone-alt" color="rgb(215, 218, 224)" fontSize={18} />
											</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					<button
						type="button"
						className="bg-gray-100 border-l border-r border-b border-gray-200 p-4 rounded-b-3xl w-full text-xs"
						onClick={() => setIsModalOpened(true)}
					>
						Add person
					</button>
				</div>
			) : (
				'Loading...'
			)}
			{isModalOpened && (
				<Modal setIsModalOpened={setIsModalOpened} person={editingPerson} setEditingPerson={setEditingPerson} />
			)}
		</>
	)
}
