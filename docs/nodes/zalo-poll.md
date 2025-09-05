# Zalo CN Poll Node

Node Zalo CN Poll cho phép bạn tạo, quản lý và tương tác với các cuộc thăm dò ý kiến (poll) trên Zalo.

## Mô tả

Node này cung cấp khả năng tạo và quản lý các cuộc thăm dò ý kiến trong các cuộc trò chuyện hoặc nhóm Zalo. Bạn có thể tạo poll với nhiều lựa chọn, theo dõi kết quả vote và tự động hóa việc xử lý kết quả.

## Yêu cầu

- Đã đăng nhập thành công qua [Zalo CN Login By QR](zalo-login-by-qr.md)
- Có quyền tạo poll trong cuộc trò chuyện/nhóm đích

## Các thao tác

### Tạo Poll
Tạo một cuộc thăm dò ý kiến mới.

**Tham số:**
- `Tiêu đề Poll`: Câu hỏi hoặc chủ đề của poll
- `Các lựa chọn`: Danh sách các lựa chọn (tối thiểu 2, tối đa 10)
- `Đích đến`: ID cuộc trò chuyện hoặc nhóm
- `Loại vote`: Đơn chọn hoặc đa chọn
- `Thời gian kết thúc`: Thời gian tự động kết thúc poll (tùy chọn)
- `Ẩn danh`: Cho phép vote ẩn danh hay không

### Lấy kết quả Poll
Lấy thông tin chi tiết về kết quả của một poll.

**Tham số:**
- `ID Poll`: ID của poll cần lấy kết quả
- `Bao gồm chi tiết`: Có lấy thông tin chi tiết người vote không

### Kết thúc Poll
Kết thúc một poll đang diễn ra.

**Tham số:**
- `ID Poll`: ID của poll cần kết thúc

### Xóa Poll
Xóa một poll (chỉ người tạo mới có quyền).

**Tham số:**
- `ID Poll`: ID của poll cần xóa

### Vote Poll
Thực hiện vote cho một poll.

**Tham số:**
- `ID Poll`: ID của poll cần vote
- `Lựa chọn`: ID của lựa chọn muốn vote
- `Hủy vote cũ`: Có hủy vote trước đó không (với poll đa chọn)

## Cách sử dụng

### Bước 1: Thêm node vào workflow
1. Đảm bảo workflow đã có node "Zalo CN Login By QR" và đã đăng nhập thành công
2. Thêm node "Zalo CN Poll" vào workflow
3. Kết nối node này với các node trước đó

### Bước 2: Cấu hình node
1. Chọn thao tác muốn thực hiện
2. Điền thông tin cần thiết cho từng thao tác
3. Cấu hình các tùy chọn bổ sung

### Bước 3: Thực thi
1. Chạy workflow
2. Node sẽ thực hiện thao tác và trả về kết quả

## Kết quả trả về

### Tạo poll thành công
```json
{
  "success": true,
  "pollId": "poll_unique_id",
  "title": "Tiêu đề poll",
  "options": [
    {
      "id": "option_1",
      "text": "Lựa chọn 1",
      "votes": 0
    },
    {
      "id": "option_2", 
      "text": "Lựa chọn 2",
      "votes": 0
    }
  ],
  "chatId": "chat_or_group_id",
  "createdAt": "2024-01-01T12:00:00Z",
  "expiresAt": "2024-01-02T12:00:00Z",
  "allowMultiple": false,
  "anonymous": false,
  "status": "active"
}
```

### Kết quả poll
```json
{
  "pollId": "poll_unique_id",
  "title": "Tiêu đề poll",
  "totalVotes": 25,
  "options": [
    {
      "id": "option_1",
      "text": "Lựa chọn 1", 
      "votes": 15,
      "percentage": 60,
      "voters": ["user1", "user2", "..."] // nếu không ẩn danh
    },
    {
      "id": "option_2",
      "text": "Lựa chọn 2",
      "votes": 10,
      "percentage": 40,
      "voters": ["user3", "user4", "..."]
    }
  ],
  "status": "active", // active, ended, expired
  "createdAt": "2024-01-01T12:00:00Z",
  "endedAt": null
}
```

## Ví dụ sử dụng

### Tạo poll đơn giản
```typescript
const pollTitle = "Bạn thích màu nào nhất?";
const options = ["Đỏ", "Xanh", "Vàng", "Tím"];
const chatId = "group_123456";
const allowMultiple = false;
const anonymous = false;
```

### Poll với thời gian kết thúc
```typescript
const pollTitle = "Chọn thời gian họp tuần sau";
const options = ["Thứ 2 - 9h", "Thứ 3 - 14h", "Thứ 4 - 10h"];
const expiresIn = 24 * 60 * 60 * 1000; // 24 giờ
const expiresAt = new Date(Date.now() + expiresIn).toISOString();
```

### Tự động tạo poll từ tin nhắn
```json
{
  "name": "Auto Poll Creator",
  "nodes": [
    {
      "name": "Zalo CN Message Trigger",
      "type": "zaloMessageTrigger",
      "parameters": {
        "keywords": ["/poll", "/vote"]
      }
    },
    {
      "name": "Parse Poll Data",
      "type": "function",
      "parameters": {
        "functionCode": `
          const message = items[0].json.content.text;
          const lines = message.split('\\n');
          const title = lines[1] || "Thăm dò ý kiến";
          const options = lines.slice(2).filter(line => line.trim());
          
          return [{
            json: {
              title: title,
              options: options,
              chatId: items[0].json.chatId
            }
          }];
        `
      }
    },
    {
      "name": "Create Poll",
      "type": "zaloPoll",
      "parameters": {
        "operation": "createPoll",
        "title": "={{$node['Parse Poll Data'].json.title}}",
        "options": "={{$node['Parse Poll Data'].json.options}}",
        "chatId": "={{$node['Parse Poll Data'].json.chatId}}"
      }
    }
  ]
}
```

### Theo dõi và báo cáo kết quả poll
```json
{
  "name": "Poll Results Monitor",
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "scheduleTrigger",
      "parameters": {
        "rule": {
          "interval": [{"field": "hours", "value": 1}]
        }
      }
    },
    {
      "name": "Get Active Polls",
      "type": "function",
      "parameters": {
        "functionCode": "// Lấy danh sách poll đang active"
      }
    },
    {
      "name": "Get Poll Results",
      "type": "zaloPoll",
      "parameters": {
        "operation": "getPollResults",
        "pollId": "={{$node['Get Active Polls'].json.pollId}}"
      }
    },
    {
      "name": "Check if Should End",
      "type": "if",
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{$node['Get Poll Results'].json.totalVotes}}",
              "operation": "greaterThan",
              "value2": 50
            }
          ]
        }
      }
    },
    {
      "name": "End Poll",
      "type": "zaloPoll",
      "parameters": {
        "operation": "endPoll",
        "pollId": "={{$node['Get Poll Results'].json.pollId}}"
      }
    },
    {
      "name": "Send Results Summary",
      "type": "zaloSendMessage",
      "parameters": {
        "messageType": "text",
        "content": "Poll đã kết thúc! Kết quả: ={{JSON.stringify($node['Get Poll Results'].json.options)}}"
      }
    }
  ]
}
```

## Best Practices

1. **Tiêu đề rõ ràng**: Sử dụng tiêu đề poll dễ hiểu và cụ thể
2. **Lựa chọn hợp lý**: Tránh tạo quá nhiều lựa chọn gây rối
3. **Thời gian phù hợp**: Đặt thời gian kết thúc phù hợp với nội dung poll
4. **Theo dõi kết quả**: Thường xuyên kiểm tra và xử lý kết quả
5. **Tôn trọng quyền riêng tư**: Sử dụng chế độ ẩn danh khi cần thiết

## Giới hạn

- Số lượng poll tạo trong một ngày có thể bị giới hạn
- Số lượng lựa chọn tối đa là 10
- Poll có thể tự động hết hạn sau một thời gian nhất định
- Một số nhóm có thể hạn chế quyền tạo poll

## Xử lý lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi không có quyền tạo poll trong nhóm
- Lỗi poll đã kết thúc/hết hạn
- Lỗi định dạng dữ liệu không đúng
- Lỗi ID poll không hợp lệ
- Lỗi quá số lượng lựa chọn cho phép

## Các node liên quan

- [Zalo CN Login By QR](zalo-login-by-qr.md) - Để đăng nhập vào Zalo
- [Zalo CN Message Trigger](zalo-message-trigger.md) - Để tự động tạo poll từ tin nhắn
- [Zalo CN Send Message](zalo-send-message.md) - Để gửi thông báo kết quả
- [Zalo CN Group Node](zalo-group.md) - Để quản lý nhóm có poll

## Hỗ trợ

Nếu bạn gặp vấn đề với node này, hãy liên hệ qua:
- GitHub Issues: [Báo cáo lỗi](https://github.com/hiennguyen270995/n8n-nodes-zalo-ca-nhan/issues)
- Email: hiennguyen270995@gmail.com
