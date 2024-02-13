import "./ChatsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useChats} from "../../../hooks/chats/useChats";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const ChatsFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useChats()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="chats-filters">

            <h2>Поиск чатов</h2>

            <div className="right-container" >

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default ChatsFilters