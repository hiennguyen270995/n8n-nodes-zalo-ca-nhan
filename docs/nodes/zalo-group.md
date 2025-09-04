# Zalo Group Node

Node Zalo Group cho phép bạn tương tác với API nhóm của Zalo, giúp quản lý các nhóm và thành viên trong nhóm một cách dễ dàng.

## Các Thao Tác

### Tạo Nhóm
Tạo một nhóm mới trên Zalo.

**Tham số:**
- `Tên Nhóm`: Tên của nhóm mới
- `Danh Sách ID Thành Viên`: Danh sách ID của các thành viên ban đầu, phân cách bằng dấu phẩy

### Lấy Thông Tin Nhóm
Lấy thông tin chi tiết của một nhóm.

**Tham số:**
- `ID Nhóm`: ID của nhóm cần lấy thông tin

### Thêm Phó Nhóm
Thêm một người dùng làm phó nhóm.

**Tham số:**
- `ID Nhóm`: ID của nhóm
- `ID Người Dùng`: ID của người dùng cần thêm làm phó nhóm

### Thêm Thành Viên Vào Nhóm
Thêm một hoặc nhiều thành viên vào nhóm.

**Tham số:**
- `ID Nhóm`: ID của nhóm
- `Danh Sách ID Thành Viên`: Danh sách ID của các thành viên cần thêm, phân cách bằng dấu phẩy

### Đổi Avatar Nhóm
Thay đổi ảnh đại diện của nhóm.

**Tham số:**
- `ID Nhóm`: ID của nhóm
- `URL Ảnh`: URL của ảnh đại diện mới

### Đổi Tên Nhóm
Thay đổi tên của nhóm.

**Tham số:**
- `ID Nhóm`: ID của nhóm
- `Tên Mới`: Tên mới của nhóm

### Lấy Danh Sách Thành Viên
Lấy danh sách các thành viên trong nhóm.

**Tham số:**
- `ID Nhóm`: ID của nhóm
- `Giới Hạn`: Số lượng thành viên tối đa cần lấy (mặc định: 50)

### Lấy Tất Cả Nhóm
Lấy danh sách tất cả các nhóm.

**Tham số:**
- `Giới Hạn`: Số lượng nhóm tối đa cần lấy (mặc định: 50)

### Xóa Thành Viên Khỏi Nhóm
Xóa một hoặc nhiều thành viên khỏi nhóm.

**Tham số:**
- `ID Nhóm`: ID của nhóm
- `ID Người Dùng`: Danh sách ID của các thành viên cần xóa, phân cách bằng dấu phẩy

## Ví Dụ Sử Dụng

### Tạo Nhóm Mới
```typescript
const groupName = "Nhóm Công Việc";
const userIds = "123456789,987654321";
```

### Lấy Thông Tin Nhóm
```typescript
const groupId = "123456789";
```

### Thêm Thành Viên
```typescript
const groupId = "123456789";
const userIds = "111222333,444555666";
```

## Xử Lý Lỗi

Node sẽ xử lý các lỗi phổ biến sau:
- Lỗi ID nhóm không hợp lệ
- Lỗi ID người dùng không hợp lệ
- Lỗi quyền truy cập
- Lỗi kết nối mạng

