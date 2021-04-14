import {NextFunction, Request, Response} from "express";
import {Controller} from "expressjs-onion-provider";
import {MessageBroker} from "../../MessageBroker";
import {container} from "tsyringe";

export class IndexController extends Controller {

    public index(request: Request, response: Response, next: NextFunction) {
        let message_bus: MessageBroker = container.resolve(MessageBroker);
        message_bus.broadcast('TestEvent', Buffer.from(JSON.stringify({
            body: 'test'
        })))
        response.send('Users 3')
    }
}
