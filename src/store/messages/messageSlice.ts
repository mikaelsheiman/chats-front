import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	message: undefined,
	message_id: undefined,
	text: undefined
};

const messageSlice = createSlice({
	name: 'message',
	initialState: initialState,
	reducers: {
		updateMessage(state, action) {
			state.message = action.payload
		},
		updateText(state, action) {
			state.text = action.payload
		},
		updateMessageId(state, action) {
			state.message_id = action.payload
		}
	}
})

export const {
	updateMessage,
	updateText,
	updateMessageId
} = messageSlice.actions;

export default messageSlice.reducer;