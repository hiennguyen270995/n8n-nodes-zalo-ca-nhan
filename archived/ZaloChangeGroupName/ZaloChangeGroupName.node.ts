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

export class ZaloChangeGroupName implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Đổi Tên Nhóm',
		name: 'zaloChangeGroupName',
		group: ['Zalo'],
		version: 1,
		description: 'Đổi tên nhóm trên Zalo',
		defaults: {
			name: 'Zalo Đổi Tên Nhóm',
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
				description: 'ID của nhóm cần đổi tên',
			},
			{
				displayName: 'Tên Mới',
				name: 'newName',
				type: 'string',
				default: '',
				required: true,
				description: 'Tên mới của nhóm',
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
			const newName = this.getNodeParameter('newName', 0) as string;

			if (!groupId || !newName) {
				throw new NodeOperationError(this.getNode(), 'ID nhóm và tên mới là bắt buộc');
			}

			const result = await api.changeGroupName(groupId, newName);

			returnData.push({
				json: {
					success: true,
					message: 'Đổi tên nhóm thành công',
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