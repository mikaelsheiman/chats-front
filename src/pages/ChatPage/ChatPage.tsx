import "./ChatPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useChat} from "../../hooks/chats/useChat";
import moment from "moment";

const ChatPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {chat, fetchChat, setChat} = useChat()
    
    useEffect(() => {
        id && fetchChat(id)
        return () => {
            setChat(undefined)
        }
    }, [])

    if (chat == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/chats/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">
                    {console.log("sdadadad")}
                    <h2>{chat.name}</h2>

                    <br />

                    <span>Количество участников: {chat?.users_count}</span>
                    {
                        chat?.messages.map(message => {
                            return <span>[{moment(message.date_formation).format("HH:mm")}] {message.owner.name}: {message.text}</span>
                        })
                    }

                </div>


            </div>

        </div>
    )
}

export default ChatPage;