import { Transaction } from "sequelize";
import * as Service from "../../../databases/services/user";
import { FilterUserDTO } from "../../dto/user";
import { User } from "../../interface";
import * as mapper from "./mapper";

export const getUser = async (transaction: Transaction, filters?: FilterUserDTO): Promise<User[]> => {
    const trx: Transaction = transaction;
    return (await Service.getUser(trx, filters || null)).map(mapper.toUser);
}