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
				action: 'B ch n ng i d ng',
			},
			{
				name: 'Chặn Người Dùng',
				value: 'blockUser',
				action: 'Ch n ng i d ng',
			},
			{
				name: 'Chấp Nhận Lời Mời Kết Bạn',
				value: 'acceptFriendRequest',
				action: 'Ch p nh n l i m i k t b n',
			},
			{
				name: 'ĐổI Tên Gợi Nhớ',
				value: 'changeAliasName',
				description: 'Đổi tên gợi nhớ của bạn bè',
				action: 'I t n g i nh',
			},
			{
				name: 'Gửi Lời Mời Kết Bạn',
				value: 'sendFriendRequest',
				action: 'G i l i m i k t b n',
			},
			{
				name: 'Lấy Danh Sách Bạn Bè',
				value: 'getAllFriends',
				action: 'L y danh s ch b n b',
			},
			{
				name: 'Lấy Thông Tin Người Dùng',
				value: 'getUserInfo',
				action: 'L y th ng tin ng i d ng',
			},
			{
				name: 'Thay đổI Cài đặT Tài Khoản',
				value: 'changeAccountSetting',
				action: 'Thay i c i t t i kho n',
			},
			{
				name: 'Thu Hồi Tin Nhắn',
				value: 'undoMessage',
				action: 'Thu h i tin nh n',
			},
			{
				name: 'Tìm Kiếm Người Dùng',
				value: 'findUser',
				action: 'T m ki m ng i d ng',
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
