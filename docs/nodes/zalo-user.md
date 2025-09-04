# Zalo User Node

Node Zalo User cho phép bạn tương tác với API người dùng của Zalo, giúp quản lý thông tin người dùng, kết bạn và các cài đặt tài khoản.

## Các Thao Tác

### Chấp nhận lời mời kết bạn
Chấp nhận lời mời kết bạn từ một người dùng khác.

**Tham số:**
- `User ID`: ID của người dùng cần chấp nhận lời mời kết bạn

### Gửi lời mời kết bạn
Gửi lời mời kết bạn đến một người dùng khác.

**Tham số:**
- `User ID`: ID của người dùng cần gửi lời mời kết bạn
- `Message`: Tin nhắn kèm theo lời mời kết bạn

### Chặn người dùng
Chặn một người dùng khác.

**Tham số:**
- `User ID`: ID của người dùng cần chặn

### Bỏ chặn người dùng
Bỏ chặn một người dùng đã bị chặn trước đó.

**Tham số:**
- `User ID`: ID của người dùng cần bỏ chặn

### Đổi ảnh đại diện
Thay đổi ảnh đại diện của tài khoản.

**Tham số:**
- `User ID`: ID của người dùng cần đổi ảnh đại diện
- `File Path`: Đường dẫn đến file ảnh đại diện

### Thay đổi cài đặt tài khoản
Cập nhật thông tin và cài đặt của tài khoản.

**Tham số:**
- `Name`: Tên hiển thị mới
- `Date of Birth`: Ngày sinh (định dạng YYYY-MM-DD)
- `Gender`: Giới tính (1: Nam, 2: Nữ, 3: Khác)
- `Language`: Ngôn ngữ (vi, en) - tùy chọn

### Lấy thông tin người dùng
Lấy thông tin chi tiết của một người dùng.

**Tham số:**
- `User ID`: ID của người dùng cần lấy thông tin

### Lấy danh sách bạn bè
Lấy danh sách tất cả bạn bè của tài khoản.

**Tham số:**
- `Limit`: Số lượng bạn bè tối đa cần lấy (mặc định: 50)

### Tìm kiếm người dùng
Tìm kiếm người dùng theo số điện thoại.

**Tham số:**
- `Phone Number`: Số điện thoại cần tìm kiếm
- `Limit`: Số lượng kết quả tối đa (mặc định: 50)

## Ví Dụ Sử Dụng

### Gửi lời mời kết bạn
```typescript
const userId = "123456789";
const message = "Xin chào! Tôi muốn kết bạn với bạn.";
```

### Thay đổi cài đặt tài khoản
```typescript
const name = "Nguyễn Văn A";
const dob = "1990-01-01";
const gender = 1; // 1: Nam
const language = "vi";
```

### Tìm kiếm người dùng
```typescript
const phoneNumber = "0987654321";
const limit = 10;
```

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi ID người dùng không hợp lệ
- Lỗi quyền truy cập
- Lỗi định dạng dữ liệu
- Lỗi kết nối mạng

## Best Practices

1. **Quản lý kết bạn:**
   - Gửi tin nhắn cá nhân khi kết bạn
   - Không gửi quá nhiều lời mời kết bạn trong thời gian ngắn

2. **Cập nhật thông tin:**
   - Sử dụng ảnh đại diện có kích thước phù hợp
   - Cập nhật thông tin chính xác và đầy đủ

3. **Tìm kiếm người dùng:**
   - Sử dụng số điện thoại chính xác
   - Giới hạn số lượng kết quả tìm kiếm phù hợp
