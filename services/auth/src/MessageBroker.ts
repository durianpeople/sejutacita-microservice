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

            this.channel?.assertQueue('auth', {exclusive: true, durable: true});
            this.channel?.bindQueue('auth', 'broadcast', '')

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
        this.channel?.publish('broadcast', 'auth', message, {
            headers: {
                event_name: event_name
            }
        });
    }

    private consume() {
        if (this.channel)
            console.log('Consumer ready')

        this.channel?.consume('auth', async (message) => {
            if (message) {
                let listener = this.listeners.get(message.properties.headers.event_name);
                if (listener) {
                    listener(message)
                }
                this.channel?.ack(message)
            }
        })
    }

    listen(event_name: string, callback: (message: Message) => void) {
        if (this.listeners.has(event_name)) {
            throw new Error('Event is already listened');
        }
        this.listeners.set(event_name, callback);
    }
}