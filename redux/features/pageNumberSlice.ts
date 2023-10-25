import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import IPerson from '@/models/IPerson'

const initialState: number = 1

const pageNumber = createSlice({
	name: 'pageNumber',
	initialState,
	reducers: {
		change: (state, action: PayloadAction<number>) => (state = action.payload),
	},
})

export const pageNumberActions = pageNumber.actions
export default pageNumber.reducer
