import { User } from "../../interface";
// import { maintenanceOuput } from "../../../databases/models/maintenance";

export const toUser = (user: any): User => {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        status_user: user.status_user,
        status_notif: user.status_notif,
        refresh_token: user.refresh_token,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
}