# hw6-connecting-to-a-backend
- 學號：R11922101 
- 系級：資工碩一 
- 姓名：黃嘉宏 
## 1. Deploy 連結
- https://r11922101-pui-hw6.netlify.app/
## 2. 實作的加分作業項目
- Display More
    - 點選「Display More」按鈕，便會下載下一頁的 10 張圖片，並把它們添加到現有圖片後方。
- 擴充影像搜尋功能
    - 點選「Advanced Search」，便會出現進階搜尋的擴充選項，支援 orientation、order by、color 的搜尋條件。

## 3. 連結後端的方法
使用 Firebase Cloud Firestore 的 Library `firebase/firestore`，及其提供的 API 操作。花了一些時間在看他的 docs，但整體而言並不難。

## 4. 你實作的網站中與提出的作業規範不同之處
- 我在產品總覽頁面加入了一些防呆設計。若產品沒有金額、或是沒有任何剩餘的顏色，該產品會被禁用（See Page 按鈕會被反灰並且禁用、且圖片無法點擊）。
- 在產品 Detail 頁面，我使用 React Router 實作 REST 風格的網址設計（`/shirt/:id`）。
    - 若使用者輸入被禁用的商品網址，Add to Cart 按鈕一樣會被反灰並且禁用，就算選擇尺寸，也無法點擊按鈕。
- 頁首的購物車按鈕，若在未登入狀態下點擊，會自動跳轉到登入頁面。
- 搜尋圖片時支援 Enter 鍵啟動搜尋。
- 購物車更新，即便從不同瀏覽器視窗更改，都會即時更新。