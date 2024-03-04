import {useDispatch, useSelector} from 'react-redux';
import {
	updateChat,
	updateName,
	updateUsersCount,
	updateImage,
	updateMessages
} from "../../store/chats/chatSlice";
import {api} from "../../utils/api";

export function useChat() {
	const chat = useSelector(state => state.chat.chat);

	const dispatch = useDispatch()

	const setChat = (value) => {
		dispatch(updateChat(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setUsersCount = (value) => {
		dispatch(updateUsersCount(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const setMessages = (value) => {
		dispatch(updateMessages(value))
	}

	const fetchChat = async (id) => {

		const {data} = await api.get(`chats/${id}`);

		setChat(data)

	};

	return {
		chat,
		setChat,
		fetchChat,
		setName,
		setUsersCount,
		setImage,
		setMessages
	};
}