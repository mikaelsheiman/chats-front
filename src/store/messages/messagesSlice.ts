import {createSlice} from "@reduxjs/toolkit"

const initialState= {
	status: -1,
	date_start: "2013-10-12",
	date_end: "2025-01-25",
	user: ""
};

const messagesSlice = createSlice({
	name: 'messages',
	initialState: initialState,
	reducers: {
		updateStatus(state, action) {
			state.status = action.payload
		},
		updateDateStart(state, action) {
			state.date_start = action.payload
		},
		updateDateEnd(state, action) {
			state.date_end = action.payload
		},
		updateUser(state, action) {
			state.user = action.payload
		}
	}
})

export const {updateStatus, updateDateStart, updateDateEnd, updateUser} = messagesSlice.actions;

export default messagesSlice.reducer;