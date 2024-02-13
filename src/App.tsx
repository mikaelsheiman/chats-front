import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {useState} from "react";
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ChatList from "./Components/ChatList/ChatList";
import ChatPage from "./Components/ChatPage/ChatPage";
import {Chat} from "./Types";

function App() {

    const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined)

    return (
        <div className="App">

            <div className="wrapper">

                <Header />

                <div className={"content-wrapper"}>

                    <BrowserRouter basename="/messager">

                        <Breadcrumbs selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/chats" replace />} />

                            <Route path="/chats" element={<ChatList />} />

                            <Route path="/chats/:id" element={<ChatPage selectedChat={selectedChat} setSelectedChat={setSelectedChat} />} />

                        </Routes>

                    </BrowserRouter>

                </div>

            </div>

        </div>
    )
}

export default App
