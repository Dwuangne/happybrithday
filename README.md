# Birthday-TH (Next.js)

Ứng dụng chúc mừng sinh nhật tương tác — phiên bản Next.js hiện đại, thay ảnh PNG bằng UI CSS/React.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Tùy chỉnh

Chỉnh sửa [`lib/birthday-config.ts`](lib/birthday-config.ts):

- `recipientName` — tên người nhận
- `balloonLetters` — chữ trên bóng bay
- `messageLines` — lời chúc (dùng `{name}` cho tên)
- `buttons` — nhãn các nút

## Hình ảnh & nhạc

Assets gốc được copy vào `public/` (bóng đèn, bóng bay, banner, viền, bánh `bd1.jpg`).

Thêm `public/hbd.mp3` để phát nhạc ở bước "Phát nhạc".

## Bản gốc

Phiên bản HTML/jQuery gốc nằm trong thư mục [`birthday/`](birthday/).
