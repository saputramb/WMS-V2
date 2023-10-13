import { Transaction } from "sequelize";
import * as Service from "../../../databases/services/authentication";
import { CreateAuthenticationDTO } from "../../dto/authenticatoin";
import { Authentication } from "../../interface";
import * as mapper from "./mapper";

export const signUp = async (transaction: Transaction, payload: CreateAuthenticationDTO): Promise<Authentication> => {
    const trx: Transaction = transaction;
    return mapper.toAuthentication(await Service.signUp(trx, payload));
}