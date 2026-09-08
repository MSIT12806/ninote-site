import { useEffect, useState } from 'react';
import { ArrowRight, Check, Film, Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const publicBase = import.meta.env.BASE_URL;
const productMediaBase = `${publicBase}product-media`;

const modes = [
  {
    id: 'nimode',
    title: 'NiMode',
    label: 'Structure',
    description: '以 Block 階層直接整理研究脈絡、Page Links 與 Task。畫面同時保留 Folder Tree 與 Linked references。',
    image: 'workspace-nimode.png',
    alt: 'Intugrove NiMode 真實畫面，顯示階層 Block、Page Links、Folder Tree 與 Linked references。',
  },
  {
    id: 'rendered',
    title: 'Rendered Mode',
    label: 'Flow',
    description: '同一份 Markdown 以較接近閱讀結果的方式呈現；資料沒有搬到另一個網站模型。',
    image: 'workspace-rendered.png',
    alt: 'Intugrove Rendered Mode 真實畫面，以渲染後的 Markdown 顯示相同知識工作內容。',
  },
  {
    id: 'source',
    title: 'Source Mode',
    label: 'Control',
    description: '直接檢查原始 Markdown、縮排、Task 與 Page Link 語法，保留精確的文字控制。',
    image: 'workspace-source.png',
    alt: 'Intugrove Source Mode 真實畫面，直接顯示相同內容的 Markdown 原始碼。',
  },
];

function BrandLogo() {
  return <img className="brand-logo" src={`${publicBase}intugrove-logo.png`} alt="" aria-hidden="true" />;
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function ProductAnimation() {
  return (
    <picture className="demo-product-media">
      <source
        media="(prefers-reduced-motion: no-preference)"
        srcSet={`${productMediaBase}/workspace-modes.gif`}
        type="image/gif"
      />
      <img
        src={`${productMediaBase}/workspace-nimode.png`}
        width="1280"
        height="800"
        alt="真實 Intugrove Windows Desktop 畫面，呈現同一份 Markdown 的正式編輯介面；下方另有三種模式的靜態對照。"
        loading="eager"
        fetchPriority="high"
      />
    </picture>
  );
}

export default function DemoPage() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('ninote-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e1713' : '#f7f3e9');
  }, [theme]);

  return (
    <div className="demo-page">
      <header className="demo-header">
        <a className="demo-brand" href="../"><BrandLogo /><span>Intugrove</span><i>Product capture</i></a>
        <nav><a href="../">產品介紹</a><a href="../guide/">使用說明</a></nav>
        <div className="theme-switch demo-theme" role="group" aria-label="網站色彩主題">
          <button type="button" className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')} aria-pressed={theme === 'light'} aria-label="切換為淺色主題"><Sun size={15} /><span>淺色</span></button>
          <button type="button" className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'} aria-label="切換為深色主題"><Moon size={15} /><span>深色</span></button>
        </div>
      </header>

      <main className="demo-main">
        <section className="demo-intro">
          <div>
            <span className="demo-kicker">Real Intugrove Desktop</span>
            <h1>這就是現在的 Intugrove。</h1>
            <p>以下畫面由整合測試啟動真正的 Windows Desktop、載入固定 Workspace，再從正式 WebView2 自動錄製。</p>
          </div>
          <aside>
            <strong>不是瀏覽器版，也不是概念稿</strong>
            <span>網站沒有重做另一套編輯器。你看到的是實際產品元件、樣式與操作結果。</span>
          </aside>
        </section>

        <section className="demo-stage" aria-labelledby="capture-heading">
          <div className="demo-stage-heading">
            <div>
              <span className="demo-stage-label"><Film size={15} /> Desktop capture</span>
              <h2 id="capture-heading">同一份 Markdown，三種正式編輯模式。</h2>
            </div>
            <ul aria-label="錄製資訊">
              <li><Check size={14} /> 真實產品路徑</li>
              <li><Check size={14} /> 原始畫面 1280 × 800</li>
              <li><Check size={14} /> 自動循環</li>
            </ul>
          </div>
          <ProductAnimation />
          <p className="demo-motion-note">若系統設定為減少動態，這裡會改用同一次錄製的 NiMode 靜態畫面。</p>
        </section>

        <section className="demo-details" aria-labelledby="mode-details-heading">
          <div className="demo-details-heading">
            <span className="demo-kicker">Captured states</span>
            <h2 id="mode-details-heading">不是三個 demo，是同一個 Page 的三種觀看方式。</h2>
          </div>
          <div className="demo-mode-grid">
            {modes.map((mode, index) => (
              <article className="demo-mode-card" key={mode.id}>
                <div className="demo-mode-copy">
                  <span>{String(index + 1).padStart(2, '0')} · {mode.label}</span>
                  <h3>{mode.title}</h3>
                  <p>{mode.description}</p>
                </div>
                <img
                  src={`${productMediaBase}/${mode.image}`}
                  width="1280"
                  height="800"
                  alt={mode.alt}
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </section>

        <section className="demo-source-note">
          <div>
            <strong>畫面可以隨產品重錄</strong>
            <span>固定測試資料、尺寸與模式切換讓網站素材能追溯到 Intugrove 版本，不必再靠手工仿製追趕產品。</span>
          </div>
          <a href={`${productMediaBase}/product-media-manifest.json`}>查看錄製資訊</a>
        </section>

        <section className="demo-next"><span>想了解各項功能的完整範圍？</span><a href="../guide/">前往使用說明 <ArrowRight size={16} /></a></section>
      </main>
    </div>
  );
}
