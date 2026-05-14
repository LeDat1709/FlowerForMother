# FlowerForMother

Trang web nhỏ làm quà tặng mẹ - một bó 9 đóa hoa với hiệu ứng nở, ngôi sao lấp lánh, bướm bay và nhạc nền.

## Nội dung

- 9 đóa hoa CSS, mỗi hoa một màu, sắp xếp thành hình quạt
- Lời nhắn gõ từng chữ (typewriter)
- Phần ý nghĩa từng màu hoa, chuyển động fade-in lần lượt
- Pháo hoa khi click vào trang
- Nút chuyển ngôn ngữ Việt / Anh
- Nhạc nền YouTube (bài *Ước mơ của mẹ*), tự phát khi mở trang

## Cách chạy

Vì có dùng YouTube IFrame API nên không mở trực tiếp file `.html` được, cần một local server:

- VS Code: cài extension **Live Server** rồi chuột phải `index-new.html` → *Open with Live Server*
- Hoặc Python: `python -m http.server 8000` rồi mở `http://localhost:8000/index-new.html`
- Hoặc deploy thẳng lên Vercel / Netlify - chạy ngon luôn

## Cấu trúc

```
index-new.html    - Markup
style-new.css     - Toàn bộ style và animation
main.js           - Hiệu ứng, chuyển ngôn ngữ, điều khiển nhạc
```

## Tuỳ chỉnh

- **Đổi bài nhạc**: sửa `YOUTUBE_VIDEO_ID` ở đầu file `main.js`
- **Đổi lời nhắn**: sửa object `MESSAGES` trong `main.js`
- **Đổi vị trí / màu hoa**: tìm `.flower--1` đến `.flower--9` trong `style-new.css`

## Số 9

9 đóa hoa - đồng âm với *Cửu* (久) trong Hán Việt, nghĩa là lâu dài, vĩnh cửu. Tặng mẹ chúc tình yêu thương mãi mãi.
