import { Optional } from "sequelize"

export type CreateAuthenticationDTO = {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string;
    status_user: boolean;
    status_notif: boolean;
    refresh_token?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type FilterAuthenticationDTO = {
    username?: boolean
    email?: boolean
}