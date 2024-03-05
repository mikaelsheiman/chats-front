import "./ChatList.sass"
import SearchBar from "../SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import ChatCard from "./ChatCard/ChatCard";
import {iChatsMock, requestTime} from "../../Consts";
import {Chat} from "../../Types";

const ChatList = () => {

    const [chats, setChats] = useState<Chat[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchChats = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/chats/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const chats = raw["chats"]

            setChats(chats)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setChats(iChatsMock.filter(chat => chat.name.toLowerCase().includes(query.toLowerCase())))

    }

    useEffect(() => {
        searchChats()
    }, [])

    const cards = chats.map(chat  => (
        <ChatCard chat={chat} key={chat.id} isMock={isMock}/>
    ))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await searchChats()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={handleSubmit}>

                <h2>Поиск чатов</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default ChatList;