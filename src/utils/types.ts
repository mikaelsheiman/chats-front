export interface Chat {
    id: number,
    name: string,
    status: number,
    users_count: number,
    image: string
}

export interface User {
    id: number,
    name: string,
    email: string
}

export interface Message {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    text: string
}

export interface Option {
    id: number,
    name: string
}