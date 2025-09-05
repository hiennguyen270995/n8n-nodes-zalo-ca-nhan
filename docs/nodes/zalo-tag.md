# Zalo CN Tag Node

Node Zalo CN Tag cho phép bạn quản lý và sử dụng hệ thống tag (nhãn) trong Zalo để phân loại và quản lý bạn bè, nhóm một cách hiệu quả.

## Mô tả

Node này cung cấp các chức năng để tạo, quản lý và sử dụng tag trong Zalo. Tag giúp bạn phân loại bạn bè, nhóm theo các tiêu chí như công việc, sở thích, khu vực địa lý, v.v. để dễ dàng quản lý và tương tác.

## Yêu cầu

- Đã đăng nhập thành công qua [Zalo CN Login By QR](zalo-login-by-qr.md)
- Tài khoản Zalo có quyền quản lý tag

## Các thao tác

### Tạo Tag
Tạo một tag mới để phân loại.

**Tham số:**
- `Tên Tag`: Tên của tag (ví dụ: "Đồng nghiệp", "Bạn thân", "Khách hàng")
- `Màu sắc`: Màu sắc đại diện cho tag
- `Mô tả`: Mô tả chi tiết về tag (tùy chọn)

### Lấy danh sách Tag
Lấy tất cả tag hiện có trong tài khoản.

### Cập nhật Tag
Cập nhật thông tin của một tag đã tồn tại.

**Tham số:**
- `ID Tag`: ID của tag cần cập nhật
- `Tên mới`: Tên mới cho tag
- `Màu sắc mới`: Màu sắc mới
- `Mô tả mới`: Mô tả mới

### Xóa Tag
Xóa một tag khỏi hệ thống.

**Tham số:**
- `ID Tag`: ID của tag cần xóa

### Gán Tag cho người dùng
Gán một hoặc nhiều tag cho người dùng.

**Tham số:**
- `ID người dùng`: ID của người dùng
- `Danh sách Tag ID`: Danh sách ID các tag cần gán
- `Thay thế`: Có thay thế tất cả tag cũ không

### Gỡ Tag khỏi người dùng
Gỡ tag khỏi người dùng.

**Tham số:**
- `ID người dùng`: ID của người dùng
- `Tag ID`: ID của tag cần gỡ

### Tìm kiếm theo Tag
Tìm người dùng/nhóm theo tag.

**Tham số:**
- `Tag ID`: ID của tag cần tìm
- `Loại đối tượng`: "Người dùng" hoặc "Nhóm"
- `Giới hạn kết quả`: Số lượng kết quả tối đa

### Lấy tag của người dùng
Lấy danh sách tag được gán cho một người dùng cụ thể.

**Tham số:**
- `ID người dùng`: ID của người dùng

## Cách sử dụng

### Bước 1: Thêm node vào workflow
1. Đảm bảo workflow đã có node "Zalo CN Login By QR" và đã đăng nhập thành công
2. Thêm node "Zalo CN Tag" vào workflow
3. Kết nối node này với các node trước đó

### Bước 2: Cấu hình node
1. Chọn thao tác muốn thực hiện
2. Điền thông tin cần thiết cho từng thao tác
3. Cấu hình các tùy chọn bổ sung

### Bước 3: Thực thi
1. Chạy workflow
2. Node sẽ thực hiện thao tác và trả về kết quả

## Kết quả trả về

### Tạo tag thành công
```json
{
  "success": true,
  "tagId": "tag_unique_id",
  "name": "Đồng nghiệp",
  "color": "#FF6B6B",
  "description": "Các đồng nghiệp trong công ty",
  "createdAt": "2024-01-01T12:00:00Z",
  "usageCount": 0
}
```

### Danh sách tag
```json
{
  "tags": [
    {
      "id": "tag_1",
      "name": "Bạn thân", 
      "color": "#4ECDC4",
      "description": "Những người bạn thân thiết",
      "usageCount": 15,
      "createdAt": "2024-01-01T10:00:00Z"
    },
    {
      "id": "tag_2",
      "name": "Đồng nghiệp",
      "color": "#FF6B6B", 
      "description": "Các đồng nghiệp trong công ty",
      "usageCount": 25,
      "createdAt": "2024-01-01T11:00:00Z"
    }
  ],
  "totalCount": 2
}
```

### Gán tag cho người dùng
```json
{
  "success": true,
  "userId": "user_123",
  "assignedTags": [
    {
      "id": "tag_1",
      "name": "Bạn thân"
    },
    {
      "id": "tag_2", 
      "name": "Đồng nghiệp"
    }
  ],
  "totalTags": 2
}
```

### Tìm kiếm theo tag
```json
{
  "tagId": "tag_1",
  "tagName": "Bạn thân",
  "results": [
    {
      "id": "user_123",
      "name": "Nguyễn Văn A",
      "avatar": "https://avatar_url",
      "type": "user"
    },
    {
      "id": "user_456",
      "name": "Trần Thị B", 
      "avatar": "https://avatar_url",
      "type": "user"
    }
  ],
  "totalResults": 2
}
```

## Ví dụ sử dụng

### Tự động gán tag cho bạn mới
```json
{
  "name": "Auto Tag New Friends",
  "nodes": [
    {
      "name": "Zalo CN Friend Trigger",
      "type": "zaloFriendTrigger",
      "parameters": {
        "eventType": "friend_accepted"
      }
    },
    {
      "name": "Analyze Friend Info",
      "type": "function",
      "parameters": {
        "functionCode": `
          const friendInfo = items[0].json.userInfo;
          let tags = [];
          
          // Logic phân loại tự động
          if (friendInfo.mutualFriends > 10) {
            tags.push("tag_close_friend");
          }
          
          if (friendInfo.isVerified) {
            tags.push("tag_verified");
          }
          
          return [{
            json: {
              userId: friendInfo.id,
              tags: tags
            }
          }];
        `
      }
    },
    {
      "name": "Assign Tags",
      "type": "zaloTag",
      "parameters": {
        "operation": "assignTag",
        "userId": "={{$node['Analyze Friend Info'].json.userId}}",
        "tagIds": "={{$node['Analyze Friend Info'].json.tags}}"
      }
    }
  ]
}
```

### Tìm và nhắn tin theo tag
```json
{
  "name": "Message by Tag",
  "nodes": [
    {
      "name": "Manual Trigger",
      "type": "manualTrigger"
    },
    {
      "name": "Search by Tag",
      "type": "zaloTag",
      "parameters": {
        "operation": "searchByTag",
        "tagId": "tag_customer",
        "objectType": "user",
        "limit": 50
      }
    },
    {
      "name": "Send Promotional Message",
      "type": "zaloSendMessage",
      "parameters": {
        "messageType": "text",
        "recipients": "={{$node['Search by Tag'].json.results.map(r => r.id)}}",
        "content": "Chúng tôi có chương trình khuyến mãi đặc biệt dành cho bạn!"
      }
    }
  ]
}
```

### Quản lý tag định kỳ
```json
{
  "name": "Tag Management Cleanup", 
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "scheduleTrigger",
      "parameters": {
        "rule": {
          "interval": [{"field": "weeks", "value": 1}]
        }
      }
    },
    {
      "name": "Get All Tags",
      "type": "zaloTag",
      "parameters": {
        "operation": "getAllTags"
      }
    },
    {
      "name": "Find Unused Tags",
      "type": "function",
      "parameters": {
        "functionCode": `
          const tags = items[0].json.tags;
          const unusedTags = tags.filter(tag => tag.usageCount === 0);
          
          return [{
            json: {
              unusedTags: unusedTags
            }
          }];
        `
      }
    },
    {
      "name": "Delete Unused Tags",
      "type": "zaloTag",
      "parameters": {
        "operation": "deleteTag",
        "tagId": "={{$item.id}}"
      }
    }
  ]
}
```

## Màu sắc tag được hỗ trợ

- `#FF6B6B` - Đỏ
- `#4ECDC4` - Xanh ngọc
- `#45B7D1` - Xanh dương
- `#96CEB4` - Xanh lá
- `#FFEAA7` - Vàng
- `#DDA0DD` - Tím
- `#98D8C8` - Xanh mint
- `#F7DC6F` - Vàng đậm
- `#BB8FCE` - Tím nhạt
- `#85C1E9` - Xanh nhạt

## Best Practices

1. **Tên tag rõ ràng**: Sử dụng tên tag dễ hiểu và nhất quán
2. **Màu sắc phân biệt**: Chọn màu sắc khác nhau để dễ phân biệt
3. **Số lượng hợp lý**: Không tạo quá nhiều tag gây rối
4. **Cập nhật thường xuyên**: Thường xuyên xem xét và cập nhật tag
5. **Tự động hóa**: Sử dụng automation để gán tag tự động

## Giới hạn

- Số lượng tag tối đa có thể bị giới hạn
- Mỗi người dùng có thể có giới hạn số tag được gán
- Tên tag có độ dài tối đa nhất định
- Một số màu sắc có thể không được hỗ trợ

## Xử lý lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi tên tag đã tồn tại
- Lỗi tag không tồn tại
- Lỗi không có quyền quản lý tag
- Lỗi người dùng không tồn tại
- Lỗi vượt quá giới hạn số lượng tag

## Các node liên quan

- [Zalo CN Login By QR](zalo-login-by-qr.md) - Để đăng nhập vào Zalo
- [Zalo CN User Node](zalo-user.md) - Để quản lý thông tin người dùng
- [Zalo CN Friend Trigger](zalo-friend-trigger.md) - Để tự động gán tag cho bạn mới
- [Zalo CN Send Message](zalo-send-message.md) - Để gửi tin nhắn theo tag

## Hỗ trợ

Nếu bạn gặp vấn đề với node này, hãy liên hệ qua:
- GitHub Issues: [Báo cáo lỗi](https://github.com/hiennguyen270995/n8n-nodes-zalo-ca-nhan/issues)
- Email: hiennguyen270995@gmail.com
