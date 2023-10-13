import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

export interface RequestCustom extends Request {
    body: any
    query: any
    params: any
    username?: any
    role?: any
    headers: IncomingHttpHeaders & {
        customHeader?: string
    };
}

// const responseHandler = (req: RequestCustom, res: Response, next: NextFunction = null) => { }

// export default {
//     helper: () => responseHandler
// }