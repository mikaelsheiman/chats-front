import "./ChatEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useChat} from "../../hooks/chats/useChat";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";
import {useChats} from "../../hooks/chats/useChats";

const ChatEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const {deleteChat} = useChats()

    const { id } = useParams<{id: string}>()

    const {
        chat,
        fetchChat,
        setName,
        setUsersCount,
        setImage
    } = useChat()

    useEffect(() => {
        id && fetchChat(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveChat = async() => {
        let form_data = new FormData()

        form_data.append('name', chat.name)
        form_data.append('users_count', chat.users_count)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`chats/${chat.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/chats/")
        }
    }

    const handleDeleteChat = async () => {

        const response = await deleteChat(chat.id)

        if (response.status == 200) {
            setImg(undefined)
            navigate("/chats/")
        }
    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (chat == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={chat.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange}>
                    Изменить фото
                </UploadButton>

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={chat.name} setValue={setName} />

                    {/* <CustomTextarea placeholder="Адрес" value={chat.users_count} setValue={setUsersCount} /> */}

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveChat}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={handleDeleteChat}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ChatEditPage