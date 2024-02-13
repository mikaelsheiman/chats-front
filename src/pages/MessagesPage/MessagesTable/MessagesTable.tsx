import React from "react";
import "./MessagesTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useMessages} from "../../../hooks/messages/useMessages";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import MessagesFilters from "../MessagesFilters/MessagesFilters";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../hooks/users/useAuth";
import {useToken} from "../../../hooks/users/useToken";
import {api} from "../../../utils/api";
import {format_check_spam_results} from "../../../utils/utils";

const MessagesTable = () => {

    const {access_token} = useToken()

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const {searchMessages} = useMessages()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Дата завершения",
            accessor: "date_complete",
            Cell: ({ value }) => {
                if (!value) {
                    return "Нет"
                }
                
                return moment(value).locale(ru()).format("D MMMM HH:mm")
            }
        },
        {
            Header: "Содержит спам?",
            accessor: "check_spam",
            Cell: ({ value }) => format_check_spam_results(value)
        }
    ]

    if (is_moderator) {
        columns.push(
            {
                Header: "Пользователь",
                accessor: "owner",
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "accept_button",
                Cell: ({ cell }) => (
                    cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptMessage(cell.row.values.id)}>Принять</CustomButton>
                )
            },
            {
                Header: "Действие",
                    accessor: "dismiss_button",
                Cell: ({ cell }) => (
                    cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissMessage(cell.row.values.id)}>Отклонить</CustomButton>
                )
            }
        )

    }

    const acceptMessage = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "3")

        const response = await api.put(`messages/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissMessage = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "4")

        const response = await api.put(`messages/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }
    
    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["messages"],
        () => searchMessages(),
        {
            refetchInterval: 2000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false
        }
    );

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

    const handleClick = (message_id) => {
        navigate(`/messages/${message_id}`)
    }

    return (
        <div className="messages-table-wrapper">

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <MessagesFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default MessagesTable