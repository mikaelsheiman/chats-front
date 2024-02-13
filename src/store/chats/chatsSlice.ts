import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	chats: [],
	query: ""
};

const chatsSlice = createSlice({
	name: 'chats',
	initialState: initialState,
	reducers: {
		updateChats(state, action) {
			state.chats = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateChats,
	updateQuery
} = chatsSlice.actions;

export default chatsSlice.reducer;