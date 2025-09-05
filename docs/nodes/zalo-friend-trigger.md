# Zalo CN Friend Trigger Node

Node Zalo CN Friend Trigger cho phép bạn tự động nhận và xử lý các sự kiện liên quan đến bạn bè trên Zalo như lời mời kết bạn, chấp nhận kết bạn, hủy kết bạn, v.v.

## Mô tả

Đây là một trigger node giúp workflow của bạn tự động được kích hoạt khi có các sự kiện liên quan đến bạn bè diễn ra trên Zalo. Node này rất hữu ích để tự động hóa việc quản lý danh sách bạn bè và phản hồi với các hoạt động kết bạn.

## Yêu cầu

- Đã đăng nhập thành công qua [Zalo CN Login By QR](zalo-login-by-qr.md)
- Tài khoản Zalo đang hoạt động

## Các sự kiện được hỗ trợ

### Lời mời kết bạn đến
Kích hoạt khi có người gửi lời mời kết bạn đến bạn.

### Chấp nhận kết bạn
Kích hoạt khi ai đó chấp nhận lời mời kết bạn của bạn.

### Từ chối kết bạn
Kích hoạt khi lời mời kết bạn bị từ chối.

### Hủy kết bạn
Kích hoạt khi có người hủy kết bạn với bạn.

### Thay đổi trạng thái online
Kích hoạt khi bạn bè thay đổi trạng thái online/offline.

## Cấu hình

### Loại sự kiện
- `Tất cả sự kiện`: Lắng nghe mọi sự kiện bạn bè
- `Lời mời kết bạn`: Chỉ lắng nghe lời mời kết bạn mới
- `Thay đổi trạng thái`: Chỉ lắng nghe thay đổi trạng thái kết bạn
- `Hoạt động online`: Lắng nghe thay đổi trạng thái online

### Bộ lọc
- `Người dùng cụ thể`: Chỉ theo dõi sự kiện từ những người dùng cụ thể
- `Loại tài khoản`: Lọc theo loại tài khoản (cá nhân, doanh nghiệp)

## Dữ liệu trả về

Khi có sự kiện xảy ra, node sẽ trả về thông tin:

```json
{
  "eventType": "friend_request_received", // loại sự kiện
  "timestamp": "2024-01-01T12:00:00Z",
  "userId": "sender_user_id",
  "userInfo": {
    "id": "user_id",
    "name": "Tên người dùng",
    "avatar": "https://avatar_url",
    "phone": "09xxxxxxxx", // nếu có
    "isVerified": true,
    "accountType": "personal"
  },
  "eventData": {
    "requestId": "friend_request_id", // với lời mời kết bạn
    "message": "Lời nhắn kèm theo", // nếu có
    "mutualFriends": 5, // số bạn chung
    "status": "pending" // trạng thái hiện tại
  },
  "metadata": {
    "source": "zalo_app", // nguồn gửi
    "isAutomatic": false // có phải tự động không
  }
}
```

## Cách sử dụng

### Bước 1: Thêm trigger node
1. Tạo workflow mới trong n8n
2. Thêm node "Zalo CN Friend Trigger" làm node đầu tiên
3. Node này sẽ là điểm khởi đầu của workflow

### Bước 2: Cấu hình trigger
1. Chọn loại sự kiện muốn lắng nghe
2. Thiết lập bộ lọc nếu cần
3. Cấu hình các tùy chọn bổ sung

### Bước 3: Thêm logic xử lý
1. Thêm các node xử lý tiếp theo
2. Sử dụng dữ liệu từ trigger để xây dựng logic
3. Có thể thêm node phản hồi tự động

### Bước 4: Kích hoạt workflow
1. Bật workflow (Active)
2. Workflow sẽ tự động chạy khi có sự kiện phù hợp

## Ví dụ workflow

### Tự động chấp nhận kết bạn
```json
{
  "name": "Auto Accept Friend Requests",
  "nodes": [
    {
      "name": "Zalo CN Friend Trigger",
      "type": "zaloFriendTrigger",
      "parameters": {
        "eventType": "friend_request_received"
      }
    },
    {
      "name": "Check Conditions",
      "type": "if",
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "={{$node['Zalo CN Friend Trigger'].json.eventData.mutualFriends}}",
              "operation": "greaterThan",
              "value2": 2
            }
          ]
        }
      }
    },
    {
      "name": "Accept Friend Request",
      "type": "zaloUser",
      "parameters": {
        "operation": "acceptFriendRequest",
        "userId": "={{$node['Zalo CN Friend Trigger'].json.userId}}"
      }
    },
    {
      "name": "Send Welcome Message",
      "type": "zaloSendMessage",
      "parameters": {
        "messageType": "text",
        "recipient": "={{$node['Zalo CN Friend Trigger'].json.userId}}",
        "content": "Xin chào! Cảm ơn bạn đã kết bạn với tôi."
      }
    }
  ]
}
```

### Thông báo khi có bạn mới
```json
{
  "name": "New Friend Notification",
  "nodes": [
    {
      "name": "Zalo CN Friend Trigger",
      "type": "zaloFriendTrigger",
      "parameters": {
        "eventType": "friend_accepted"
      }
    },
    {
      "name": "Send Notification",
      "type": "webhook",
      "parameters": {
        "httpMethod": "POST",
        "url": "https://your-notification-service.com/webhook",
        "body": {
          "message": "Có bạn mới: {{$node['Zalo CN Friend Trigger'].json.userInfo.name}}"
        }
      }
    }
  ]
}
```

### Lưu thông tin bạn bè vào database
```json
{
  "name": "Save Friend Info",
  "nodes": [
    {
      "name": "Zalo CN Friend Trigger",
      "type": "zaloFriendTrigger",
      "parameters": {
        "eventType": "friend_accepted"
      }
    },
    {
      "name": "Format Friend Data",
      "type": "function",
      "parameters": {
        "functionCode": `
          const friendData = items[0].json.userInfo;
          return [{
            json: {
              user_id: friendData.id,
              name: friendData.name,
              avatar: friendData.avatar,
              added_date: new Date().toISOString(),
              mutual_friends: items[0].json.eventData.mutualFriends
            }
          }];
        `
      }
    },
    {
      "name": "Save to Database",
      "type": "postgresDb",
      "parameters": {
        "operation": "insert",
        "table": "zalo_friends"
      }
    }
  ]
}
```

## Xử lý các loại sự kiện

### Lời mời kết bạn đến
```javascript
if (items[0].json.eventType === 'friend_request_received') {
  const requestId = items[0].json.eventData.requestId;
  const senderInfo = items[0].json.userInfo;
  const mutualFriends = items[0].json.eventData.mutualFriends;
  
  // Logic xử lý lời mời kết bạn
  if (mutualFriends >= 3) {
    // Tự động chấp nhận nếu có từ 3 bạn chung trở lên
  }
}
```

### Chấp nhận kết bạn
```javascript
if (items[0].json.eventType === 'friend_accepted') {
  const newFriend = items[0].json.userInfo;
  
  // Gửi tin nhắn chào mừng
  // Thêm vào nhóm
  // Cập nhật database
}
```

### Hủy kết bạn
```javascript
if (items[0].json.eventType === 'friend_removed') {
  const removedFriend = items[0].json.userInfo;
  
  // Cập nhật database
  // Gửi thông báo
  // Xóa khỏi các nhóm nếu cần
}
```

## Best Practices

1. **Xử lý thận trọng**: Không tự động chấp nhận tất cả lời mời kết bạn
2. **Kiểm tra bạn chung**: Sử dụng số lượng bạn chung làm tiêu chí lọc
3. **Rate limiting**: Tránh thực hiện quá nhiều thao tác trong thời gian ngắn
4. **Privacy**: Tôn trọng quyền riêng tư của người dùng
5. **Logging**: Ghi log các hoạt động để theo dõi và debug

## Giới hạn

- Có thể bị giới hạn số lượng thao tác kết bạn trong một ngày
- Một số sự kiện có thể có độ trễ
- Cần duy trì kết nối ổn định để nhận sự kiện

## Khắc phục sự cố

### Không nhận được sự kiện
1. Kiểm tra kết nối mạng
2. Đảm bảo đã đăng nhập Zalo thành công
3. Kiểm tra cấu hình bộ lọc
4. Restart workflow

### Sự kiện trùng lặp
1. Sử dụng event ID để dedup
2. Kiểm tra logic xử lý
3. Đảm bảo chỉ có một workflow đang active

## Các node liên quan

- [Zalo CN Login By QR](zalo-login-by-qr.md) - Để đăng nhập vào Zalo
- [Zalo CN User Node](zalo-user.md) - Để thực hiện các thao tác với bạn bè
- [Zalo CN Send Message](zalo-send-message.md) - Để gửi tin nhắn chào mừng
- [Zalo CN Group Node](zalo-group.md) - Để thêm bạn vào nhóm

## Hỗ trợ

Nếu bạn gặp vấn đề với node này, hãy liên hệ qua:
- GitHub Issues: [Báo cáo lỗi](https://github.com/hiennguyen270995/n8n-nodes-zalo-ca-nhan/issues)
- Email: hiennguyen270995@gmail.com
