import express, { Request, Response } from 'express';
import * as userController from "../controllers/user";
import { FilterUserDTO } from "../dto/user";
import { DB_AUTH } from '../../databases/database';
import { ResponseCustom } from '../helpers/response-handler';
import { RequestCustom } from '../helpers/request-handler';
import { Transaction } from 'sequelize';
import { verfiyToken } from "../middlewares/token-verification";

export default (router: express.Router) => {
    router.get('/users', verfiyToken, getUser);
};

const getUser = async (req: RequestCustom, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB_AUTH.transaction();
        const { username, role } = req;
        const filters: FilterUserDTO = { username };
        console.log(role)
        let result;
        if(role !== 'power_user' && role !== 'admin') result = await userController.getUser(trx, filters);
        else result = await userController.getUser(trx);
        if (result.length === 0) return res.failNoData('No Data');
        await trx.commit();
        return res.respondRead(result, 'Data Retrieved Successfully');
    } catch (error) {
        if (trx) {
            await trx.rollback();
            res.failServerError(error.message);
        }
    } finally {
        console.log('Execution has finished');
    }
}
