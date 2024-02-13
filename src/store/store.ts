import {configureStore} from "@reduxjs/toolkit";

import chatReducer from "./chats/chatSlice"
import draftMessageReducer from "./messages/messageSlice"
import authReducer from "./users/authSlice"
import messagesReducer from "./messages/messagesSlice"
import chatsReducer  from "./chats/chatsSlice"

export default configureStore({
	reducer: {
		chat: chatReducer,
		chats: chatsReducer,
		message: draftMessageReducer,
		messages: messagesReducer,
		user: authReducer
	}
});