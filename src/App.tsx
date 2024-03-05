import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {Fragment, useState} from "react";
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes,} from 'react-router-dom';
import ChatList from "./Components/ChatList/ChatList";
import ChatPage from "./Components/ChatPage/ChatPage";
import {Chat} from "./Types";
import DemoPage from "./Components/DemoPage/DemoPage";

function App() {

    const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined)

    return (
        <div className="App">

            <div className="wrapper">

                <Header />

                <div className={"content-wrapper"}>

                    <BrowserRouter basename="/chats-front">

                        <Routes>
                            
                            <Route path="/" element={<DemoPage></DemoPage>} />

                            <Route path="/chats/*" element={
                                <Fragment>
                                    <Breadcrumbs selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>
                                    <Routes>
                                        <Route path="/" element={<ChatList />} />
    
                                        <Route path="/:id" element={<ChatPage selectedChat={selectedChat} setSelectedChat={setSelectedChat} />} />
                                    </Routes>
                                </Fragment>
                            } />
                               
                        </Routes>

                        {/* <Breadcrumbs selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>

                        <Routes>

                            <Route path="/" element={<<Navigate to="/chats" replace />>} />

                            <Route path="/chats" element={<ChatList />} />

                            <Route path="/chats/:id" element={<ChatPage selectedChat={selectedChat} setSelectedChat={setSelectedChat} />} />

                        </Routes> */}

                    </BrowserRouter>

                </div>

            </div>

        </div>
    )
}

export default App
