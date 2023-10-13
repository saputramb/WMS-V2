import { DB_AUTH } from "../../../databases/database";
import { initModels } from "../../models/init-models";
import { GetMaintenanceStatusFilters } from "./types";
import { Transaction, Op } from "sequelize";

const models = initModels(DB_AUTH);

export const getMaintenance = async (transaction: Transaction, filters?: GetMaintenanceStatusFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return await models.maintenance.findAll({
        where: {
            ...(filters?.maintenance_status && {
                maintenance_status: filters?.maintenance_status,
            }),
            ...(filters?.maintenance_remarks && {
                maintenance_remarks: filters?.maintenance_remarks,
            })
        },
        ...((filters?.maintenance_status || filters?.maintenance_remarks) && { paranoid: true }),
        transaction: trx
    });
}