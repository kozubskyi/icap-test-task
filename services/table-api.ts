import axios, { AxiosResponse } from 'axios'
import { AppDispatch } from '@/redux/store'
import { tableDataActions } from '@/redux/features/tableDataSlice'
import constants from '@/constants'
import IPerson from '@/models/IPerson'

const baseUrl = 'https://technical-task-api.icapgroupgmbh.com/api/table/'

export const getTable = (limit = constants.limit, offset = 0) => {
	return async (dispatch: AppDispatch) => {
		try {
			const response: AxiosResponse<any> = await axios.get(`${baseUrl}?limit=${limit}&offset=${offset}`)

			dispatch(tableDataActions.fetch(response.data))
		} catch (error) {
			console.log({ error })
		}
	}
}

export const createPerson = async (person: IPerson) => {
	const response: AxiosResponse<any> = await axios.post(baseUrl, person)

	return response.data
}

export const updatePerson = async (id: number, person: IPerson) => {
	const response: AxiosResponse<any> = await axios.put(`${baseUrl}${id}/`, person)

	return response.data
}

export const deletePerson = async (id: number) => {
	const response: AxiosResponse<any> = await axios.delete(`${baseUrl}${id}/`)

	console.log({ response })

	return response.data
}
