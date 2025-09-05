# Zalo CN Message Trigger Node

Node Zalo CN Message Trigger cho phép bạn tự động nhận và xử lý tin nhắn đến từ Zalo trong workflow n8n.

## Mô tả

Đây là một trigger node cho phép workflow của bạn tự động được kích hoạt khi có tin nhắn mới đến từ Zalo. Node này hoạt động như một webhook, lắng nghe và xử lý các tin nhắn đến trong thời gian thực.

## Yêu cầu

- Đã đăng nhập thành công qua [Zalo CN Login By QR](zalo-login-by-qr.md)
- Tài khoản Zalo đang hoạt động và có thể nhận tin nhắn

## Cách hoạt động

1. Node khởi tạo một listener để lắng nghe tin nhắn đến
2. Khi có tin nhắn mới, node sẽ tự động kích hoạt workflow
3. Thông tin tin nhắn sẽ được truyền đến các node tiếp theo
4. Workflow có thể xử lý và phản hồi tin nhắn tự động

## Cấu hình

### Loại tin nhắn lắng nghe
- `Tất cả tin nhắn`: Lắng nghe mọi tin nhắn đến
- `Tin nhắn cá nhân`: Chỉ lắng nghe tin nhắn từ các cuộc trò chuyện cá nhân
- `Tin nhắn nhóm`: Chỉ lắng nghe tin nhắn từ các nhóm
- `Tin nhắn có từ khóa`: Lắng nghe tin nhắn chứa từ khóa cụ thể

### Bộ lọc tin nhắn
- `Từ khóa`: Danh sách từ khóa để lọc tin nhắn
- `Người gửi cụ thể`: Chỉ lắng nghe tin nhắn từ những người dùng cụ thể
- `Nhóm cụ thể`: Chỉ lắng nghe tin nhắn từ những nhóm cụ thể
- `Loại nội dung`: Văn bản, hình ảnh, sticker, file, v.v.

## Dữ liệu trả về

Khi có tin nhắn đến, node sẽ trả về thông tin:

```json
{
  "messageId": "unique_message_id",
  "timestamp": "2024-01-01T12:00:00Z",
  "senderId": "sender_user_id",
  "senderName": "Tên người gửi",
  "chatType": "personal", // hoặc "group"
  "chatId": "chat_or_group_id",
  "chatName": "Tên cuộc trò chuyện/nhóm",
  "messageType": "text", // text, image, sticker, file, etc.
  "content": {
    "text": "Nội dung tin nhắn",
    "attachments": [...], // nếu có file đính kèm
    "mentions": [...], // nếu có mention
    "reply": {...} // nếu là tin nhắn phản hồi
  },
  "metadata": {
    "isFromBot": false,
    "isEdited": false,
    "originalMessageId": "..." // nếu là tin nhắn chỉnh sửa
  }
}
```

## Cách sử dụng

### Bước 1: Thêm trigger node
1. Tạo workflow mới trong n8n
2. Thêm node "Zalo CN Message Trigger" làm node đầu tiên
3. Node này sẽ là điểm khởi đầu của workflow

### Bước 2: Cấu hình trigger
1. Chọn loại tin nhắn muốn lắng nghe
2. Thiết lập bộ lọc nếu cần
3. Cấu hình các tùy chọn bổ sung

### Bước 3: Thêm logic xử lý
1. Thêm các node xử lý tiếp theo
2. Sử dụng dữ liệu từ trigger để xây dựng logic
3. Có thể thêm node phản hồi tự động

### Bước 4: Kích hoạt workflow
1. Bật workflow (Active)
2. Workflow sẽ tự động chạy khi có tin nhắn đến phù hợp với điều kiện

## Ví dụ workflow

### Bot trả lời tự động
```json
{
  "name": "Zalo Auto Reply Bot",
  "nodes": [
    {
      "name": "Zalo CN Message Trigger",
      "type": "zaloMessageTrigger",
      "parameters": {
        "messageType": "text",
        "keywords": ["help", "trợ giúp"]
      }
    },
    {
      "name": "Process Message",
      "type": "function",
      "parameters": {
        "functionCode": "// Xử lý tin nhắn và tạo phản hồi\nreturn [{json: {response: 'Xin chào! Tôi có thể giúp gì cho bạn?'}}];"
      }
    },
    {
      "name": "Send Reply",
      "type": "zaloSendMessage",
      "parameters": {
        "messageType": "text",
        "recipient": "={{$node['Zalo CN Message Trigger'].json.senderId}}",
        "content": "={{$node['Process Message'].json.response}}"
      }
    }
  ]
}
```

### Lưu trữ tin nhắn vào database
```json
{
  "name": "Save Messages to DB",
  "nodes": [
    {
      "name": "Zalo CN Message Trigger",
      "type": "zaloMessageTrigger",
      "parameters": {
        "messageType": "all"
      }
    },
    {
      "name": "Format Data",
      "type": "function",
      "parameters": {
        "functionCode": "// Format dữ liệu để lưu vào DB"
      }
    },
    {
      "name": "Save to Database",
      "type": "postgresDb",
      "parameters": {
        "operation": "insert"
      }
    }
  ]
}
```

## Xử lý các loại tin nhắn khác nhau

### Tin nhắn văn bản
```javascript
if (items[0].json.messageType === 'text') {
  const textContent = items[0].json.content.text;
  // Xử lý tin nhắn văn bản
}
```

### Tin nhắn hình ảnh
```javascript
if (items[0].json.messageType === 'image') {
  const imageUrl = items[0].json.content.attachments[0].url;
  // Xử lý hình ảnh
}
```

### Tin nhắn trong nhóm
```javascript
if (items[0].json.chatType === 'group') {
  const groupId = items[0].json.chatId;
  const groupName = items[0].json.chatName;
  // Xử lý tin nhắn nhóm
}
```

## Best Practices

1. **Sử dụng bộ lọc hiệu quả**: Chỉ lắng nghe những tin nhắn thực sự cần thiết
2. **Xử lý lỗi**: Luôn có error handling cho trường hợp tin nhắn không hợp lệ
3. **Rate limiting**: Tránh phản hồi quá nhiều tin nhắn trong thời gian ngắn
4. **Bảo mật**: Không xử lý thông tin nhạy cảm trong tin nhắn
5. **Log monitoring**: Theo dõi và ghi log để debug khi cần

## Giới hạn

- Có thể bị giới hạn số lượng tin nhắn xử lý đồng thời
- Một số loại tin nhắn đặc biệt có thể không được hỗ trợ
- Cần duy trì kết nối ổn định để nhận tin nhắn

## Khắc phục sự cố

### Không nhận được tin nhắn
1. Kiểm tra kết nối mạng
2. Đảm bảo đã đăng nhập Zalo thành công
3. Kiểm tra bộ lọc tin nhắn
4. Restart workflow

### Nhận tin nhắn trùng lặp
1. Kiểm tra cấu hình trigger
2. Đảm bảo chỉ có một workflow đang active
3. Sử dụng messageId để dedup

## Các node liên quan

- [Zalo CN Login By QR](zalo-login-by-qr.md) - Để đăng nhập vào Zalo
- [Zalo CN Send Message](zalo-send-message.md) - Để gửi tin nhắn phản hồi
- [Zalo CN User Node](zalo-user.md) - Để lấy thông tin người gửi
- [Zalo CN Group Node](zalo-group.md) - Để quản lý nhóm

## Hỗ trợ

Nếu bạn gặp vấn đề với node này, hãy liên hệ qua:
- GitHub Issues: [Báo cáo lỗi](https://github.com/hiennguyen270995/n8n-nodes-zalo-ca-nhan/issues)
- Email: hiennguyen270995@gmail.com
