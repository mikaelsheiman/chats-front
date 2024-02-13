import {useDispatch, useSelector} from 'react-redux';
import {
	updateMessage,
	updateMessageId,
	updateText,
} from "../../store/messages/messageSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useMessage() {

	const {access_token} = useToken()

	const message = useSelector(state => state.message.message)
	const message_id = useSelector(state => state.message.message_id)
	const text = useSelector(state => state.message.text)

	const navigate = useNavigate()

	const is_draft = message?.status == 1

	const dispatch = useDispatch()

	const setMessage = (value) => {
		dispatch(updateMessage(value))
	}

	const setText = (value) => {
		dispatch(updateText(value))
	}

	const setMessageId = (value) => {
		dispatch(updateMessageId(value))
	}

	const sendMessage = async () => {

		const response = await api.put(`messages/${message.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setMessage(undefined)
			setText(undefined)
		}
	}

	const deleteMessage = async () => {

		const response = await api.delete(`messages/${message.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setMessage(undefined)
			setText(undefined)
		}

	}

	const saveMessage = async () => {

		const form_data = new FormData()

		form_data.append('text', text)

		await api.put(`messages/${message.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchMessage = async (message_id) => {

		const {data} = await api.get(`messages/${message_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setMessage(data)
		setText(data["text"])
	}

	const addChatToMessage = async (chat) => {
		await api.post(`chats/${chat.id}/add_to_message/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteChatFromMessage = async (chat) => {
		const response = await api.delete(`messages/${message.id}/delete_chat/${chat.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200) {
			await fetchMessage(message_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		message,
		message_id,
		is_draft,
		text,
		setMessage,
		setText,
		saveMessage,
		sendMessage,
		deleteMessage,
		fetchMessage,
		addChatToMessage,
		deleteChatFromMessage,
		setMessageId
	};
}