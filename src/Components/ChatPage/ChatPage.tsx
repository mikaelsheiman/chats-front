import "./ChatPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iChatsMock, requestTime} from "../../Consts";
import {Chat} from "../../Types";
import mockImage from "/src/assets/mock.jpg"

const ChatPage = ({ selectedChat, setSelectedChat }: { selectedChat:Chat | undefined, setSelectedChat: Dispatch<Chat| undefined>}) => {

    const { id } = useParams<{id: string}>();

    if (id == undefined){
        return;
    }

    const [isMock, setIsMock] = useState<boolean>(false);

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/chats/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const chat: Chat = await response.json()

            setSelectedChat(chat)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedChat(iChatsMock.find((chat:Chat) => chat?.id == parseInt(id)))
        setIsMock(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const img = `http://127.0.0.1:8000/api/chats/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img} />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedChat?.name}</h2>

                    <br />

                    <span>Количество участников: {selectedChat?.users_count}</span>

                </div>

            </div>

        </div>
    )
}

export default ChatPage;