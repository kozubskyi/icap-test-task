'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { createPerson, deletePerson, updatePerson } from '@/services/table-api'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { getTable } from '@/services/table-api'
import IPerson from '@/models/IPerson'
import constants from '@/constants'
const { limit } = constants

type Props = {
	setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
	person?: IPerson | null
	setEditingPerson: React.Dispatch<React.SetStateAction<IPerson | null>>
}

export default function Modal({ setIsModalOpened, person, setEditingPerson }: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const pageNumber = useAppSelector(state => state.pageNumber)
	const dispatch = useAppDispatch()

	function correctDate() {
		if (!person) return

		const reversed = person.birthday_date.split('-').reverse()

		let year = reversed[0]

		reversed[0] = Number(year) >= 24 ? `19${year}` : `20${year}`

		const result = reversed.join('-')

		return result
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<IPerson>({
		mode: 'onTouched',
		defaultValues: {
			name: person ? person.name : '',
			email: person ? person.email : '',
			birthday_date: person ? correctDate() : '',
			phone_number: person ? person.phone_number : '',
			address: person ? person.address : '',
		},
	})

	const onChange = () => {
		setErrorMessage('')
	}

	const onSubmit: SubmitHandler<IPerson> = async data => {
		setIsLoading(true)

		const filteredData: any = {}

		Object.entries(data).forEach(([key, value]) => {
			if (value) filteredData[key] = value
		})

		try {
			if (person && person.id) {
				await updatePerson(person.id, filteredData)
			} else {
				await createPerson(filteredData)
			}

			dispatch(getTable(limit, (pageNumber - 1) * limit))

			setIsModalOpened(false)
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const message = Object.entries(error.response?.data)
					.map(([key, value]) => `${key}: ${value}`)
					.join(' ')
				setErrorMessage(`${error.message}. ${message}`)
			} else {
				setErrorMessage(error.message)
			}
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async () => {
		setIsLoading(true)

		try {
			if (person && person.id) {
				await deletePerson(person.id)
			}

			console.log('DELETED!')

			setIsModalOpened(false)
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const message = Object.entries(error.response?.data)
					.map(([key, value]) => `${key}: ${value}`)
					.join(' ')
				setErrorMessage(`${error.message}. ${message}`)
			} else {
				setErrorMessage(error.message)
			}
		} finally {
			setIsLoading(false)
		}
	}

	const handleCancel = () => {
		setIsModalOpened(false)
		setEditingPerson(null)
	}

	return (
		<div className="fixed inset-0 flex justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-gray-100 flex flex-col p-4 border border-gray-200 rounded-lg w-80"
			>
				<div className="flex flex-col">
					<label htmlFor="name">Name:</label>
					<input
						className="px-2 py-1 border border-gray-200 rounded-md"
						type="text"
						id="name"
						placeholder="Denys Kozubskyi"
						{...register('name', {
							required: 'Name is required',
							minLength: {
								value: 1,
								message: 'Name must be greater than 1 character',
							},
							maxLength: {
								value: 255,
								message: 'Name must be less than 255 characters',
							},
							onChange,
						})}
					/>
					<p className="h-4 text-red-500 text-xs ml-1">{errors?.name?.message}</p>
				</div>
				<div className="flex flex-col">
					<label htmlFor="email">Email:</label>
					<input
						className="px-2 py-1 border border-gray-200 rounded-md"
						type="email"
						id="email"
						placeholder="example@gmail.com"
						{...register('email', {
							required: 'Email is required',
							minLength: {
								value: 1,
								message: 'Email must be greater than 1 character',
							},
							maxLength: {
								value: 254,
								message: 'Email must be less than 254 characters',
							},
							onChange,
						})}
					/>
					<p className="h-4 text-red-500 text-xs ml-1">{errors?.email?.message}</p>
				</div>
				<div className="flex flex-col">
					<label htmlFor="birthday_date">Birthday date:</label>
					<input
						className="px-2 py-1 border border-gray-200 rounded-md text-gray-400"
						type="date"
						id="birthday_date"
						placeholder="YYYY-MM-DD"
						{...register('birthday_date', {
							required: 'Birthday date is required',
							pattern: /(\d{4})-(\d{2})-(\d{2})/,
							onChange,
						})}
					/>
					<p className="h-4 text-red-500 text-xs ml-1">{errors?.birthday_date?.message}</p>
				</div>
				<div className="flex flex-col">
					<label htmlFor="phone_number">Phone number:</label>
					<input
						className="px-2 py-1 border border-gray-200 rounded-md"
						type="text"
						id="phone_number"
						placeholder="0991234567"
						{...register('phone_number', {
							required: 'Phone number is required',
							minLength: {
								value: 1,
								message: 'Phone number must be greater than 1 character',
							},
							maxLength: {
								value: 20,
								message: 'Email must be less than 20 characters',
							},
							onChange,
						})}
					/>
					<p className="h-4 text-red-500 text-xs ml-1">{errors?.phone_number?.message}</p>
				</div>
				<div className="flex flex-col">
					<label htmlFor="address">Address:</label>
					<input
						className="px-2 py-1 border border-gray-200 rounded-md"
						type="text"
						id="address"
						placeholder="Boryspil, Kyiv region, Ukraine"
						{...register('address', {
							onChange,
						})}
					/>
					<p className="h-4 text-red-500 text-xs ml-1">{errors?.address?.message}</p>
				</div>
				<div className="mt-4">
					<button
						type="submit"
						className={`${
							isLoading ? 'bg-gray-400' : 'bg-green-600'
						} text-white font-semibold px-2 py-1 border border-gray-100 rounded-md`}
						disabled={!isValid || isLoading}
					>
						{person ? 'Update' : 'Create'}
					</button>
					{person && (
						<button
							type="button"
							className="text-white font-semibold px-2 py-1 border border-gray-100 bg-red-600 rounded-md ml-4"
							onClick={handleDelete}
						>
							Delete
						</button>
					)}
					<button
						type="button"
						className="border border-gray-200 bg-white px-2 py-1 rounded-md ml-4"
						onClick={handleCancel}
					>
						Cancel
					</button>
				</div>
				<p className="min-h-4 mt-2 text-red-500 text-xs ml-1">{errorMessage}</p>
			</form>
		</div>
	)
}
