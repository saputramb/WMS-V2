import express, { Request, Response } from 'express';
import * as authenticationController from "../controllers/authentication";
import { CreateAuthenticationDTO, FilterAuthenticationDTO } from "../dto/authenticatoin";
import { DB_AUTH } from '../../databases/database';
import { ResponseCustom } from '../helpers/response-handler';
import { Transaction } from 'sequelize';
import { hash, genSalt } from "bcrypt";
import * as validationAuthentication from "../middlewares/validation-authentication";
import { createToken } from "../middlewares/create-token";
import { cookieOption } from '../middlewares/cookie-option';

export default (router: express.Router) => {
    router.post('/sign-up', signUp);
    router.post('/sign-in', signIn);
};

const signUp = async (req: Request, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB_AUTH.transaction();
        const payload: CreateAuthenticationDTO = req.body;

        // Check Username Exist
        const usernameExist = await validationAuthentication.checkUsernameExist(trx, payload.username);
        if (usernameExist) return res.failValidationError('Username Has Been Registered');

        // Check Email Exist
        const emailExist = await validationAuthentication.checkEmailExist(trx, payload.email);
        if (emailExist) return res.failValidationError('Email Has Been Registered');

        // Check Username Payload
        const regex: RegExp = /^[a-zA-Z0-9]+$/;
        if (regex.test(payload.username) == false) return res.failValidationError('Usernames May Only Consist of Letters and Numbers');
        if (payload.username.length < 5) return res.failValidationError('Username is too Short');
        if (payload.username.length > 15) return res.failValidationError('Username is too Long');

        // Check Email Payload
        if (!payload.email.includes('@')) return res.failValidationError('Invalid Email');

        // Hashing Password
        let password: string = 'WMS#';
        const characters: string = String(process.env.RANDOM_PASSWORD);
        const charactersLength: number = characters.length;
        let counter: number = 0;
        while (counter < 5) {
            password += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        const salt = await genSalt();
        const hashPassword = await hash(password, salt);
        payload.password = hashPassword;

        const result = await authenticationController.signUp(trx, payload);
        delete result.id;
        delete result.password;
        delete result.status_user;
        delete result.status_notif;
        delete result.refresh_token;
        delete result.createdAt;
        delete result.updatedAt;
        await trx.commit();
        return res.respondCreated(result, 'Account Successfully Registered');
    } catch (error) {
        if (trx) {
            await trx.rollback();
            res.failValidationError(error.message);
        }
    } finally {
        console.log('Execution has finished');
    }
}

const signIn = async (req: Request, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB_AUTH.transaction();
        const filters: FilterAuthenticationDTO = req.body;
        const payload: CreateAuthenticationDTO = req.body;

        // Check Username Exist
        if (payload.username !== undefined) {
            const usernameExist = await validationAuthentication.checkUsernameExist(trx, payload.username);
            if (!usernameExist) return res.failAccessDenied('Username Not Found');
        }

        // Check Email Exist
        if (payload.email !== undefined) {
            const emailExist = await validationAuthentication.checkEmailExist(trx, payload.email);
            if (payload.email !== undefined && !emailExist) return res.failAccessDenied('Email Not Found');
        }

        // Check Password
        const match = await validationAuthentication.checkPassword(trx, payload, filters);
        if (!match) return res.failAccessDenied('Password Wrong');

        // Create Token Secret
        const token = await createToken(trx, filters);
        const accessToken = token.accessToken
        const refreshToken = token.refreshToken

        // Only set Secure to True in Production
        if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
        
        // Send Refresh Token in Cookie
        res.cookie('refreshToken', refreshToken, cookieOption);
        res.cookie('loggedIn', true, {
            ...cookieOption,
            httpOnly: false
        });

        return res.respondRead(accessToken, 'Login Successfully');
    } catch (error) {
        if (trx) {
            await trx.rollback();
            res.failServerError(error.message);
        }
    } finally {
        console.log('Execution has finished');
    }
}