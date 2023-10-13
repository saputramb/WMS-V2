import { DB_AUTH } from "../../../databases/database";
import { initModels } from "../../models/init-models";
import { GetUserFilters } from "./types";
import { Transaction, Op } from "sequelize";

const models = initModels(DB_AUTH);

export const getUser = async (transaction: Transaction, filters?: GetUserFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return await models.user.findAll({
        where: {
            ...(filters?.username && {
                username: filters?.username,
            }),
        },
        ...((filters?.username) && { paranoid: true }),
        transaction: trx
    });
}