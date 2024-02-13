import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	chat: undefined,
};

const chatSlice = createSlice({
	name: 'chat',
	initialState: initialState,
	reducers: {
		updateChat(state, action) {
			state.chat = action.payload
		}
	}
})

export const {
	updateChat
} = chatSlice.actions;

export default chatSlice.reducer;