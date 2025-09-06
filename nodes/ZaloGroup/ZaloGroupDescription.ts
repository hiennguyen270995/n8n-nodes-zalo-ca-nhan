import { INodeProperties } from 'n8n-workflow';

// Định nghĩa các operations cho Zalo Group
export const zaloGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
			},
		},
		options: [
			{
				name: 'ĐổI Avatar Nhóm',
				value: 'changeGroupAvatar',
				description: 'Đổi avatar của nhóm',
				action: 'Đổi avatar nhóm',
			},
			{
				name: 'ĐổI Tên Nhóm',
				value: 'changeGroupName',
				description: 'Đổi tên của nhóm',
				action: 'Đổi tên nhóm',
			},
			{
				name: 'Lấy Danh Sách Thành Viên',
				value: 'getGroupMembers',
				description: 'Lấy danh sách thành viên của nhóm',
				action: 'Lấy danh sách thành viên',
			},
			{
				name: 'Lấy Tất Cả Nhóm',
				value: 'getAllGroups',
				description: 'Lấy danh sách tất cả các nhóm',
				action: 'Lấy tất cả nhóm',
			},
			{
				name: 'Lấy Thông Tin Nhóm',
				value: 'getGroupInfo',
				description: 'Lấy thông tin của một nhóm',
				action: 'Lấy thông tin nhóm',
			},
			{
				name: 'Tạo Ghi Chú',
				value: 'createNote',
				description: 'Tạo ghi chú trong nhóm',
				action: 'Tạo ghi chú',
			},
			{
				name: 'Tạo Nhóm',
				value: 'createGroup',
				description: 'Tạo một nhóm mới',
				action: 'Tạo nhóm',
			},
			{
				name: 'Thêm Phó Nhóm',
				value: 'addGroupDeputy',
				description: 'Thêm phó nhóm cho một nhóm',
				action: 'Thêm phó nhóm',
			},
			{
				name: 'Thêm Thành Viên Vào Nhóm',
				value: 'addUserToGroup',
				action: 'Thêm thành viên vào nhóm',
			},
			{
				name: 'Xóa Thành Viên Khỏi Nhóm',
				value: 'removeUserFromGroup',
				description: 'Xóa thành ra viên khỏi nhóm',
				action: 'Xóa thành viên khỏi nhóm',
			},
		],
		default: 'createGroup',
	},
];

// Các trường cho từng operation
export const zaloGroupFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:createGroup                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Tên Nhóm',
		name: 'groupName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['createGroup'],
			},
		},
		description: 'Tên của nhóm mới',
	},
	{
		displayName: 'Danh Sách ID Thành Viên (Nếu Nhiều Người Dùng Vui Lòng Phân Cách Bằng Dấu Phẩy)',
		name: 'userIds',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['createGroup'],
			},
		},
		description: 'Danh sách ID thành viên, phân cách bằng dấu phẩy',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:getGroupInfo                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['getGroupInfo'],
			},
		},
		description: 'ID của nhóm cần lấy thông tin',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:addGroupDeputy                         */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['addGroupDeputy'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'ID Người Dùng',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['addGroupDeputy'],
			},
		},
		description: 'ID của người dùng cần thêm làm phó nhóm',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:addUserToGroup                         */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['addUserToGroup'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'Danh Sách ID Thành Viên (Nếu Nhiều Người Dùng Vui Lòng Phân Cách Bằng Dấu Phẩy)',
		name: 'userIds',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['addUserToGroup'],
			},
		},
		description: 'Danh sách ID thành viên, phân cách bằng dấu phẩy',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:changeGroupAvatar                      */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['changeGroupAvatar'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'URL Ảnh',
		name: 'imageUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['changeGroupAvatar'],
			},
		},
		description: 'URL của ảnh đại diện mới',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:changeGroupName                        */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['changeGroupName'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'Tên Mới',
		name: 'newName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['changeGroupName'],
			},
		},
		description: 'Tên mới của nhóm',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:getGroupMembers                        */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['getGroupMembers'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'Giới Hạn',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['getGroupMembers'],
			},
		},
		description: 'Max number of results to return',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:getAllGroups                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Giới Hạn',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['getAllGroups'],
			},
		},
		description: 'Max number of results to return',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:removeUserFromGroup                    */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['removeUserFromGroup'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'ID Người Dùng (Nếu Nhiều Người Dùng Vui Lòng Phân Cách Bằng Dấu Phẩy)',
		name: 'userIds',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['removeUserFromGroup'],
			},
		},
		description: 'ID của người dùng cần xóa khỏi nhóm',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:createNote                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['createNote'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'Nội Dung Ghi Chú',
		name: 'content',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['createNote'],
			},
		},
		description: 'Nội dung của ghi chú',
	},
	{
		displayName: 'Pin Ghi Chú',
		name: 'pinAct',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['createNote'],
			},
		},
		description: 'Whether to ghim ghi chú lên đầu nhóm',
	},
]; 