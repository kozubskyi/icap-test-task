import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IPerson from '@/models/IPerson'

type State = {
	count: number
	next: string | null
	previous: string | null
	results: IPerson[]
}

const initialState = {} as State

const tableData = createSlice({
	name: 'tableData',
	initialState,
	reducers: {
		fetch: (state, action: PayloadAction<State>) => (state = action.payload),
	},
})

export const tableDataActions = tableData.actions
export default tableData.reducer
