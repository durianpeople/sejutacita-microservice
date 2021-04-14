import {Controller} from "expressjs-onion-provider";
import {Request, Response} from "express";
import {container} from "tsyringe";
import {LoginRequest} from "../../Core/Application/Login/LoginRequest";
import {LoginService} from "../../Core/Application/Login/LoginService";

export class AuthController extends Controller {
    login(request: Request, response: Response) {
        let req: LoginRequest = new LoginRequest(request.body.username, request.body.password);
        let service: LoginService = container.resolve(LoginService)

        service.execute(req).then((result) => {
            response.json({
                jwt: result
            })
        }).catch((err) => {
            if (err.code === LoginService.USER_NOT_FOUND) {
                response.sendStatus(404);
            } else if (err.code === LoginService.PASSWORD_INCORRECT) {
                response.sendStatus(401);
            }
            console.log(err)
            response.sendStatus(500);
        })
    }
}