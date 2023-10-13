import { Transaction } from "sequelize";
import * as Service from "../../../databases/services/maintenance";
import { FilterMaintenanceDTO } from "../../dto/maintenance";
import { Maintenance } from "../../interface";
import * as mapper from "./mapper";

export const getMaintenance = async (transaction: Transaction, filters: FilterMaintenanceDTO): Promise<Maintenance[]> => {
    const trx: Transaction = transaction;
    return (await Service.getMaintenance(trx, filters)).map(mapper.toMaintenance);
}