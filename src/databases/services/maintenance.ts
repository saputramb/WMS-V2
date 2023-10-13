import { Transaction } from "sequelize";
import * as maintenanceDal from "../dal/maintenance/maintenance";
import { GetMaintenanceStatusFilters } from "../dal/maintenance/types";
// import { maintenanceOuput } from "../models/maintenance";

export const getMaintenance = (transaction: Transaction, filters: GetMaintenanceStatusFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return maintenanceDal.getMaintenance(trx, filters)
}