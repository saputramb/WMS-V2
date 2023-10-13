import { Transaction, Op } from "sequelize";
import { DB_AUTH } from "../../databases/database";
import { initModels } from "../../databases/models/init-models";
import * as jwt from "jsonwebtoken";
import { FilterAuthenticationDTO } from "../dto/authenticatoin";

const models = initModels(DB_AUTH);

export const createToken = async (transaction: Transaction, filters?: FilterAuthenticationDTO): Promise<any> => {
    const trx: Transaction = transaction;
    const checkUsername = await models.user.findOne({
        where: {
            ...(filters?.username && {
                username: filters?.username
            }),
            ...(filters?.email && {
                email: filters?.email
            })
        },
        ...((filters?.username || filters?.email) && { paranoid: true }),
        transaction: trx
    });
    const accessToken = jwt.sign({
        id: checkUsername.id,
        name: checkUsername.name,
        username: checkUsername.username,
        email: checkUsername.email,
        role: checkUsername.role
    }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: '1h',
    });
    const refreshToken = jwt.sign({
        id: checkUsername.id,
        name: checkUsername.name,
        username: checkUsername.username,
        email: checkUsername.email,
        role: checkUsername.role
    }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: '1d',
    });
    return { accessToken, refreshToken };
}