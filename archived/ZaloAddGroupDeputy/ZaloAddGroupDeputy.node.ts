import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
import { API, Zalo } from 'zalo-api-final';
let api: API | undefined;

export class ZaloAddGroupDeputy implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'Zalo Add Group Deputy (Cookie)',
		name: 'zaloAddGroupDeputy',
		icon: 'file:../shared/zalo.svg',
		group: ['Zalo'],
		version: 2,
		description: 'Thêm phó nhóm vào nhóm Zalo',
		defaults: {
			name: 'Zalo Add Group Deputy (Cookie)',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'zaloApi',
				required: true,
				displayName: 'Zalo Credential to connect with',
			},
        ],
		properties: [
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID của nhóm Zalo',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID của người dùng cần thêm làm phó nhóm',
			}

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
        this.logger.info(`Message sent ${JSON.stringify({ cookie, imei, userAgent })}`);

        const zalo = new Zalo();
        const _api =  await zalo.login({ cookie, imei, userAgent });
        api = _api;
        if (!api) {
            throw new NodeOperationError(this.getNode(), 'No API instance found. Please make sure to provide valid credentials.')
        }
        this.logger.info(`API ${JSON.stringify(api)}`);
        console.log('API', api);

      	const groupId = this.getNodeParameter('groupId', 0) as string;
      	const userId = this.getNodeParameter('userId', 0) as string;
        // Gửi tin nhắn một lần
        try {
            this.logger.info(`Parameters before sending message: ${JSON.stringify({groupId, userId})}`);


            const response = await api.addGroupDeputy(groupId, userId);
            this.logger.info(`Find successfully: ${JSON.stringify({groupId, userId})}`);

            returnData.push({
                json: JSON.parse(response),
            });
        } catch (error) {
            this.logger.error('Error in addGroupDeputy:', { error });
            if ((error as any).response) {
                this.logger.error('Error response:', { response: (error as any).response });
            }
            if ((error as any).stack) {
                this.logger.error('Error stack:', { stack: (error as any).stack });
            }
            throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: 0 });
        }

        return [returnData];
	}
}