import "./ChatCard.sass"
import {Chat} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useMessage} from "../../hooks/messages/useMessage";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useChats} from "../../hooks/chats/useChats";

const ChatCard = ({ chat, refetch }: {chat:Chat}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addChatToMessage, deleteChatFromMessage} = useMessage()

    const {deleteChat} = useChats()

    const handleAddChat = async (e) => {
        e.preventDefault()
        await addChatToMessage(chat)
        refetch()
    }

    const handleDeleteChatFromMessage = async (e) => {
        e.preventDefault()
        await deleteChatFromMessage(chat)
    }

    const handleDeleteChat = async (e) => {
        e.preventDefault()
        await deleteChat(chat)
        refetch()
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={chat.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {chat.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/chats/${chat.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>

                    {is_authenticated && !is_moderator && location.pathname.includes("chats") &&
                        <CustomButton onClick={handleAddChat} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("messages") &&
                        <CustomButton onClick={handleDeleteChatFromMessage} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default ChatCard;