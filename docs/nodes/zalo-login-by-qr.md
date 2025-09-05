# Zalo CN Login By QR Node

Node Zalo CN Login By QR cho phép bạn đăng nhập vào Zalo thông qua mã QR một cách tự động trong workflow n8n.

## Mô tả

Đây là node đầu tiên và quan trọng nhất trong bộ công cụ Zalo CN. Node này cho phép bạn thiết lập kết nối với tài khoản Zalo thông qua mã QR, tương tự như cách bạn đăng nhập Zalo Web trên trình duyệt.

## Cách hoạt động

1. Node sẽ khởi động một session đăng nhập mới
2. Tạo ra mã QR tương ứng với session đó
3. Bạn cần quét mã QR bằng ứng dụng Zalo trên điện thoại
4. Sau khi quét thành công, node sẽ lưu thông tin đăng nhập
5. Các node khác trong workflow có thể sử dụng session này để thực hiện các tác vụ

## Cách sử dụng

### Bước 1: Thêm node vào workflow
1. Tạo một workflow mới trong n8n
2. Thêm node "Zalo CN Login By QR" vào workflow
3. Node này thường được đặt ở đầu workflow

### Bước 2: Cấu hình node
1. Không cần cấu hình gì đặc biệt
2. Node sẽ tự động khởi tạo session đăng nhập

### Bước 3: Thực thi và quét QR
1. Chạy workflow
2. Node sẽ sinh ra mã QR code
3. Mở ứng dụng Zalo trên điện thoại
4. Vào mục "Quét mã QR" 
5. Quét mã QR được hiển thị
6. Xác nhận đăng nhập trên điện thoại

### Bước 4: Kiểm tra kết quả
Sau khi đăng nhập thành công, node sẽ trả về thông tin:
- `success`: true/false - trạng thái đăng nhập
- `message`: thông báo kết quả
- `userInfo`: thông tin cơ bản của user
- `sessionId`: ID của session để các node khác sử dụng

## Lưu ý quan trọng

### Bảo mật
- Mã QR chỉ có hiệu lực trong thời gian ngắn (thường là 1-2 phút)
- Không chia sẻ mã QR với người khác
- Session đăng nhập sẽ được lưu trong workflow

### Giới hạn
- Mỗi tài khoản Zalo chỉ có thể đăng nhập trên một số lượng giới hạn thiết bị
- Việc đăng nhập qua node có thể làm đăng xuất khỏi các thiết bị khác

### Khắc phục sự cố
- Nếu QR không hiển thị: Kiểm tra kết nối mạng và thử lại
- Nếu quét QR không thành công: Đảm bảo camera của điện thoại hoạt động tốt
- Nếu đăng nhập thất bại: Thử tạo session mới

## Ví dụ workflow

```json
{
  "name": "Zalo Login Workflow",
  "nodes": [
    {
      "name": "Zalo CN Login By QR",
      "type": "zaloLoginByQr",
      "position": [200, 200],
      "parameters": {}
    },
    {
      "name": "Next Node",
      "type": "zaloUser",
      "position": [400, 200],
      "parameters": {
        "operation": "getUserInfo"
      }
    }
  ]
}
```

## Các node liên quan
- [Zalo CN User Node](zalo-user.md) - Để quản lý thông tin người dùng
- [Zalo CN Group Node](zalo-group.md) - Để quản lý nhóm
- [Zalo CN Send Message](zalo-send-message.md) - Để gửi tin nhắn

## Hỗ trợ
Nếu bạn gặp vấn đề với node này, hãy liên hệ qua:
- GitHub Issues: [Báo cáo lỗi](https://github.com/hiennguyen270995/n8n-nodes-zalo-ca-nhan/issues)
- Email: hiennguyen270995@gmail.com
