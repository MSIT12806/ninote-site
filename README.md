# Intugrove product site

Intugrove 的公開產品介紹網站。這個 repository 只保存對外網站內容，不包含私有產品原始碼或內部文件；`ninote-site` repository 名稱是為了既有發布與更新相容而保留的技術識別。

網站包含三個部分：

- `/`：產品介紹與目前產品範圍
- `/guide/`：依使用情境編排的完整使用說明
- `/demo/`：由正式 Intugrove Desktop 整合測試錄製的真實產品畫面與三種編輯模式對照

首頁與 `/demo/` 的產品媒體位於 `public/product-media/`。GIF、同源 PNG 與 manifest 由內部 NiNote repository 的 `scripts/capture-product-media.ps1` 產生；網站不另行重建 Intugrove 編輯器或 View 互動。

## 試用申請與公開配布政策（2026-09-14）

Intugrove 目前不提供公開下載或免費版本。試用者須寄信至 **alegalone@gmail.com** 聯絡 Robin 本人申請；收到申請後由 Robin 個別聯繫並提供取得方式。網站不承諾試用期限、價格或自動取得資格。

- 首頁主要按鈕、原下載區、頁尾聯絡入口都使用同一個 mailto 地址，主旨為「Intugrove 試用申請」。
- 主要導覽改為「申請試用」；保留原本 `#download` 錨點，讓舊連結仍可到達申請說明。
- 公開頁面不再提供 MSI、Setup、portable、GitHub Releases 或更新檔連結，也不宣稱免費或可直接下載。
- GitHub 的 v0.1.0、v0.1.1 已撤為非公開草稿，保留原附件與 tags；重新公開必須由 Robin 明確決定。
- 發布前執行 `pnpm test:trial`、`pnpm test:brand`、`pnpm test:guide-media` 與 `pnpm build`；發布後以匿名請求確認公開 Release 清單為空、舊下載回傳 404，並核對官網的 email 入口。
## Local development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm build
```

靜態網站輸出位於 `dist`，可由 GitHub Pages workflow 發布。

## Publishing

1. 在 GitHub 建立公開的 `ninote-site` repository。
2. 將此目錄推送至 repository 的 `main` branch。
3. 在 repository 的 **Settings → Pages → Build and deployment** 選擇 **GitHub Actions**。
4. `main` 更新後，`.github/workflows/deploy-pages.yml` 會自動建置並發布網站。

正式產品能力與限制仍以內部 NiNote repository 的 canonical Intugrove 產品介紹文件為準；公開網站應在重要產品變更時同步審查。
