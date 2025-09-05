# Zalo CN Send Message Node

Node Zalo CN Send Message cho phép bạn gửi tin nhắn tự động đến người dùng hoặc nhóm trên Zalo.

## Mô tả

Node này cung cấp khả năng gửi các loại tin nhắn khác nhau bao gồm tin nhắn văn bản, hình ảnh, stickers và các loại media khác đến người dùng hoặc nhóm trong Zalo.

## Yêu cầu

- Đã đăng nhập thành công qua [Zalo CN Login By QR](zalo-login-by-qr.md)
- Có quyền gửi tin nhắn đến người dùng/nhóm đích

## Các thao tác

### Gửi tin nhắn văn bản
Gửi tin nhắn văn bản đơn giản đến người dùng hoặc nhóm.

**Tham số:**
- `Loại tin nhắn`: Chọn "Tin nhắn văn bản"
- `Người nhận/Nhóm`: ID của người nhận hoặc nhóm
- `Nội dung`: Nội dung tin nhắn cần gửi
- `Loại đích`: "Cá nhân" hoặc "Nhóm"

### Gửi tin nhắn hình ảnh
Gửi hình ảnh kèm theo caption tùy chọn.

**Tham số:**
- `Loại tin nhắn`: Chọn "Hình ảnh"
- `Người nhận/Nhóm`: ID của người nhận hoặc nhóm
- `Đường dẫn ảnh`: URL hoặc đường dẫn đến file ảnh
- `Caption`: Chú thích cho ảnh (tùy chọn)
- `Loại đích`: "Cá nhân" hoặc "Nhóm"

### Gửi sticker
Gửi sticker Zalo.

**Tham số:**
- `Loại tin nhắn`: Chọn "Sticker"
- `Người nhận/Nhóm`: ID của người nhận hoặc nhóm
- `ID Sticker`: ID của sticker cần gửi
- `Loại đích`: "Cá nhân" hoặc "Nhóm"

### Gửi file
Gửi file đính kèm.

**Tham số:**
- `Loại tin nhắn`: Chọn "File"
- `Người nhận/Nhóm`: ID của người nhận hoặc nhóm
- `Đường dẫn file`: URL hoặc đường dẫn đến file
- `Tên file`: Tên hiển thị của file
- `Loại đích`: "Cá nhân" hoặc "Nhóm"

## Cách sử dụng

### Bước 1: Thêm node vào workflow
1. Đảm bảo workflow đã có node "Zalo CN Login By QR" và đã đăng nhập thành công
2. Thêm node "Zalo CN Send Message" vào workflow
3. Kết nối node này với các node trước đó

### Bước 2: Cấu hình node
1. Chọn loại tin nhắn muốn gửi
2. Nhập ID người nhận hoặc nhóm
3. Cấu hình nội dung tin nhắn tương ứng
4. Chọn loại đích (cá nhân/nhóm)

### Bước 3: Thực thi
1. Chạy workflow
2. Node sẽ gửi tin nhắn và trả về kết quả

## Kết quả trả về

Sau khi gửi tin nhắn thành công, node sẽ trả về:
```json
{
  "success": true,
  "messageId": "unique_message_id",
  "timestamp": "2024-01-01T12:00:00Z",
  "recipient": "recipient_id",
  "messageType": "text",
  "content": "Nội dung tin nhắn đã gửi"
}
```

## Ví dụ sử dụng

### Gửi tin nhắn văn bản đơn giản
```typescript
const messageContent = "Xin chào! Đây là tin nhắn tự động từ n8n.";
const recipientId = "123456789";
const targetType = "personal";
```

### Gửi tin nhắn có điều kiện
```typescript
// Gửi tin nhắn chào mừng cho thành viên mới
const welcomeMessage = `Chào mừng {{$node.previous.json.userName}} đã tham gia nhóm!`;
const groupId = "{{$node.previous.json.groupId}}";
```

### Gửi hình ảnh với caption
```typescript
const imageUrl = "https://example.com/image.jpg";
const caption = "Hình ảnh đính kèm";
const recipientId = "123456789";
```

## Xử lý lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi ID người nhận không hợp lệ
- Lỗi không có quyền gửi tin nhắn
- Lỗi định dạng nội dung không đúng
- Lỗi kết nối mạng
- Lỗi file không tồn tại (với tin nhắn file/ảnh)

## Best Practices

1. **Kiểm tra quyền gửi tin nhắn**: Đảm bảo có quyền gửi tin nhắn đến người dùng/nhóm đích
2. **Xử lý rate limiting**: Tránh gửi quá nhiều tin nhắn trong thời gian ngắn
3. **Validate nội dung**: Kiểm tra nội dung tin nhắn trước khi gửi
4. **Sử dụng error handling**: Luôn có xử lý lỗi cho trường hợp gửi thất bại

## Giới hạn

- Có giới hạn số lượng tin nhắn có thể gửi trong một khoảng thời gian
- File đính kèm có giới hạn về dung lượng
- Một số loại file có thể bị hạn chế

## Các node liên quan

- [Zalo CN Login By QR](zalo-login-by-qr.md) - Để đăng nhập vào Zalo
- [Zalo CN Message Trigger](zalo-message-trigger.md) - Để nhận tin nhắn
- [Zalo CN User Node](zalo-user.md) - Để quản lý thông tin người dùng
- [Zalo CN Group Node](zalo-group.md) - Để quản lý nhóm

## Hỗ trợ

Nếu bạn gặp vấn đề với node này, hãy liên hệ qua:
- GitHub Issues: [Báo cáo lỗi](https://github.com/hiennguyen270995/n8n-nodes-zalo-ca-nhan/issues)
- Email: hiennguyen270995@gmail.com
