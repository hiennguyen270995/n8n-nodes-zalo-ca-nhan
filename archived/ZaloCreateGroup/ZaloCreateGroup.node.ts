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

export class ZaloCreateGroup implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Tạo Nhóm',
		name: 'zaloCreateGroup',
		group: ['Zalo'],
		version: 1,
		description: 'Tạo nhóm mới trên Zalo',
		defaults: {
			name: 'Zalo Tạo Nhóm',
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
				displayName: 'Tên Nhóm',
				name: 'groupName',
				type: 'string',
				default: '',
				required: true,
				description: 'Tên của nhóm mới',
			},
			{
				displayName: 'Danh Sách ID Thành Viên',
				name: 'userIds',
				type: 'string',
				default: '',
				required: true,
				description: 'Danh sách ID thành viên, phân cách bằng dấu phẩy',
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
			const groupName = this.getNodeParameter('groupName', 0) as string;
			const userIdsStr = this.getNodeParameter('userIds', 0) as string;

			if (!groupName || !userIdsStr) {
				throw new NodeOperationError(this.getNode(), 'Vui lòng nhập tên nhóm và danh sách ID thành viên');
			}

			const userIds = userIdsStr.split(',').map(id => id.trim());

			const result = await api.createGroup({ name: groupName, members: userIds });

			returnData.push({
				json: {
					success: true,
					message: 'Tạo nhóm thành công',
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