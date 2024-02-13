import MessagesTable from "./MessagesTable/MessagesTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const MessagesPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/chats")
        }
    }, [])

    return (
        <div>
            <MessagesTable />
        </div>
    )
}

export default MessagesPage;

