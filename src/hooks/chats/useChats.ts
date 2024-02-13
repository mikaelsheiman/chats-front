import {useDispatch, useSelector} from 'react-redux';
import {
	updateChats,
	updateQuery
} from "../../store/chats/chatsSlice";
import {api} from "../../utils/api";
import {useMessage} from "../messages/useMessage";
import {useToken} from "../users/useToken"

export function useChats() {
	const chats = useSelector(state => state.chats.chats)
	const query = useSelector(state => state.chats.query)

	const {access_token} = useToken()

	const {setMessage, setMessageId} = useMessage()

	const dispatch = useDispatch()

	const setChats = (value) => {
		dispatch(updateChats(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchChats = async () => {

		const {data} = await api.get(`chats/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_message_id = data["draft_message_id"]
		setMessageId(draft_message_id)

		if (!draft_message_id) {
			setMessage(undefined)
		}

		return data["chats"]
	}

	const deleteChat = async (chat_id) => {
		const response = await api.delete(`chats/${chat_id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		return response
	}


	return {
		chats,
		setChats,
		query,
		setQuery,
		searchChats,
		deleteChat
	};
}