import { Transaction } from "sequelize";
import * as authenticationDal from "../dal/authentication/authentication";
import { userCreationAttributes } from "databases/models/user";

export const signUp = (transaction: Transaction, payload: userCreationAttributes): Promise<any[]> => {
    const trx: Transaction = transaction;
    return authenticationDal.signUp(trx, payload);
}