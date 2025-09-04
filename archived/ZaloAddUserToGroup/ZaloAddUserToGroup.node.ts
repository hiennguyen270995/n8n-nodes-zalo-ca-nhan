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

export class ZaloAddUserToGroup implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Thêm Thành Viên Vào Nhóm',
		name: 'zaloAddUserToGroup',
		group: ['Zalo'],
		version: 1,
		description: 'Thêm thành viên vào nhóm trên Zalo',
		defaults: {
			name: 'Zalo Thêm Thành Viên Vào Nhóm',
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
				displayName: 'ID Nhóm',
				name: 'groupId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID của nhóm cần thêm thành viên',
			},
			{
				displayName: 'ID Người Dùng',
				name: 'userId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID của người dùng cần thêm vào nhóm',
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
			const groupId = this.getNodeParameter('groupId', 0) as string;
			const userId = this.getNodeParameter('userId', 0) as string;

			if (!groupId || !userId) {
				throw new NodeOperationError(this.getNode(), 'Vui lòng nhập ID nhóm và ID người dùng');
			}

			const result = await api.addUserToGroup(groupId, userId);

			returnData.push({
				json: {
					success: true,
					message: 'Thêm thành viên vào nhóm thành công',
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