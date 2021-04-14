import {Controller} from "expressjs-onion-provider";
import {Request, Response} from "express";
import {CreateUserRequest} from "../../Core/Application/CreateUser/CreateUserRequest";
import {CreateUserService} from "../../Core/Application/CreateUser/CreateUserService";
import {container} from "tsyringe";
import {FindUserRequest} from "../../Core/Application/FindUser/FindUserRequest";
import {FindUserService} from "../../Core/Application/FindUser/FindUserService";
import {ListUserService} from "../../Core/Application/ListUser/ListUserService";

export class UserController extends Controller {
    create(request: Request, response: Response) {
        let req: CreateUserRequest = new CreateUserRequest(request.body.username, request.body.password);
        let service: CreateUserService = container.resolve(CreateUserService);

        service.execute(req);

        return response.status(200)
    }

    find(request: Request, response: Response) {
        let req: FindUserRequest = new FindUserRequest(request.body.id);
        let service: FindUserService = container.resolve(FindUserService)

        service.execute(req).then((result) => {
            return response.json(result)
        }).catch(() => {
            return response.status(500);
        })
    }

    list(request: Request, response: Response) {
        let service: ListUserService = container.resolve(ListUserService)

        service.execute().then((result) => {
            return response.json(result)
        }).catch(() => {
            return response.status(500);
        })
    }
}