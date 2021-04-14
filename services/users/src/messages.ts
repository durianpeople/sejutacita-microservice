import {DependencyContainer} from "tsyringe";
import {MessageBroker} from "./MessageBroker";

function init_messages(container: DependencyContainer) {
    let message_bus: MessageBroker = container.resolve(MessageBroker)
    message_bus.init();
}

export = init_messages;