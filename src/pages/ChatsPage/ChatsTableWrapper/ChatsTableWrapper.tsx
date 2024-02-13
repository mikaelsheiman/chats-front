import {useChats} from "../../../hooks/chats/useChats";
import {useQuery} from "react-query";
import ChatsTable from "./ChatsTable/ChatsTable";

const ChatsTableWrapper = () => {

    const {searchChats} = useChats()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["chats"],
        () => searchChats(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <ChatsTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default ChatsTableWrapper