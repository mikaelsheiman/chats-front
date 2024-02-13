import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/messages/messagesSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useMessages() {
	const status = useSelector(state => state.messages.status)
	const date_start = useSelector(state => state.messages.date_start)
	const date_end = useSelector(state => state.messages.date_end)
	const user = useSelector(state => state.messages.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchMessages = async () => {

		const {data} = await api.get(`messages/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(message => message.owner.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchMessages,
		setDateStart,
		setDateEnd,
		setUser
	};
}