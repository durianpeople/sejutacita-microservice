import {Controller} from "expressjs-onion-provider";
import {Request, Response} from "express";
import {CreateUserRequest} from "../../Core/Application/CreateUser/CreateUserRequest";
import {CreateUserService} from "../../Core/Application/CreateUser/CreateUserService";
import {container} from "tsyringe";
import {FindUserRequest} from "../../Core/Application/FindUser/FindUserRequest";
import {FindUserService} from "../../Core/Application/FindUser/FindUserService";
import {ListUserService} from "../../Core/Application/ListUser/ListUserService";
import {UpdateUserRequest} from "../../Core/Application/UpdateUser/UpdateUserRequest";
import {UpdateUserService} from "../../Core/Application/UpdateUser/UpdateUserService";
import {DeleteUserRequest} from "../../Core/Application/DeleteUser/DeleteUserRequest";
import {DeleteUserService} from "../../Core/Application/DeleteUser/DeleteUserService";

export class UserController extends Controller {
    create(request: Request, response: Response) {
        let req: CreateUserRequest = new CreateUserRequest(request.body.username, request.body.password);
        let service: CreateUserService = container.resolve(CreateUserService);

        service.execute(req).then(() => {
            response.sendStatus(201)
        });
    }

    find(request: Request, response: Response) {
        let req: FindUserRequest = new FindUserRequest(request.body.id);
        let service: FindUserService = container.resolve(FindUserService)

        service.execute(req).then((result) => {
            response.json(result)
        }).catch(() => {
            response.sendStatus(500);
        })
    }

    list(request: Request, response: Response) {
        let service: ListUserService = container.resolve(ListUserService)

        service.execute().then((result) => {
            response.json(result)
        }).catch(() => {
            response.sendStatus(500);
        })
    }

    update(request: Request, response: Response) {
        let req: UpdateUserRequest = new UpdateUserRequest(request.params.id, request.body.username, request.body.old_password ?? null, request.body.new_password ?? null);
        let service: UpdateUserService = container.resolve(UpdateUserService)

        service.execute(req).then(() => {
            response.sendStatus(200)
        }).catch((err) => {
            if (err.code == UpdateUserService.USER_NOT_FOUND) {
                response.sendStatus(404);
            }
            response.sendStatus(500);
        })
    }

    delete(request: Request, response: Response) {
        let req: DeleteUserRequest = new DeleteUserRequest(request.params.id);
        let service: DeleteUserService = container.resolve(DeleteUserService)

        service.execute(req).then(() => {
            response.sendStatus(200)
        }).catch((err) => {
            if (err.code === DeleteUserService.USER_NOT_FOUND) {
                response.sendStatus(404);
            }
            console.log(err)
            response.sendStatus(500);
        })
    }
}