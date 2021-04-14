import {DependencyContainer} from "tsyringe";
import {MessageBroker} from "./MessageBroker";

function init_messages(container: DependencyContainer) {
    let message_broker: MessageBroker = container.resolve(MessageBroker)
    message_broker.init();

    message_broker.listen('TestEvent', (message) => {
        console.log(message.content.toString())
    })
}

export = init_messages;