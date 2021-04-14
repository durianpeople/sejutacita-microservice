import {Channel, connect, Connection, Message} from "amqplib/callback_api";
import {singleton} from "tsyringe";
import {retry} from "ts-retry-promise";

@singleton()
export class MessageBroker {
    private channel: Channel | null;
    private listeners: Map<string, (message: Message) => void>;

    constructor() {
        this.channel = null;
        this.listeners = new Map<string, (message: Message) => void>();
    }

    init() {
        let initChannel: Promise<void> = retry(() => {
            return this.initChannel()
        }, {retries: 3, delay: 5000})

        initChannel.then(() => {
            console.log('Channel ready')
            this.channel?.assertExchange('broadcast', 'fanout');

            this.channel?.assertQueue('users', {exclusive: true, durable: true});
            this.channel?.bindQueue('users', 'broadcast', '')

            this.consume()
        });
    }

    private async initChannel() {
        const connectToRabbit = (url: string): Promise<Connection> => {
            return new Promise((resolve, reject) => {
                connect(url, function (err, connection) {
                    if (err)
                        return reject(err)

                    resolve(connection)
                })
            })
        };

        const getChannel = (connection: Connection): Promise<Channel> => {
            return new Promise((resolve, reject) => {
                connection.createChannel(function (err, channel) {
                    if (err)
                        return reject(err)

                    resolve(channel)
                })
            })
        }

        let connection: Connection = await connectToRabbit('amqp://root:root@rabbitmq');
        this.channel = await getChannel(connection);
    }

    broadcast(event_name: string, message: any) {
        this.channel?.publish('broadcast', 'users', message, {
            headers: {
                event_name: event_name
            }
        });
    }

    private consume() {
        let channel: Channel | null = this.channel;
        if (channel)
            console.log('Consumer ready')

        channel?.consume('users', async function (message) {

            if (message) {
                channel?.ack(message)

            }
        })
    }

    listen(event_name: string, callback: (message: Message) => void) {
        this.listeners.set(event_name, callback);
    }
}