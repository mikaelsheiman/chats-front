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
		},
		updateName(state, action) {
			state.chat.name = action.payload
		},
		updateUsersCount(state, action) {
			state.chat.users_count = action.payload
		},
		updateImage(state, action) {
			state.chat.image = action.payload
		}
	}
})

export const {
	updateChat,
	updateName,
	updateUsersCount,
	updateImage
} = chatSlice.actions;

export default chatSlice.reducer;