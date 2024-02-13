import {useDispatch, useSelector} from 'react-redux';
import {
	updateChat
} from "../../store/chats/chatSlice";
import {api} from "../../utils/api";

export function useChat() {
	const chat = useSelector(state => state.chat.chat);

	const dispatch = useDispatch()

	const setChat = (value) => {
		dispatch(updateChat(value))
	}

	const fetchChat = async (id) => {

		const {data} = await api.get(`chats/${id}`);

		setChat(data)

	};

	return {
		chat,
		setChat,
		fetchChat
	};
}