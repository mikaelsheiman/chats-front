import "./ChatCard.sass"
import {Chat} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.jpg"

const ChatCard = ({ chat, isMock }: {chat:Chat, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/chats/${chat.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img} />
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {chat.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/chats/${chat.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default ChatCard;