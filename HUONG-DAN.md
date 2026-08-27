# Sổ Chi Tiêu v1.1 — Hướng dẫn

App ghi thu chi cá nhân, chạy dưới dạng **PWA** (Progressive Web App — web app cài được như app thật).
Không cần Google Play, không cần App Store, không cần máy Mac, không hết hạn.

## File trong gói

| File | Vai trò |
|---|---|
| `index.html` | Toàn bộ app — giao diện + xử lý + dữ liệu |
| `manifest.json` | Khai báo tên, icon, màu để cài lên màn hình chính |
| `sw.js` | Service worker — cho phép mở app khi không có mạng |
| `icon-192.png`, `icon-512.png`, `icon-maskable.png` | Icon ngoài màn hình chính |

Cả 5 file phải nằm **cùng một thư mục**.

---

## Bước 1 — Đưa lên web (bắt buộc dùng HTTPS)

iOS và Android chỉ cho cài PWA khi trang chạy qua **HTTPS**. Mở file trực tiếp từ điện thoại sẽ không cài được.

### Cách A — GitHub Pages (miễn phí, khuyên dùng)

1. Tạo repo mới trên GitHub, ví dụ `so-chi-tieu`. Có thể để **Private**? Không — Pages ở gói miễn phí cần repo **Public**. Dữ liệu chi tiêu của bạn **không** nằm trong repo (chỉ có mã nguồn), nên để public vẫn an toàn.
2. Tải cả 5 file lên repo (kéo thả vào giao diện web GitHub là được).
3. Vào **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. Đợi 1–2 phút, GitHub cho địa chỉ dạng `https://<tên-tài-khoản>.github.io/so-chi-tieu/`.

### Cách B — VPS của bạn

Copy thư mục vào thư mục web (`/var/www/html/so-chi-tieu/`), trỏ tên miền hoặc dùng Caddy/Nginx có SSL. Vì bạn đã có VPS sẵn thì đây là cách gọn nhất và hoàn toàn riêng tư.

---

## Bước 2 — Cài lên điện thoại

**iPhone (iOS)**
Mở địa chỉ bằng **Safari** (bắt buộc Safari, Chrome trên iOS không cài được)
→ nút Chia sẻ ⬆️ → **Thêm vào MH chính** (Add to Home Screen) → Thêm.

**Android**
Mở bằng **Chrome** → menu ⋮ → **Cài đặt ứng dụng** / **Thêm vào Màn hình chính**.

Sau khi cài, mở app từ icon ngoài màn hình chính — không mở lại bằng trình duyệt.
Mở từ icon thì mới chạy toàn màn hình và **dữ liệu mới được giữ lâu dài**.

---

## Bước 3 — Dùng

- Nút **+** đỏ → mở phiếu ghi. Chọn **Chi ra / Thu vào / Chuyển ví**.
- Nhập tiền bằng bàn phím số riêng, có phím `000` cho nhanh.
- Chọn danh mục, ví, ngày, ghi chú → **Lưu phiếu**.
- Chạm vào một dòng ở tab **Giao dịch** để sửa hoặc xóa.
- **⚙️ Cài đặt**: đặt ngân sách tháng tổng, ngân sách riêng từng danh mục, xuất/nhập file sao lưu.
- Tab **Ví**: thêm ví, đặt số dư ban đầu, xem số dư hiện tại.

---

## Quan trọng — Sao lưu

Dữ liệu nằm trong bộ nhớ trình duyệt của máy đó. Sẽ **mất** nếu:

- xóa lịch sử duyệt web / xóa dữ liệu trang web;
- gỡ icon app khỏi màn hình chính;
- đổi máy.

→ Định kỳ vào **⚙️ Cài đặt → ⬇️ Xuất file**, lưu file `.json` vào iCloud/Google Drive/Zalo của chính mình.
Máy mới chỉ cần **⬆️ Nhập file** là có lại đủ.

---

## Mới ở v1.1

- **Bảng màu hành Mộc**: nền rừng đêm, gáy sổ ngọc bích, vân gỗ mờ. Không dùng đỏ, không dùng trắng tinh.
- **Hai giao diện**: 🌲 Mộc đêm và 🎋 Mộc sáng (giấy tre ngả xanh). Đổi trong ⚙️ Cài đặt, app nhớ lựa chọn.
- **Tab So sánh**:
  - Cột chi 6 tháng gần nhất, chạm vào cột để nhảy sang tháng đó;
  - Tháng này so tháng trước: chi ra / thu vào / dư ra, kèm % tăng giảm;
  - Chênh lệch từng danh mục, sắp theo mức biến động lớn nhất.
- **Hiệu ứng**: nút nảy và gợn sóng khi bấm, danh sách hiện dần theo thứ tự, vòng tròn và thanh ngân sách chạy từ 0, đổi tháng trượt trái/phải, nút + thở nhẹ rồi xoay thành ✕ khi mở phiếu, rung phản hồi khi bấm phím số. Máy bật "Giảm chuyển động" thì tất cả tự tắt.
- Con dấu khi lưu đổi từ đỏ sang **dấu ngọc**.

---

## Sửa app về sau

Sửa `index.html`, rồi **đổi số phiên bản** trong `sw.js`:

```js
const PHIEN_BAN = 'so-chi-tieu-v1.2';   // đổi mỗi lần cập nhật
```

Không đổi dòng này thì điện thoại vẫn dùng bản cũ đã cache.
