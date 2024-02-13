import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import ChatPage from "./pages/ChatPage/ChatPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import MessageConstructor from "./components/MessageConstructor/MessageConstructor";
import MessagePage from "./pages/MessagePage/MessagePage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import ChatEditPage from "./pages/ChatEditPage/ChatEditPage";
import ChatAddPage from "./pages/ChatAddPage/ChatAddPage";
import ChatsTableWrapper from "./pages/ChatsPage/ChatsTableWrapper/ChatsTableWrapper";
import ChatsList from "./pages/ChatsPage/ChatsList/ChatsList";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("chats") && <MessageConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/messager">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/chats" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/chats" element={<ChatsList />} />

                                    <Route path="/chats-table" element={<ChatsTableWrapper />} />

                                    <Route path="/chats/add" element={<ChatAddPage />} />

                                    <Route path="/chats/:id" element={<ChatPage />} />

                                    <Route path="/chats/:id/edit" element={<ChatEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/messages/:id" element={<MessagePage />} />

                                    <Route path="/messages" element={<MessagesPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
