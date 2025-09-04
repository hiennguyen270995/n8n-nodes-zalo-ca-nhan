import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';
import { API, Zalo } from 'zalo-api-final';

let api: API | undefined;

export class ZaloSendSticker implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Gửi Sticker',
		name: 'zaloSendSticker',
		group: ['Zalo'],
		version: 1,
		description: 'Gửi sticker đến người dùng hoặc nhóm trên Zalo',
		defaults: {
			name: 'Zalo Gửi Sticker',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		icon: 'file:../shared/zalo.svg',
		credentials: [
			{
				name: 'zaloApi',
				required: true,
				displayName: 'Zalo Credential to connect with',
			},
		],
		properties: [
			{
				displayName: 'ID Người Nhận',
				name: 'receiverId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID của người dùng hoặc nhóm cần gửi sticker',
			},
			{
				displayName: 'ID Sticker',
				name: 'stickerId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID của sticker cần gửi',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		const inputs = this.getInputData();
		const zaloCred = await this.getCredentials("zaloApi");

		const cookieFromCred = JSON.parse(zaloCred.cookie as string);
		const imeiFromCred = zaloCred.imei as string;
		const userAgentFromCred = zaloCred.userAgent as string;

		const cookie = cookieFromCred ?? inputs.find((x) => x.json.cookie)?.json.cookie as any;
		const imei = imeiFromCred ?? inputs.find((x) => x.json.imei)?.json.imei as string;
		const userAgent = userAgentFromCred ?? inputs.find((x) => x.json.userAgent)?.json.userAgent as string;

		const zalo = new Zalo();
		const _api = await zalo.login({ cookie, imei, userAgent });
		api = _api;

		if (!api) {
			throw new NodeOperationError(
				this.getNode(),
				'No API instance found. Please make sure to provide valid credentials.',
			);
		}

		try {
			const recipientId = this.getNodeParameter('recipientId', 0) as string;
			const stickerId = this.getNodeParameter('stickerId', 0) as number;

			if (!recipientId || !stickerId) {
				throw new NodeOperationError(this.getNode(), 'Recipient ID and Sticker ID are required');
			}

			const stickers = await api.getStickersDetail(stickerId);
			if (!stickers) {
				throw new NodeOperationError(this.getNode(), 'Sticker not found');
			}
			const result = await api.sendSticker(stickers[0], recipientId);

			returnData.push({
				json: {
					success: true,
					message: 'Gửi sticker thành công',
					result,
				},
			});

			return [returnData];
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({
					json: {
						error: error.message,
					},
				});
				return [returnData];
			}
			throw error;
		}
	}
} 