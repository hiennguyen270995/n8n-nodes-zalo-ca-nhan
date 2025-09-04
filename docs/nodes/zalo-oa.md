# Zalo OA Node

Zalo OA Node cho phép bạn tương tác với Zalo Official Account API.

## Các thao tác

### 1. Gửi tin nhắn
- **Tham số**:
  - `userId`: ID người nhận
  - `message`: Nội dung tin nhắn
  - `messageType`: Loại tin nhắn (text, image, file)

- **Ví dụ**:
  ```typescript
  const result = await zalo.sendMessage({
    userId: '123456789',
    message: 'Xin chào!',
    messageType: 'text'
  });
  ```

### 2. Lấy thông tin người dùng
- **Tham số**:
  - `userId`: ID người dùng

- **Ví dụ**:
  ```typescript
  const userInfo = await zalo.getUserInfo('123456789');
  ```

### 3. Lấy danh sách người theo dõi
- **Tham số**:
  - `offset`: Vị trí bắt đầu
  - `count`: Số lượng người dùng cần lấy

- **Ví dụ**:
  ```typescript
  const followers = await zalo.getFollowers({
    offset: 0,
    count: 10
  });
  ```

## Xử lý lỗi

Node xử lý các lỗi phổ biến:

1. **Lỗi xác thực**
   - Token không hợp lệ
   - Token hết hạn
   - Quyền truy cập không đủ

2. **Lỗi yêu cầu**
   - Tham số không hợp lệ
   - Giới hạn tốc độ
   - Lỗi mạng

3. **Lỗi nội dung**
   - Tin nhắn quá dài
   - File không hợp lệ
   - Nội dung không được phép

## Ví dụ sử dụng

1. **Gửi tin nhắn tự động**
   ```typescript
   const workflow = new Workflow({
     nodes: [
       {
         type: 'zalo-oa',
         operation: 'sendMessage',
         params: {
           userId: '{{$node.previous.json.userId}}',
           message: 'Chào mừng bạn đến với OA của chúng tôi!'
         }
       }
     ]
   });
   ```

2. **Xử lý phản hồi**
   ```typescript
   const workflow = new Workflow({
     nodes: [
       {
         type: 'zalo-oa',
         operation: 'getUserInfo',
         params: {
           userId: '{{$node.previous.json.userId}}'
         }
       },
       {
         type: 'zalo-oa',
         operation: 'sendMessage',
         params: {
           userId: '{{$node.previous.json.userId}}',
           message: 'Xin chào {{$node.previous.json.name}}!'
         }
       }
     ]
   });
   ```

## Bước tiếp theo

Sau khi hiểu về Zalo OA Node, bạn có thể:

1. [Tìm hiểu về Zalo Group Node](zalo-group.md)
2. [Tìm hiểu về Zalo User Node](zalo-user.md)
3. [Thiết lập webhook](getting-started/webhook.md) 