import "./MessageConstructor.sass"
import {useMessage} from "../../hooks/messages/useMessage";
import {Link} from "react-router-dom";

const MessageConstructor = () => {

    const {message_id} = useMessage()

    if (message_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая рассылка</span>
            </div>
        )
    }

    return (
        <Link to={`/messages/${message_id}`} className="constructor-container">
            <span className="title">Новая рассылка</span>
        </Link>
    )
}

export default MessageConstructor