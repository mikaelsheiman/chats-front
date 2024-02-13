import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {Link, useNavigate} from "react-router-dom";
import ChatsFilters from "../../ChatsFilters/ChatsFilters";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/consts";
import {useChats} from "../../../../hooks/chats/useChats";

const ChatsTable = ({isLoading, data, isSuccess, refetch}) => {

    const {deleteChat} = useChats()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Кол-во участников",
            accessor: "users_count",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Действие",
            accessor: "accept_button",
            Cell: ({ cell }) => (
                <Link to={`/chats/${cell.row.values.id}/edit`}>
                    <CustomButton bg={variables.secondary}>Редактировать</CustomButton>
                </Link>
            )
        },{
            Header: "Действие",
            accessor: "dismiss_button",
            Cell: ({ cell }) => (
                <CustomButton bg={variables.red} onClick={(e) => handleDeleteChat(cell.row.values.id)}>
                    Удалить
                </CustomButton>
            )
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openEditCityPage = (chat_id) => {
        navigate(`/chats/${chat_id}/`)
    }

    const handleDeleteChat = async (unit_id) => {
        await deleteChat(unit_id)
        refetch()
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <ChatsFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default ChatsTable