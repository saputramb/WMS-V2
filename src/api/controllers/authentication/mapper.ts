import { Authentication } from "../../interface";
// import { maintenanceOuput } from "../../../databases/models/maintenance";

export const toAuthentication = (authentication: any): Authentication => {
    return {
        id: authentication.id,
        name: authentication.name,
        username: authentication.username,
        email: authentication.email,
        password: authentication.password,
        role: authentication.role,
        status_user: authentication.status_user,
        status_notif: authentication.status_notif,
        refresh_token: authentication.refresh_token,
        createdAt: authentication.createdAt,
        updatedAt: authentication.updatedAt,
    }
}