import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";

export class AdminMiddleware {
    check(request: Request, response: Response, next: NextFunction) {
        if (!request.get('Token')) {
            throw Error('Token undefined');
        }

        let account = verify(<string>request.get('Token'), <string>process.env.JWT_SECRET)
        // @ts-ignore
        if (account.type !== 'admin') {
            throw Error('Access denied');
        }

        next()
    }
}