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

export class ZaloFindUserInformationByPhoneNumber implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'Zalo Find User Information By PhoneNumber (Cookie)',
		name: 'zaloFindUserInformationByPhoneNumber',
		icon: 'file:../shared/zalo.svg',
		group: ['Zalo'],
		version: 2,
		description: 'Tìm người dùng bằng số điện thoại',
		defaults: {
			name: 'Zalo Find User (Cookie)',
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
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				required: true,
				description: 'Số điện thoại của người dùng cần tìm',
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

      	const phoneNumber = this.getNodeParameter('phoneNumber', 0) as string;
        // Gửi tin nhắn một lần
        try {
            this.logger.info(`Parameters before sending message: ${JSON.stringify(phoneNumber)}`);

            
            const response = await api.findUser(phoneNumber);
            this.logger.info(`Find successfully: ${JSON.stringify(phoneNumber)}`);

            returnData.push({
                json: response,
            });
        } catch (error) {
            this.logger.error('Error in sendMessage:', { error });
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
