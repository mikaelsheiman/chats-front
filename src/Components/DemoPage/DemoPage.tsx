import "./DemoPage.sass"
import {Link,} from "react-router-dom";
import reactImage from "/src/assets/react.svg"

const DemoPage = ({}: {}) => {

    return (
        <div className="page-details-wrapper">

            <img src={reactImage} alt="" />
            <p>
                Разработанная система «Онлайн Мессенджер®» позволяет пользователям быстро и удобно формировать заявки на рассылки сообщений по чатам. 
            </p>

            <Link className="enter-link" to="/chats">
                Начать
            </Link>

        </div>
    )
}

export default DemoPage;