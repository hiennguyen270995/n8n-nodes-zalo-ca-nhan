# 🚀 n8n-nodes-zalo-ca-nhan

[![npm version](https://badge.fury.io/js/n8n-nodes-zalo-ca-nhan.svg)](https://badge.fury.io/js/n8n-nodes-zalo-ca-nhan)
[![Downloads](https://img.shields.io/npm/dm/n8n-nodes-zalo-ca-nhan.svg)](https://www.npmjs.com/package/n8n-nodes-zalo-ca-nhan)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🚀 **Community nodes package cho n8n** - Tự động hóa Zalo hoàn chỉnh với workflow automation

Thư viện n8n nodes chuyên nghiệp để tích hợp và tự động hóa Zalo thông qua n8n workflow. Sử dụng `zalo-api-final` thay thế `zca-js` deprecated để đảm bảo tính ổn định và hiệu suất cao.

## 📖 Tài liệu hướng dẫn chi tiết

🔗 **[Xem hướng dẫn đầy đủ tại Documentation](https://hiennguyen270995.github.io/n8n-nodes-zalo-ca-nhan/)**

Tài liệu bao gồm:
- 📋 Hướng dẫn cài đặt từng bước
- ⚙️ Cấu hình và thiết lập credentials  
- 📝 Documentation chi tiết cho từng node
- 🎯 Ví dụ thực tế và best practices
- 🔧 Troubleshooting và FAQ

## 🎯 Dành cho ai?

- 🔄 **N8N Users** muốn tự động hóa workflow Zalo
- 🏢 **Doanh nghiệp** cần automation marketing qua Zalo  
- 🤖 **Developer** xây dựng chatbot và hệ thống CRM
- 📱 **Marketer** tự động hóa chiến dịch qua Zalo
- 🛒 **Bán hàng online** quản lý khách hàng tự động
- 🔔 **System Admin** thiết lập notification system

## ✨ Tính năng chính

### 🎯 8 Nodes chuyên nghiệp cho n8n automation:

- **🔐 Zalo Login Via QR Code** - Đăng nhập Zalo bằng QR code tự động
- **💬 Zalo Send Message** - Gửi tin nhắn tự động đến cá nhân/nhóm
- **👤 Zalo User** - Quản lý thông tin người dùng, cập nhật profile
- **👥 Zalo Group** - Quản lý nhóm, tạo ghi chú, thêm thành viên
- **📨 Zalo Message Trigger** - Webhook lắng nghe tin nhắn đến
- **🤝 Zalo Friend Trigger** - Webhook lắng nghe sự kiện kết bạn
- **📊 Zalo Poll** - Tạo và quản lý poll trong nhóm
- **🏷️ Zalo Tag** - Quản lý tag, phân loại liên hệ

### 🎯 Ứng dụng thực tế:

- **🤖 Chatbot automation** - Tự động trả lời tin nhắn
- **📈 Marketing automation** - Gửi tin nhắn marketing hàng loạt  
- **🔔 Notification system** - Thông báo tự động từ hệ thống
- **📊 CRM integration** - Tích hợp với hệ thống CRM
- **📋 Lead management** - Quản lý khách hàng tiềm năng
- **📈 Sales automation** - Tự động hóa quy trình bán hàng

## 📦 Cài đặt

### 🎯 Community Nodes (Khuyến nghị)

Đối với người dùng n8n v0.187+, bạn có thể cài đặt node này trực tiếp từ bảng Community Nodes trong trình soạn thảo n8n.

1. Mở trình soạn thảo n8n của bạn
2. Vào **Settings** > **Community Nodes**
3. Tìm kiếm `n8n-nodes-zalo-ca-nhan`
4. Nhấp vào **Install**
5. Tải lại trình soạn thảo

### 📋 Cài đặt thủ công

Bạn cũng có thể cài đặt node này theo cách thủ công:

```bash
cd YOUR_N8N_INSTALLATION_DIRECTORY
npm install n8n-nodes-zalo-ca-nhan
```

## 🎯 Available Nodes

### 1. 🔐 Zalo Login By QR
Node cho phép đăng nhập vào Zalo thông qua mã QR code tự động.

### 2. 👥 Zalo Group  
Node quản lý các hoạt động nhóm với đầy đủ operations:
- **createGroup**: Tạo nhóm mới
- **getGroupInfo**: Lấy thông tin nhóm  
- **addGroupDeputy**: Thêm phó nhóm
- **addUserToGroup**: Thêm thành viên
- **changeGroupAvatar**: Đổi avatar nhóm
- **changeGroupName**: Đổi tên nhóm
- **getGroupMembers**: Lấy danh sách thành viên
- **getAllGroups**: Lấy tất cả nhóm
- **removeUserFromGroup**: Xóa thành viên

### 3. 👤 Zalo User
Node quản lý người dùng và bạn bè với các operations:
- **acceptFriendRequest**: Chấp nhận lời mời kết bạn
- **sendFriendRequest**: Gửi lời mời kết bạn
- **blockUser**: Chặn người dùng
- **unblockUser**: Bỏ chặn người dùng
- **changeAccountAvatar**: Đổi ảnh đại diện
- **changeAccountSetting**: Thay đổi cài đặt tài khoản
- **getUserInfo**: Lấy thông tin người dùng
- **getAllFriends**: Lấy danh sách bạn bè
- **findUser**: Tìm kiếm người dùng qua số điện thoại

### 4. Zalo Send Message
Node gửi tin nhắn tới người dùng hoặc nhóm với features:
- Gửi tin nhắn văn bản, hình ảnh, video
- Gửi sticker, emoji, link preview
- Forward tin nhắn
- Gửi với urgency levels

### 5. 📨 Zalo Message Trigger
Node lắng nghe và xử lý các sự kiện tin nhắn real-time:
- Tin nhắn mới từ cá nhân
- Tin nhắn nhóm
- Thay đổi trạng thái tin nhắn

### 6. 🤝 Zalo Friend Trigger
Node webhook lắng nghe sự kiện kết bạn:
- Lời mời kết bạn mới
- Chấp nhận/từ chối kết bạn
- Thay đổi trạng thái bạn bè

### 7. 📊 Zalo Poll
Node tạo và quản lý poll trong nhóm:
- Tạo poll với nhiều lựa chọn
- Theo dõi kết quả vote
- Quản lý thời gian poll

### 8. 🏷️ Zalo Tag
Node quản lý tag và phân loại liên hệ:
- Tạo/xóa tag
- Gán tag cho liên hệ
- Tìm kiếm theo tag

## ☕ Ủng hộ dự án

Nếu package này giúp bạn tiết kiệm thời gian hoặc giải quyết được vấn đề, hãy cân nhắc ủng hộ tác giả một ☕ để duy trì và phát triển thêm tính năng mới! 

**📱 Quét QR Code để mời cafe:**

<img src="https://github.com/hiennguyen270995/n8n-nodes-zalo-ca-nhan/blob/main/qr.png?raw=true" alt="QR Code VietinBank" width="200">

*VietinBank - 100884532014 - NGUYEN THI HIEN*

## 🔧 Cấu hình

### 📝 Credentials cần thiết:

- **Cookie** - Cookie từ phiên đăng nhập Zalo
- **IMEI** - IMEI identifier từ Zalo  
- **User Agent** - User Agent từ browser

### 🚀 Sử dụng:

Sau khi cài đặt, bạn sẽ tìm thấy các Zalo nodes trong node palette thuộc danh mục **"Zalo"**.

## 🛠 Công nghệ

- ✅ **zalo-api-final@2.1.0** - Thư viện Zalo API mới nhất, ổn định

## ⚠️ Lưu ý quan trọng

**Vui lòng đọc kỹ trước khi sử dụng Zalo nodes:**

⚠️ **Cảnh báo**: Việc sử dụng thư viện này đồng nghĩa với việc bạn đang làm trái với chính sách của Zalo và nó có thể khiến cho tài khoản của bạn bị vô hiệu hóa. Chúng tôi sẽ không chịu trách nhiệm nếu điều đó xảy ra, vậy nên hãy cân nhắc trước khi sử dụng.

**📝 Khuyến nghị:**
- Sử dụng tài khoản test, không dùng tài khoản chính
- Tuân thủ giới hạn rate limit của Zalo
- Sử dụng có trách nhiệm và không spam

## 🙏 Cảm ơn

Chúng tôi xin chân thành cảm ơn:
- **hiennguyen270995** cho thư viện [zalo-api-final](https://github.com/hiennguyen270995/zalo-api-final)
- **AloneSky Team** cho repo gốc [n8n-nodes-zalo-ca-nhan](https://github.com/hiennguyen270995/n8n-nodes-zalo-ca-nhan)
- **n8n Community** đã tạo ra nền tảng automation tuyệt vời
 
## 📄 License
  
MIT 

## 👨‍💻 Tác giả

**Hien Nguyen Juno**  
- GitHub: [@hiennguyen270995](https://github.com/hiennguyen270995)
- Email: hiennguyen270995@gmail.com

---

🌟 **Nếu thấy hữu ích, hãy cho repo một ⭐ star để ủng hộ tác giả!**

## 🌟 Credits

Dựa trên thư viện [zalo-api-final](https://github.com/hiennguyen270995/zalo-api-final) và repo gốc [n8n-nodes-zalo-ca-nhan](https://github.com/hiennguyen270995/n8n-nodes-zalo-ca-nhan) với nhiều cải tiến và tối ưu hóa cho n8n automation.

---

**⭐ Nếu package hữu ích, hãy cho chúng tôi một star trên GitHub!**

**💡 Có ý tưởng node mới cho n8n? Hãy tạo issue để thảo luận!**
