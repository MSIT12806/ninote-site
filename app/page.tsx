import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowRight, Blocks, CalendarDays, Check, Code2, Command, Eye,
  FileInput, FileText, FolderTree, GitBranch, Languages, Layers3, Link2,
  ListChecks, ListTree, Moon, Network, Palette, PanelTopOpen, PenLine, Search,
  Sparkles, Sun, Tags, Workflow,
} from 'lucide-react';

type Theme = 'light' | 'dark';

const downloadUrl = 'https://github.com/MSIT12806/ninote-site/releases/latest/download/NiNote-win-x64-Setup.exe';
const releasesUrl = 'https://github.com/MSIT12806/ninote-site/releases/latest';
const feedbackUrl = 'https://github.com/MSIT12806/ninote-site/issues/new';
const publicBase = import.meta.env.BASE_URL;
const productMediaBase = `${publicBase}product-media`;

const storySteps = [
  { icon: FileText, number: '01', title: '扎根於 Markdown', description: '每一頁都是你能直接管理的 Markdown 檔案。資料留在熟悉的資料夾裡，也能交給 Git、備份工具與其他編輯器。' },
  { icon: Link2, number: '02', title: '建立連結', description: '用 Page Links、Alias 與 Linked References 留下來源與脈絡，讓零散材料逐漸長成可追蹤的知識網路。' },
  { icon: Layers3, number: '03', title: '切換視角', description: '同一份內容可轉換成大綱、MarkMap、Matrix、Graph 與 Calendar，不需要維護第二份資料。' },
  { icon: Search, number: '04', title: '看見缺口', description: '重新比較共同、差異、空白與未連結之處。Intugrove 不替你下結論，而是讓問題變得更清楚。' },
];

const editorModes = [
  { icon: ListTree, label: 'Structure', title: 'NiMode', description: '以 Block 階層為中心，適合大綱、縮排、摺疊、Task 與結構操作。' },
  { icon: Eye, label: 'Flow', title: 'Rendered Mode', description: '保留 Markdown 語意，也提供接近成品閱讀效果的自然編輯體驗。' },
  { icon: Code2, label: 'Control', title: 'Source Mode', description: '直接查看與修改 Markdown 原始碼，保有完整、精確的文字控制權。' },
];

const capabilityGroups = [
  { icon: FolderTree, label: 'Organize', title: '找到、整理、回到每天的工作', description: '用 Folder Tree 管理檔案，以閱讀時真正看見的文字做 Workspace 全文搜尋；Daily Journal、最近編輯與尚未收錄頁面，讓內容容易再次被找到。', points: ['資料夾、檔名與 Alias 搜尋', 'Page 內搜尋與取代', '命令面板與快捷鍵揭露'] },
  { icon: Link2, label: 'Connect', title: '留下關係，也保留來源脈絡', description: 'Page Link、Heading Link、Alias、Linked References 與 Unlinked Mentions，一起把文字中的暗示變成可追蹤的連結。', points: ['連結預覽與導覽', '安全的 Page／Heading 重新命名', '把 Block 子樹抽成獨立 Page'] },
  { icon: Workflow, label: 'Structure', title: '讓模板成為可追蹤的知識結構', description: 'Template 與 Slot role 保留在可讀 Markdown 中。你可以套用、抽取、補齊缺少的 Slot，再從 references 回到每個實例。', points: ['Template 與 Slot references', '不覆寫既有內容', '定義、角色、實例與查詢互相連結'] },
  { icon: ListChecks, label: 'Act', title: '從筆記脈絡整理下一步', description: 'Task Center 跨檔案彙整六種任務狀態，保留父 Block 與來源 Page；日期屬性、Project 與 Windows 提醒仍以 Markdown 為意圖來源。', points: ['跨 Page 搜尋與複合篩選', '開始、可執行與截止時間', '多筆提醒與 Task Calendar'] },
  { icon: Palette, label: 'Personalize', title: '閱讀方式可以是你的', description: '介面可跟隨 Windows 或固定淺色、深色；本機 CSS 可成為 Markdown 樣式，調整 NiMode 與 Rendered Mode 的閱讀節奏。', points: ['所有 Editor Window 同步', '樣式不寫入 Workspace', '無效方案安全回到預設'] },
  { icon: FileInput, label: 'Interop', title: '讓知識自然進出其他工具', description: '圖片與一般檔案可收入 Workspace assets，Page 也能以實際 Markdown 檔案拖往其他 Windows 程式，不需要專有匯出格式。', points: ['相對 Markdown 連結', '可搭配 Git 與備份工具', '處理外部修改與衝突'] },
];

const viewStories = [
  { icon: GitBranch, image: 'guide-markmap.png', title: 'MarkMap', description: '把目前 Page 展開成可導覽的即時心智圖，也能隱藏分支進行主動回想。', alt: 'Intugrove MarkMap 真實產品畫面，呈現目前 Page 的心智圖與主動回想控制。' },
  { icon: Blocks, image: 'guide-matrix.png', title: 'Matrix', description: '對齊同層分支，辨認共同、部分、獨有、重複與尚未填補的內容。', alt: 'Intugrove Matrix 真實產品畫面，呈現比較面向、欄位與缺口分類。' },
  { icon: Network, image: 'guide-workspace-graph.png', title: 'Workspace Graph', description: '用可分群的 3D 網路探索整個 Workspace，同時保留回到 Markdown 的路徑。', alt: 'Intugrove Workspace Graph 真實產品畫面，呈現 Page 關係網路與篩選控制。' },
  { icon: CalendarDays, image: 'guide-task-calendar.png', title: 'Task Calendar', description: '用唯讀月份 View 看見任務的開始、可執行、截止與提醒，再安全回到來源。', alt: 'Intugrove Task Calendar 真實產品畫面，呈現月份格線與任務時間。' },
];

function BrandLogo({ decorative = false }: { decorative?: boolean }) {
  return <img className="brand-logo" src={`${publicBase}intugrove-logo.png`} alt={decorative ? '' : 'Intugrove'} aria-hidden={decorative || undefined} />;
}

function ThemeSwitch({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  return (
    <div className="theme-switch" role="group" aria-label="網站色彩主題">
      <button type="button" className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')} aria-pressed={theme === 'light'} aria-label="切換為淺色主題"><Sun size={15} /><span>淺色</span></button>
      <button type="button" className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'} aria-label="切換為深色主題"><Moon size={15} /><span>深色</span></button>
    </div>
  );
}

function ProductMedia() {
  return (
    <picture className="product-media-frame">
      <source media="(prefers-reduced-motion: no-preference)" srcSet={`${productMediaBase}/workspace-modes.gif`} type="image/gif" />
      <img src={`${productMediaBase}/workspace-nimode.png`} width="1280" height="800" alt="真實 Intugrove Windows Desktop 畫面：左側是 Workspace Folder Tree，中間以 NiMode 編輯知識工作 Page，並顯示 Linked references。" loading="eager" fetchPriority="high" />
    </picture>
  );
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('ninote-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e1713' : '#f7f3e9');
  }, [theme]);

  return (
    <main>
      <a className="skip-link" href="#content">跳至主要內容</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Intugrove 首頁"><BrandLogo decorative /><span className="brand-name">Intugrove</span><span className="brand-caption">讓想法彼此扎根</span></a>
        <nav aria-label="主要導覽"><a href="#story">理念</a><a href="#capabilities">功能</a><a href="#views">Views</a><a href="#download">下載</a><a href="./guide/">使用說明</a><a href="./demo/">產品畫面</a></nav>
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </header>

      <section className="hero" id="top">
        <div className="root-lines" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-copy" id="content">
          <div className="brand-intro"><BrandLogo /><div><span>Intuition, grounded.</span><strong>Intugrove</strong></div></div>
          <div className="status-chip"><span /> Windows Desktop-first · Early access</div>
          <h1>讓直覺落地，<span>讓知識彼此扎根。</span></h1>
          <p className="hero-lead">Intugrove 以本機 Markdown 為根，讓 Block、連結、模板與不同 View 自然長成一片可追蹤的思維林地。你保有自己的檔案，也能從不同角度看見尚未被說清楚的結構。</p>
          <div className="hero-actions"><a className="primary-action" href={downloadUrl}>下載 Windows 版 <ArrowDown size={17} /></a><a className="text-action" href="#story">走進 Intugrove <ArrowRight size={16} /></a><a className="text-action" href="./guide/">閱讀使用說明 <ArrowRight size={16} /></a></div>
          <dl className="hero-facts"><div><dt>根</dt><dd>本機 Markdown</dd></div><div><dt>林地</dt><dd>Block 與連結</dd></div><div><dt>視野</dt><dd>可重建 Views</dd></div></dl>
        </div>
        <div className="hero-visual"><div className="leaf-halo" aria-hidden="true" /><ProductMedia /><div className="preview-note"><Sparkles size={15} /><span>正式 Desktop 錄製 · NiMode → Rendered → Source</span></div></div>
      </section>

      <section className="section-shell story-section" id="story">
        <div className="section-kicker">How knowledge grows</div>
        <div className="split-heading"><h2>知識不是堆疊，<br />而是一段逐漸長出脈絡的旅程。</h2><div className="section-copy"><p>資料變多，不代表理解自然變深。真正困難的是重新找到脈絡、比較不同案例，並辨認目前還缺少什麼。</p><p>Intugrove 不替你產生真理。它保留來源與結構，讓你檢查、重組、質疑，再形成自己的理解。</p></div></div>
        <ol className="story-grid">{storySteps.map((step) => { const Icon = step.icon; return <li key={step.title}><div className="story-number">{step.number}</div><div className="story-icon"><Icon size={20} /></div><h3>{step.title}</h3><p>{step.description}</p></li>; })}</ol>
      </section>

      <section className="section-shell" id="editor">
        <div className="section-kicker">Three modes, one source</div>
        <div className="split-heading"><h2>三種編輯方式，<br />仍是同一份 Markdown。</h2><p className="section-copy">從自然書寫、階層整理到原始碼控制，切換模式不會建立內容副本。Undo／Redo、中文輸入、選取、搜尋取代與自動儲存，都圍繞同一份來源工作。</p></div>
        <div className="mode-grid">{editorModes.map((mode, index) => { const Icon = mode.icon; return <article className="mode-card" key={mode.title}><div className="mode-number">0{index + 1}</div><div className="mode-icon"><Icon size={20} /></div><span className="mode-label">{mode.label}</span><h3>{mode.title}</h3><p>{mode.description}</p></article>; })}</div>
        <div className="editor-support"><span><PenLine size={16} /> 中文 IME 與自然編輯</span><span><Search size={16} /> 搜尋與取代</span><span><Tags size={16} /> 可攜的語意 Lens</span><span><Palette size={16} /> 本機 Markdown 樣式</span></div>
      </section>

      <section className="section-shell" id="views">
        <div className="split-heading"><div><div className="section-kicker">Different clearings, one grove</div><h2>內容只有一份，<br />觀看方式不只一種。</h2></div><p className="section-copy">每一個 View 都從 Markdown 與既有關係重建。以下皆為 Intugrove 正式 Windows Desktop 的實際產品畫面，不是網站仿製介面。</p></div>
        <div className="view-gallery">{viewStories.map((view) => { const Icon = view.icon; return <article className="view-story" key={view.title}><a href={`${productMediaBase}/${view.image}`} aria-label={`開啟 ${view.title} 原始產品畫面`}><img src={`${productMediaBase}/${view.image}`} width="1280" height="800" alt={view.alt} loading="lazy" /></a><div className="view-story-copy"><span className="view-icon"><Icon size={20} /></span><div><h3>{view.title}</h3><p>{view.description}</p></div></div></article>; })}</div>
      </section>

      <section className="section-shell" id="capabilities">
        <div className="section-kicker">Built for real knowledge work</div>
        <div className="split-heading"><h2>從內容管理，<br />到可以行動的工作脈絡。</h2><p className="section-copy">Intugrove 把編輯、連結、模板、任務與外部檔案協作放在同一個本機 Workspace。每項能力都能回到可檢查的 Markdown 來源。</p></div>
        <div className="capability-grid">{capabilityGroups.map((group) => { const Icon = group.icon; return <article className="capability-card" key={group.title}><div className="capability-heading"><span className="capability-icon"><Icon size={19} /></span><span>{group.label}</span></div><h3>{group.title}</h3><p>{group.description}</p><ul>{group.points.map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul></article>; })}</div>
      </section>

      <section className="section-shell" aria-labelledby="principles-title">
        <div className="principles-panel"><div><div className="section-kicker">Local by design</div><h2 id="principles-title">你的檔案，仍然是你的檔案。</h2><p>一個 Page 對應一個 Markdown 檔案。必要角色保留在文字中，Workspace 索引、搜尋結果、Graph 與 Task Center 則是可重新建立的投影。</p></div><div className="principle-list"><div><FolderTree size={19} /><span><strong>一般檔案結構</strong>可由檔案總管、Git、備份與其他 Markdown 工具管理。</span></div><div><PanelTopOpen size={19} /><span><strong>多 Editor Window</strong>共享文件 revision、Undo／Redo 與 autosave。</span></div><div><Languages size={19} /><span><strong>可讀的 metadata</strong>保留 Block、Template、Lens 與 Task 的必要語意。</span></div><div><Command size={19} /><span><strong>不靠專有匯出</strong>資料仍能在 Intugrove 之外被閱讀、編輯與版本控制。</span></div></div></div>
      </section>

      <section className="download-section section-shell" id="download" aria-labelledby="download-title">
        <div className="download-panel">
          <div className="download-copy"><div className="section-kicker">Windows Early Access</div><h2 id="download-title">下載 Intugrove，<br />讓想法從自己的 Markdown 長出脈絡。</h2><p>目前提供 Windows x64 測試版，適用於 Windows 10 1809 以上。安裝於目前的 Windows 使用者，不需要系統管理員權限。</p><div className="download-actions"><a className="primary-action" href={downloadUrl}>下載安裝程式 <ArrowDown size={17} /></a><a className="text-action" href={releasesUrl}>版本說明與檔案校驗碼 <ArrowRight size={16} /></a><a className="text-action" href={feedbackUrl}>回報試用問題 <ArrowRight size={16} /></a></div></div>
          <div className="download-notes"><div><strong>更新方式</strong><span>Intugrove 啟動後會安靜檢查新版本；有更新時先通知你，只有確認後才會下載、保存筆記並重新啟動。</span></div><div><strong>資料位置</strong><span>你的 Workspace 仍是一般 Markdown 檔案。更新安裝程式不會搬動或取代這些筆記。</span></div><div className="download-warning"><strong>測試版提醒</strong><span>目前安裝程式尚未加上數位簽章，Windows SmartScreen 可能顯示警告。請只從本頁或 GitHub Releases 下載，並可先核對 SHA-256。</span></div></div>
        </div>
      </section>

      <section className="scope-section section-shell" id="scope">
        <div className="scope-card"><div className="scope-status"><span /> 目前產品範圍</div><h2>先為個人的 Windows 知識工作，把核心做好。</h2><p>Intugrove 目前是 Windows Desktop-first、以個人本機 Workspace 為主的早期產品。它已具備 Markdown 編輯、連結、搜尋、Template、Task 與多種 View 基礎，但仍在外部使用者驗證階段。</p><div className="scope-details"><div><strong>現在聚焦</strong><span>個人知識工作、本機檔案自主、結構化理解</span></div><div><strong>尚未承諾</strong><span>完整跨平台、多人協作、雲端同步或 AI 自動推理</span></div><div><strong>行動裝置</strong><span>目前只有有限的 Android companion prototype，不是完整行動版</span></div><div><strong>Calendar</strong><span>目前是 Workspace 的本機唯讀投影，不與外部行事曆同步</span></div></div><div className="scope-footer"><p>Intugrove 正在尋找真實工作情境，持續驗證產品方向。</p><a className="coming-soon" href="#download">Windows Early Access 可下載</a></div></div>
      </section>

      <footer className="site-footer"><div className="footer-brand"><BrandLogo decorative /><div><strong>Intugrove</strong><span>讓直覺落地，讓知識彼此扎根。</span></div></div><div className="footer-links"><a href="./guide/">使用說明</a><a href="./demo/">產品畫面</a><p>Windows Desktop-first · Real product capture</p></div></footer>
    </main>
  );
}
