import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ResponseCustom } from "../helpers/response-handler";
import { RequestCustom } from "../helpers/request-handler";

export const verfiyToken = async (req: RequestCustom, res: ResponseCustom, next: NextFunction): Promise<any> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.failUnauthorized('No Tokens are Provided');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.failForbidden('Invalid Token');
        if(typeof decoded === 'object' && 'username' in decoded && 'role' in decoded) {
            req.username = decoded.username
            req.role = decoded.role
            next();
        }
    });
}