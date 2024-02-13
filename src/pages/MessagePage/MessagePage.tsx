import {useEffect} from "react";
import {useMessage} from "../../hooks/messages/useMessage";
import {useNavigate, useParams} from "react-router-dom"
import ChatCard from "../../components/ChatCard/ChatCard";
import "./MessagePage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import {format_check_spam_results} from "../../utils/utils";

const MessagePage = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {message, text, setText, fetchMessage, saveMessage, sendMessage, deleteMessage, setMessage, setMessageId} = useMessage()

    useEffect(() => {

        if (!id || !is_authenticated) {
            navigate("/")
        }

        setMessageId(id)
        fetchMessage(id)

        return () => {
            setMessage(undefined)
            setText(undefined)
        };
    }, [])

    if (message == undefined)
    {
        return (
            <div className="message-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendMessage = async() => {
        await saveMessage()
        await sendMessage()
        navigate("/messages")
    }

    const onDeleteMessage = async () => {
        await deleteMessage()
        navigate("/chats")
    }

    const cards = message.chats.map(chat  => (
        <ChatCard chat={chat} key={chat.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveMessage} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendMessage} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteMessage} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = message.status == 1

    const completed = [3, 4].includes(message.status)

    return (
        <div className="message-page-wrapper">

            <div className="message-chats-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая рассылка" :  "Сообщение №" + message.id}</h3>
                </div>

                <div className="message-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == message.status).name}</span>
                    {[2, 3, 4].includes(message.status) && <span>Результат проверки на спам: {format_check_spam_results(message.check_spam)}</span> }
                    <span>Дата создания: {moment(message.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(message.status) && <span>Дата формирования: {moment(message.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(message.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                </div>

                <div className="inputs-container">

                    <CustomTextarea placeholder="Текст сообщения" value={text} setValue={setText} disabled={!is_draft}  />

                </div>

                <div className="title">
                    <h3>Чаты</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default MessagePage