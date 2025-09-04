import {
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	NodeOperationError,
	IHookFunctions,
	IDataObject,
} from 'n8n-workflow';
import { API, Zalo, ThreadType } from 'zalo-api-final';

let api: API | undefined;
let reconnectTimer: NodeJS.Timeout | undefined;

export class ZaloMessageTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo CN Message Trigger',
		name: 'zaloMessageTrigger',
		icon: 'file:../shared/zalo.svg',
		group: ['trigger'],
		version: 1,
		description: 'Sự kiện lắng nghe tin nhắn trên Zalo',
		defaults: {
			name: 'Zalo CN Message Trigger',
		},
		// @ts-ignore
		inputs: [],
		// @ts-ignore
		outputs: ['main'],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		credentials: [
			{
				name: 'zaloApi',
				required: true,
				displayName: 'Zalo Credential to connect with',
			},
		],
		properties: [
			{
				displayName: 'Event Types',
				name: 'eventTypes',
				type: 'multiOptions',
				options: [
					{
						name: 'User Messages',
						value: ThreadType.User,
						description: 'Lắng nghe tin nhắn từ người dùng',
					},
					{
						name: 'Group Messages',
						value: ThreadType.Group,
						description: 'Lắng nghe tin nhắn từ nhóm',
					},
				],
				default: [ThreadType.User, ThreadType.Group],
				required: true,
				description: 'Types of messages to listen for',
			},
			{
				displayName: 'Self Listen',
				name: 'selfListen',
				type: 'boolean',
				default: false,
				required: true,
				description: 'Whether to cho phép lắng nghe tin nhắn của chính mình tự gửi',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				return !!webhookData.isConnected;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const credentials = await this.getCredentials('zaloApi');

				if (!credentials) {
					throw new NodeOperationError(this.getNode(), 'No credentials found');
				}

				try {
					const cookieFromCred = JSON.parse(credentials.cookie as string);
					const imeiFromCred = credentials.imei as string;
					const userAgentFromCred = credentials.userAgent as string;

					const selfListen = this.getNodeParameter('selfListen', 0) as boolean;
					const zalo = new Zalo({ selfListen });
					api = await zalo.login({ cookie: cookieFromCred, imei: imeiFromCred, userAgent: userAgentFromCred });

					if (!api) {
						throw new NodeOperationError(
							this.getNode(),
							'No API instance found. Please make sure to provide valid credentials.',
						);
					}
                    const webhookUrl = this.getNodeWebhookUrl('default') as string;
                    console.log(webhookUrl);
					// Add message event listener
					api.listener.on('message', async (message) => {
						const webhookData = this.getWorkflowStaticData('node');
						// const eventTypes = webhookData.eventTypes as ThreadType[];
                        this.helpers.httpRequest({
                            method: 'POST',
                            url: webhookUrl,
                            body: {
                                message: message,
                            },
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
						// if (eventTypes.includes(message.type)) {
                        //     console.log(message);
							// Store message in static data to be processed by webhook method
						webhookData.lastMessage = message;
						// }
					});

					// Start listening
					api.listener.start();

					const webhookData = this.getWorkflowStaticData('node');
					webhookData.isConnected = true;
					webhookData.eventTypes = this.getNodeParameter('eventTypes', 0) as ThreadType[];

					return true;
				} catch (error) {
					throw new NodeOperationError(this.getNode(), 'Zalo connection failed');
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (api) {
					api.listener.stop();
					api = undefined;
				}

				if (reconnectTimer) {
					clearTimeout(reconnectTimer);
					reconnectTimer = undefined;
				}

				delete webhookData.isConnected;
				delete webhookData.eventTypes;
				delete webhookData.lastMessage;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const req = this.getRequestObject();
        const body = req.body;
        console.log(body);
		const webhookData = this.getWorkflowStaticData('node');
		const message = webhookData.lastMessage as IDataObject;
        console.log(message);


		// Clear the message after processing
		delete webhookData.lastMessage;


		return {
			workflowData: [this.helpers.returnJsonArray(req.body)],
		};
	}
}
