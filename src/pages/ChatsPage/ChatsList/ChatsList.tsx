import "./ChatsList.sass"
import ChatCard from "../../../components/ChatCard/ChatCard";
import {useChats} from "../../../hooks/chats/useChats";
import {useQuery} from "react-query";
import ChatsFilters from "../ChatsFilters/ChatsFilters";

const ChatsList = () => {

    const {searchChats} = useChats()

    const { isLoading, data, refetch } = useQuery(
        ["chats"],
        () => searchChats(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(chat  => (
        <ChatCard chat={chat} key={chat.id} refetch={refetch}/>
    ))

    return (
        <div className="chats-list-wrapper">

            <ChatsFilters refetch={refetch}/>

            <div className="chats-list">
                { cards }
            </div>

        </div>
    )
}

export default ChatsList;