import { INodeProperties } from 'n8n-workflow';

export const zaloUserOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
			},
		},
		options: [
			{
				name: 'Bỏ Chặn Người Dùng',
				value: 'unblockUser',
				action: 'Bỏ chặn người dùng',
			},
			{
				name: 'Chặn Người Dùng',
				value: 'blockUser',
				action: 'Chặn người dùng',
			},
			{
				name: 'Chấp Nhận Lời Mời Kết Bạn',
				value: 'acceptFriendRequest',
				action: 'Chấp nhận lời mời kết bạn',
			},
			{
				name: 'ĐổI Tên Gợi Nhớ',
				value: 'changeAliasName',
				description: 'Đổi tên gợi nhớ của bạn bè',
				action: 'Đổi tên gợi nhớ',
			},
			{
				name: 'Gửi Lời Mời Kết Bạn',
				value: 'sendFriendRequest',
				action: 'Gửi lời mời kết bạn',
			},
			{
				name: 'Lấy Danh Sách Bạn Bè',
				value: 'getAllFriends',
				action: 'Lấy danh sách bạn bè',
			},
			{
				name: 'Lấy Thông Tin Người Dùng',
				value: 'getUserInfo',
				action: 'Lấy thông tin người dùng',
			},
			{
				name: 'Thay đổI Cài đặT Tài Khoản',
				value: 'changeAccountSetting',
				action: 'Thay đổi cài đặt tài khoản',
			},
			{
				name: 'Thu Hồi Tin Nhắn',
				value: 'undoMessage',
				action: 'Thu hồi tin nhắn',
			},
			{
				name: 'Tìm Kiếm Người Dùng',
				value: 'findUser',
				action: 'Tìm kiếm người dùng',
			},
		],
		default: 'getUserInfo',
	},
];

export const zaloUserFields: INodeProperties[] = [
	//Undo Message
	{
		displayName: 'Thread ID',
		name: 'threadId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'ID của người dùng cần thu hồi tin nhắn',
	},
	{
		displayName: 'Thread Type',
		name: 'threadType',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'Loại user',
	},
	{
		displayName: 'msgId',
		name: 'msgId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'Message ID',
	},
	{
		displayName: 'cliMsgId',
		name: 'cliMsgId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'Client message ID',
	},
		// Change alias name
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAliasName'],
			},
		},
		default: '',
		description: 'ID của người dùng cần đổi tên gợi nhớ',
	},
	{
		displayName: 'Alias Name',
		name: 'aliasName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAliasName'],
			},
		},
		default: '',
		description: 'Tên gợi nhớ mới',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['acceptFriendRequest'],
			},
		},
		default: '',
		description: 'ID của người dùng cần chấp nhận lời mời kết bạn',
	},

	// Send Friend Request
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['sendFriendRequest'],
			},
		},
		default: '',
		description: 'ID của người dùng cần gửi lời mời kết bạn',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['sendFriendRequest'],
			},
		},
		default: '',
		description: 'Tin nhắn kèm theo lời mời kết bạn',
	},

	// Block User
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['blockUser'],
			},
		},
		default: '',
		description: 'ID của người dùng cần chặn',
	},

	// Unblock User
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['unblockUser'],
			},
		},
		default: '',
		description: 'ID của người dùng cần bỏ chặn',
	},

	// // Change Account Avatar
	// {
	// 	displayName: 'User ID',
	// 	name: 'userId',
	// 	type: 'string',
	// 	required: true,
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['zaloUser'],
	// 			operation: ['changeAccountAvatar'],
	// 		},
	// 	},
	// 	default: '',
	// 	description: 'ID của người dùng cần đổi ảnh đại diện',
	// },
	// {
	// 	displayName: 'File Path',
	// 	name: 'filePath',
	// 	type: 'string',
	// 	required: true,
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['zaloUser'],
	// 			operation: ['changeAccountAvatar'],
	// 		},
	// 	},
	// 	default: '',
	// 	description: 'Đường dẫn đến file ảnh đại diện',
	// },

	// Change Account Setting
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		default: '',
		description: 'Tên hiển thị',
	},
	{
		displayName: 'Date of Birth',
		name: 'dob',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		default: '',
		description: 'Ngày sinh (YYYY-MM-DD)',
	},
	{
		displayName: 'Gender',
		name: 'gender',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		options: [
			{
				name: 'Male',
				value: 1,
			},
			{
				name: 'Female',
				value: 2,
			},
			{
				name: 'Other',
				value: 3,
			},
		],
		default: 1,
		description: 'Giới tính',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		default: '',
		description: 'Ngôn ngữ (vi, en)',
	},

	// Get User Info
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['getUserInfo'],
			},
		},
		default: '',
		description: 'ID của người dùng cần lấy thông tin',
	},

	// Get All Friends
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['getAllFriends'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},

	// Find User
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['findUser'],
			},
		},
		default: '',
		description: 'Số điện thoại cần tìm kiếm',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['findUser'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
];
