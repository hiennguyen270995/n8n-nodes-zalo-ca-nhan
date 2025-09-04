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

export class ZaloGetAllFriends implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Lấy Tất Cả Bạn Bè',
		name: 'zaloGetAllFriends',
		group: ['Zalo'],
		version: 1,
		description: 'Lấy danh sách tất cả bạn bè trên Zalo',
		defaults: {
			name: 'Zalo Lấy Tất Cả Bạn Bè',
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
				displayName: 'Giới Hạn',
				name: 'limit',
				type: 'number',
				default: 50,
				required: true,
				description: 'Số lượng bạn bè tối đa cần lấy',
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
			const limit = this.getNodeParameter('limit', 0) as number;
			
				
			const result = !!limit ? await api.getAllFriends(limit) : await api.getAllFriends();

			returnData.push({
				json: {
					success: true,
					message: 'Lấy danh sách bạn bè thành công',
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