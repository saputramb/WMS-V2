import { DB_AUTH } from "../../database";
import { initModels, userCreationAttributes } from "../../models/init-models";
import { Transaction, Op } from "sequelize";

const models = initModels(DB_AUTH);

export const signUp = async (transaction: Transaction, payload: userCreationAttributes): Promise<any> => {
    const trx: Transaction = transaction;
    return await models.user.create(payload, {
        transaction: trx
    });
}