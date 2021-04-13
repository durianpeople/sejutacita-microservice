import {NextFunction, Request, Response} from "express";
import {Controller} from "expressjs-onion-provider";

export class IndexController extends Controller {
    public index(request: Request, response: Response, next: NextFunction) {
        response.send('Auth')
    }
}
