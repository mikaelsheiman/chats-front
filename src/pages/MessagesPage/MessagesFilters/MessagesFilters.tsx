import "./MessagesFilters.sass"
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu";
import {ADMIN_STATUSES, USER_STATUSES, variables} from "../../../utils/consts";
import {useAuth} from "../../../hooks/users/useAuth";
import {useMessages} from "../../../hooks/messages/useMessages";
import CustomDatePicker from "../../../components/CustomDatePicker/CustomDatePicker";
import CustomButton from "../../../components/CustomButton/CustomButton";

const MessagesFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {status, setStatus, date_start, setDateStart, date_end, setDateEnd} = useMessages()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="filters-wrapper">

            <div className="top-container">

                <h3>История рассылок</h3>

            </div>

            <form className="bottom-container" onSubmit={handleSubmit}>

                <DropdownMenu
                    width={175}
                    options={is_moderator ? ADMIN_STATUSES : USER_STATUSES}
                    selectedOption={status}
                    setSelectedOption={(id) => {
                        setStatus(id)
                    }}
                />

                <CustomDatePicker placeholder="От" value={date_start} setValue={setDateStart}/>

                <CustomDatePicker placeholder="До" value={date_end} setValue={setDateEnd}/>

                <CustomButton bg={variables.primary}>
                    Применить
                </CustomButton>

            </form>

        </div>
    )
}

export default MessagesFilters