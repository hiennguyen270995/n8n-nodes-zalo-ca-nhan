import { INodeProperties } from 'n8n-workflow';

// Định nghĩa các operations cho Zalo Poll
export const zaloPollOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
			},
		},
		options: [
			{
				name: 'Tạo Bình Chọn',
				value: 'createPoll',
				description: 'Tạo một bình chọn mới',
				action: 'Tạo bình chọn',
			},
            {
				name: 'Lấy Thông Tin Bình Chọn',
				value: 'getPoll',
				action: 'Lấy thông tin bình chọn',
			},
			{
				name: 'Khóa Bình Chọn',
				value: 'lockPoll',
				action: 'Khóa bình chọn',
			},
		],
		default: 'createPoll',
	},
];

// Các trường cho từng operation
export const zaloPollFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                            zaloPoll:createPoll                            */
	/* -------------------------------------------------------------------------- */
	{
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
				resource: ['zaloPoll'],
                operation: ['createPoll'],
            },
        },
        description: 'ID của nhóm để tạo poll (chỉ hoạt động với nhóm)',
    },
    {
		displayName: 'Chủ đề Bình Chọn',
		name: 'question',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Đặt câu hỏi bình chọn',
	},
	{
		displayName: 'Kiểu Nhập lựa Chọn',
		name: 'optionInputType',
		type: 'options',
		options: [
			{
			name: 'Danh Sách',
			value: 'list',
			description: 'Nhập từng lựa chọn riêng biệt',
			},
			{
			name: 'Văn Bản',
			value: 'text',
			description: 'Nhập tất cả lựa chọn trong một ô, phân tách bằng dấu phẩy',
			},
		],
		default: 'list',
		displayOptions: {
			show: {
			resource: ['zaloPoll'],
			operation: ['createPoll'],
			},
		},
	},
	{
		// Danh sách hiện tại (fixedCollection)
		displayName: 'Các lựa Chọn',
		name: 'pollOptionsCollection',
		type: 'fixedCollection',
		placeholder: 'Thêm lựa chọn',
		typeOptions: {
			multipleValues: true,
			sortable: true
		},
		default: {
			options: [
			{ option: '' },
			{ option: '' },
			],
		},
		displayOptions: {
			show: {
			resource: ['zaloPoll'],
			operation: ['createPoll'],
			optionInputType: ['list'],
			},
		},
		options: [
			{
			name: 'options',
			displayName: 'Lựa Chọn',
			values: [
				{
				displayName: 'Lựa Chọn',
				name: 'option',
				type: 'string',
				default: '',
				placeholder: 'Nhập lựa chọn...',
				description: 'Nội dung của lựa chọn',
				required: true,
				},
			],
			},
		],
		description: 'Thêm các lựa chọn cho bình chọn',
	},
	{

		displayName: 'Các lựa Chọn',
		name: 'optionsString',
		type: 'string',
		default: 'Lựa chọn 1, Lựa chọn 2, Lựa chọn 3',
		placeholder: 'Nhập các lựa chọn, phân tách bằng dấu phẩy...',
		displayOptions: {
			show: {
			resource: ['zaloPoll'],
			operation: ['createPoll'],
			optionInputType: ['text'],
			},
		},
		description: 'Nhập các lựa chọn, mỗi lựa chọn phân tách bằng dấu phẩy',
	},
    {
		displayName: 'Thời Hạn Bình Chọn',
		name: 'expiredTime',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Thời hạn bình chọn (Để trống nếu không có thời hạn)',
	},
    {
		displayName: 'Ghim Lên đầU Trò Chuyện',
		name: 'pinAct',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Whether to tạo ghim lên đầu trò chuyện',
	},
    {
		displayName: 'Chọn Nhiều Phương Án',
		name: 'allowMultiChoices',
		type: 'boolean',
		required: true,
		default: true,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Whether người tham gia có thể bình chọn nhiều phương án khác nhau',
	},
    {
		displayName: 'Có Thể Thêm Phương Án',
		name: 'allowAddNewOption',
		type: 'boolean',
		required: true,
		default: true,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Whether người tham gia có thể thêm phương án mới',
	},
    {
		displayName: 'ẨN Kết Quả Khi chưa Bình Chọn',
		name: 'hideVotePreview',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Whether người tham gia chỉ thấy kết quả sau khi bình chọn',
	},
    {
		displayName: 'ẨN Người Bình Chọn',
		name: 'isAnonymous',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Whether người tham gia không thể thấy người khác bình chọn',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloPoll:getPoll                           */
	/* -------------------------------------------------------------------------- */
	{
        displayName: 'ID Bình Chọn',
        name: 'poll_id',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
				resource: ['zaloPoll'],
                operation: ['getPoll'],
            },
        },
        description: 'ID của bình chọn',
    },

	/* -------------------------------------------------------------------------- */
	/*                            zaloPoll:lockPoll                        */
	/* -------------------------------------------------------------------------- */
	{
        displayName: 'ID Bình Chọn',
        name: 'poll_id',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
				resource: ['zaloPoll'],
                operation: ['lockPoll'],
            },
        },
        description: 'ID của bình chọn',
    },
]; 