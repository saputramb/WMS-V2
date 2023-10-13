import express, { Request, Response } from 'express';
import * as maintenanceController from "../controllers/maintenance";
import { FilterMaintenanceDTO } from "../dto/maintenance";
import { DB_AUTH } from '../../databases/database';
import { ResponseCustom } from '../helpers/response-handler';
import { Transaction } from 'sequelize';
import { verfiyToken } from "../middlewares/token-verification";

export default (router: express.Router) => {
    router.get('/maintenance', verfiyToken, getMaintenance);
};

const getMaintenance = async (req: Request, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB_AUTH.transaction();
        const filters: FilterMaintenanceDTO = req.query;
        console.log(filters);
        const result = await maintenanceController.getMaintenance(trx, filters);
        if (result.length === 0) return res.failValidationError('No Data');
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
