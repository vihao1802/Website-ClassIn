# Hybrid API_LIST

Danh sách các API của đồ án

## bailambaitap

**GET** - bailambaitap/list/{baitapId} # Xem tất cả các bài làm bài tập của một bài tập
**GET** - bailambaitap/{id} # Xem thông tin một bài làm bài tập
**POST** - bailambaitap/create # Tạo một bài làm bài tập
**DELETE** - bailambaitap/delete # Xóa một bài làm bài tập

## bailamkiemtra

**GET** - bailamkiemtra/list/{dekiemtraId} # Xem tất cả các bài làm kiểm tra của một đề kiểm tra
**GET** - bailamkiemtra/{id} # Xem thông tin một bài làm kiểm tra
**GET** - bailamkiemtra/{studentId} # Xem thông tin một bài làm kiểm tra của một học sinh
**POST** - bailamkiemtra/create # Tạo một bài làm kiểm tra
**DELETE** - bailamkiemtra/delete # Xóa một bài làm kiểm tra

## baitap

**GET** - baitap/list/{chuongId} # Xem tất cả các bài tập của chương
**GET** - baitap/{id} # Xem thông tin một bài tập
**POST** - baitap/create # Tạo một bài tập
**DELETE** - baitap/delete # Xóa một bài tập
**UPDATE** -baitap/edit # Chỉnh sửa một bài tập

## banbe

## cauhoi

**GET** - cauhoi/list/{taikhoanId} # Xem tất cả các câu hỏi của người dùng
**GET** - cauhoi/{id} # Xem thông tin một câu hỏi
**POST** - cauhoi/create # Tạo một câu hỏi
**DELETE** - cauhoi/delete # Xóa một câu hỏi
**UPDATE** -cauhoi/edit # Chỉnh sửa một câu hỏi

## cautraloi

**GET** - cautraloi/list/{cauhoiId} # Xem tất cả các câu trả lời của câu hỏi
**GET** - cautraloi/{id} # Xem thông tin một câu trả lời
**POST** - cautraloi/create # Tạo một câu trả lời
**DELETE** - cautraloi/delete # Xóa một câu trả lời
**UPDATE** -cautraloi/edit # Chỉnh sửa một câu trả lời

## chitietbaikiemtra

**GET** - chitietbaikiemtra/{dekiemtraId} # Xem thông tin chi tiết bài kiểm tra của đề kiểm tra
**POST** - chitietbaikiemtra/create # Tạo một record chi tiết bài kiểm tra
**POST** - chitietbaikiemtra/create/list # Tạo nhiều record chi tiết bài kiểm tra (dùng query parameter)
**DELETE** - chitietbaikiemtra/delete # Xóa một record chi tiết bài kiểm tra
**UPDATE** -chitietbaikiemtra/edit # Chỉnh sửa một record chi tiết bài kiểm tra

## chittietbailamkiemtra

**GET** - chittietbailamkiemtra/{bailamkiemtraId} # Xem thông tin danh sách chi tiết bài làm kiểm tra của bài làm kiểm tra
**POST** - chittietbailamkiemtra/create # Tạo một record chi tiết bài làm kiểm tra (dùng query parameter)
**POST** - chittietbailamkiemtra/create/list # Tạo nhiều record chi tiết bài làm kiểm tra (dùng query parameter)
**DELETE** - chittietbailamkiemtra/delete # Xóa một record chi tiết bài làm kiểm tra (dùng query parameter)
**UPDATE** -chittietbailamkiemtra/edit # Chỉnh sửa một record chi tiết bài làm kiểm tra (dùng query parameter)

## chuong

**GET** - chuong/list/{lopId} # Xem tất cả các chương của lớp học
**GET** - chuong/{id} # Xem thông tin một chương
**POST** - chuong/create # Tạo một chương
**DELETE** - chuong/delete # Xóa một chương
**UPDATE** -chuong/edit # Chỉnh sửa thông tin một chương

## dekiemtra

**GET** - dekiemtra/list/{lopId} # Xem tất cả các đề kiểm tra của lớp học
**GET** - dekiemtra/{id} # Xem thông tin một đề kiểm tra
**POST** - dekiemtra/create # Tạo một đề kiểm tra
**DELETE** - dekiemtra/delete # Xóa một đề kiểm tra
**UPDATE** -dekiemtra/edit # Chỉnh sửa thông tin một đề kiểm tra

## filebailambaitap

## filebaitap

## filehoclieu

## hoclieu

## lophoc

**GET** - lophoc/list/{lopId} # Xem tất cả các lớp học của tài khoản
**GET** - lophoc/{id} # Xem thông tin một lớp học
**POST** - lophoc/create # Tạo một lớp học
**DELETE** - lophoc/delete # Xóa một lớp học
**UPDATE** -lophoc/edit # Chỉnh sửa thông tin một lớp học

## luuvetbailamkiemtra

## nhomchat

## nhomquyen

## taikhoan

**GET** - taikhoan/list/{lopId} # Xem tất cả các tài khoản
**GET** - taikhoan/{id} # Xem thông tin một tài khoản
**POST** - taikhoan/create # Tạo một tài khoản
**DELETE** - taikhoan/delete # Xóa một tài khoản
**UPDATE** -taikhoan/edit # Chỉnh sửa thông tin một tài khoản

## thamgialophoc

**GET** - thamgialophoc/{studentId} # Xem danh sách các lớp học mà học sinh tham gia
**GET** - thamgialophoc/{lopId} # Xem danh sách học sinh một lớp học
**POST** - thamgialophoc/create # Thêm một thành viên vào lớp học (dùng query parameter)
**DELETE** - thamgialophoc/delete # Xóa một thành viên khỏi lớp học(dùng query parameter)
**UPDATE** -thamgialophoc/edit # Chỉnh sửa thông tin một tham gia lớp học(dùng query parameter)

## tinnhan

## tinnhanbanbe
