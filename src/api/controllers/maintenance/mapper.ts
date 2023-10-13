import { Maintenance } from "../../interface";
// import { maintenanceOuput } from "../../../databases/models/maintenance";

export const toMaintenance = (maintenance: any): Maintenance => {
    return {
        id: maintenance.id,
        maintenance_date: maintenance.maintenance_date,
        maintenance_status: maintenance.maintenance_status,
        maintenance_remarks: maintenance.maintenance_remarks,
        createdAt: maintenance.createdAt,
        updatedAt: maintenance.updatedAt,
    }
}