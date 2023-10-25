import axios, { AxiosResponse } from 'axios'
import { Inputs } from '@/components/LoginForm'

export const login = async (data: Inputs) => {
	const response: AxiosResponse<any> = await axios.post('https://technical-task-api.icapgroupgmbh.com/api/login/', data)

	return response.data
}
