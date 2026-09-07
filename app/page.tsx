import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowRight, Blocks, CalendarDays, Check, Code2, Command, Eye,
  FileInput, FileText, FolderTree, GitBranch, Languages, Layers3, Link2,
  ListChecks, ListTree, Moon, Network, Palette, PanelTopOpen, PenLine, Search,
  Sparkles, Sun, Tags, Workflow,
} from 'lucide-react';

type Theme = 'light' | 'dark';

const pillars = [
  { icon: FileText, eyebrow: 'Keep', title: 'Markdown 就是主資料', description: '每一頁都是你能直接管理的 Markdown 檔案。檔案總管、Git、備份工具與其他編輯器，仍然可以一起工作。' },
  { icon: Link2, eyebrow: 'Connect', title: '把內容連成脈絡', description: '用 Page Links、Alias 與 Linked References 找回來源與關係，讓零散材料逐漸形成可追蹤的知識網路。' },
  { icon: Layers3, eyebrow: 'See', title: '換一個 View，看見缺口', description: '同一份內容能切換成大綱、MarkMap、Matrix 與 Graph；View 可以重建，不會取代原始檔案。' },
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

const views = [
  { icon: GitBranch, title: 'MarkMap', description: '把目前 Page 展開成可導覽的即時心智圖，也能隱藏分支進行主動回想，再逐層揭露比對。', accent: 'cyan' },
  { icon: Blocks, title: 'Matrix', description: '對齊同層分支，辨認共同、部分、獨有、重複與尚未填補的內容。', accent: 'violet' },
  { icon: Network, title: 'Page & Workspace Graph', description: '從目前 Page 觀察正反向連結，或用可分群的 3D 網路探索整個 Workspace。', accent: 'blue' },
  { icon: CalendarDays, title: 'Task Calendar', description: '用唯讀月份 View 看見任務的開始、可執行、截止與提醒，再安全回到來源。', accent: 'amber' },
];

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><span>N</span></span>;
}

function ThemeSwitch({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  return (
    <div className="theme-switch" role="group" aria-label="網站色彩主題">
      <button type="button" className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')} aria-pressed={theme === 'light'} aria-label="切換為淺色主題"><Sun size={15} /><span>淺色</span></button>
      <button type="button" className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'} aria-label="切換為深色主題"><Moon size={15} /><span>深色</span></button>
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="NiNote 產品介面概念預覽">
      <div className="window-bar">
        <div className="window-brand"><BrandMark /><span>NiNote</span></div>
        <div className="window-tabs" aria-hidden="true"><span>Editor</span><span>Links</span><span>View</span></div>
        <div className="window-controls" aria-hidden="true"><i /><i /><i /></div>
      </div>
      <div className="workspace-shell">
        <aside className="folder-pane" aria-label="工作目錄示意">
          <div className="pane-label"><span>Workspace</span><Search size={13} /></div>
          <div className="tree-item tree-folder"><FolderTree size={14} /><span>Knowledge Base</span></div>
          <div className="tree-children">
            <div className="tree-item"><FileText size={13} /><span>研究方法.md</span></div>
            <div className="tree-item selected"><FileText size={13} /><span>知識如何形成.md</span></div>
            <div className="tree-item"><FileText size={13} /><span>寫作系統.md</span></div>
          </div>
          <div className="pane-label secondary-label">Views</div>
          <div className="tree-item muted"><Network size={13} /><span>Workspace Graph</span></div>
          <div className="tree-item muted"><ListChecks size={13} /><span>Task Center</span></div>
        </aside>
        <article className="editor-pane">
          <div className="editor-path">pages / 知識如何形成.md</div>
          <div className="editor-title-row"><h2>知識如何形成</h2><span className="mode-pill">NiMode</span></div>
          <div className="note-tree">
            <div className="note-line"><span className="bullet" /><strong>理解不只是收藏更多資料</strong></div>
            <div className="note-line level-1"><span className="branch" /><span className="bullet" /><span>重新找到 <mark>來源脈絡</mark></span></div>
            <div className="note-line level-1"><span className="branch" /><span className="bullet" /><span>比較不同案例的結構</span></div>
            <div className="note-line level-2"><span className="branch" /><span className="bullet" /><span>連結到 <a href="#views">[[研究方法]]</a></span></div>
            <div className="note-line level-1"><span className="branch" /><span className="bullet" /><span>看見目前尚未說清楚的缺口</span></div>
          </div>
          <div className="editor-status"><span>5 blocks</span><span className="saved-dot" /><span>已儲存至本機 Markdown</span></div>
        </article>
        <aside className="insight-pane" aria-label="關聯檢視示意">
          <div className="pane-label">Page Graph</div>
          <div className="mini-graph" aria-hidden="true">
            <span className="graph-line line-a" /><span className="graph-line line-b" /><span className="graph-line line-c" />
            <span className="graph-node node-center">知識</span><span className="graph-node node-a">研究</span><span className="graph-node node-b">寫作</span><span className="graph-node node-c">問題</span>
          </div>
          <div className="reference-card"><span className="reference-label">Linked reference</span><strong>研究方法</strong><p>比較不是為了分類，而是暴露還沒被回答的問題。</p></div>
        </aside>
      </div>
    </div>
  );
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('ninote-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#080b10' : '#f5f7f8');
  }, [theme]);

  return (
    <main>
      <a className="skip-link" href="#content">跳至主要內容</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="NiNote 首頁"><BrandMark /><span className="brand-name">NiNote</span><span className="brand-caption">字字珠璣</span></a>
        <nav aria-label="主要導覽"><a href="#why">理念</a><a href="#capabilities">功能</a><a href="#views">Views</a><a href="./guide/">使用說明</a><a href="./demo/">互動展示</a></nav>
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </header>

      <section className="hero" id="top">
        <div className="ambient-grid" aria-hidden="true" />
        <div className="hero-copy" id="content">
          <div className="status-chip"><span /> Windows Desktop-first · Early access</div>
          <h1>讓 Markdown 不只被保存，<span>還能看見結構。</span></h1>
          <p className="hero-lead">NiNote 是一套以本機 Markdown 為主資料、能與外部程式協作的知識工作工具。從大綱、連結、模板到多種視覺 View，重新組織資訊，也看見尚未被說清楚的地方。</p>
          <div className="hero-actions"><a className="primary-action" href="#why">認識 NiNote <ArrowDown size={17} /></a><a className="text-action" href="./guide/">閱讀使用說明 <ArrowRight size={16} /></a><a className="text-action" href="./demo/">開啟互動展示 <ArrowRight size={16} /></a></div>
          <dl className="hero-facts"><div><dt>主資料</dt><dd>本機 Markdown</dd></div><div><dt>平台</dt><dd>Windows Desktop</dd></div><div><dt>設計原則</dt><dd>View 可重建</dd></div></dl>
        </div>
        <div className="hero-visual"><div className="preview-orbit orbit-one" /><div className="preview-orbit orbit-two" /><ProductPreview /><div className="preview-note"><Sparkles size={15} /><span>同一份內容，不同理解角度</span></div></div>
      </section>

      <section className="section-shell" id="why">
        <div className="section-kicker">Why NiNote</div>
        <div className="split-heading"><h2>資料變多，理解不會自然變深。</h2><div className="section-copy"><p>真正困難的是重新找到脈絡、辨認概念之間的關係、比較不同案例，並知道目前還缺少什麼。</p><p>NiNote 不替你產生真理。它保留內容的來源與結構，讓你能檢查、重組、質疑，再形成自己的理解。</p></div></div>
        <div className="pillar-grid">{pillars.map((pillar) => { const Icon = pillar.icon; return <article className="pillar-card" key={pillar.title}><div className="pillar-topline"><span>{pillar.eyebrow}</span><Icon size={19} /></div><h3>{pillar.title}</h3><p>{pillar.description}</p></article>; })}</div>
      </section>

      <section className="section-shell" id="editor">
        <div className="section-kicker">Three modes, one source</div>
        <div className="split-heading"><h2>三種編輯方式，一份 Markdown。</h2><p className="section-copy">從自然書寫、階層整理到原始碼控制，切換模式不會建立內容副本。Undo／Redo、中文輸入、選取、搜尋取代與自動儲存，都圍繞同一份來源工作。</p></div>
        <div className="mode-grid">{editorModes.map((mode, index) => { const Icon = mode.icon; return <article className="mode-card" key={mode.title}><div className="mode-number">0{index + 1}</div><div className="mode-icon"><Icon size={20} /></div><span className="mode-label">{mode.label}</span><h3>{mode.title}</h3><p>{mode.description}</p></article>; })}</div>
        <div className="editor-support"><span><PenLine size={16} /> 中文 IME 與自然編輯</span><span><Search size={16} /> 搜尋與取代</span><span><Tags size={16} /> 可攜的語意 Lens</span><span><Palette size={16} /> 本機 Markdown 樣式</span></div>
      </section>

      <section className="section-shell" aria-labelledby="workflow-title">
        <div className="split-heading"><div><div className="section-kicker">A knowledge workflow</div><h2 id="workflow-title">從記下一句話，到看見一組關係。</h2></div><p className="section-copy">不需要把資料搬進另一套封閉格式。NiNote 在原本的 Markdown 上加入可攜結構，再投影成適合當下問題的 View。</p></div>
        <ol className="workflow-track"><li><span>01</span><strong>Capture</strong><p>在本機 Markdown 自然書寫</p></li><li><span>02</span><strong>Connect</strong><p>用 Page Link 留下脈絡</p></li><li><span>03</span><strong>Reframe</strong><p>切換大綱、矩陣與圖譜</p></li><li><span>04</span><strong>Discover</strong><p>辨認共同點、差異與缺口</p></li></ol>
      </section>

      <section className="section-shell" id="capabilities">
        <div className="section-kicker">Built for real knowledge work</div>
        <div className="split-heading"><h2>從內容管理，到可以行動的工作脈絡。</h2><p className="section-copy">NiNote 把編輯、連結、模板、任務與外部檔案協作放在同一個本機 Workspace。每項能力都能回到可檢查的 Markdown 來源。</p></div>
        <div className="capability-grid">{capabilityGroups.map((group) => { const Icon = group.icon; return <article className="capability-card" key={group.title}><div className="capability-heading"><span className="capability-icon"><Icon size={19} /></span><span>{group.label}</span></div><h3>{group.title}</h3><p>{group.description}</p><ul>{group.points.map((point) => <li key={point}><Check size={14} />{point}</li>)}</ul></article>; })}</div>
      </section>

      <section className="section-shell" id="views">
        <div className="split-heading"><div><div className="section-kicker">Multiple views, one source</div><h2>內容只有一份，觀看方式不只一種。</h2></div><p className="section-copy">NiNote 的 View 都從 Markdown 與既有關係重建。你不需要同步維護第二份資料，也不會被漂亮的圖取代原始內容。</p></div>
        <div className="views-grid">{views.map((view, index) => { const Icon = view.icon; return <article className={`view-card view-${view.accent} ${index === 0 ? 'view-featured' : ''}`} key={view.title}><div className="view-icon"><Icon size={21} /></div><div><h3>{view.title}</h3><p>{view.description}</p></div>{index === 0 && <div className="outline-visual" aria-hidden="true"><span className="outline-row width-90" /><span className="outline-row indent-1 width-72" /><span className="outline-row indent-2 width-58" /><span className="outline-row indent-1 width-82" /></div>}</article>; })}</div>
      </section>

      <section className="section-shell" aria-labelledby="principles-title">
        <div className="principles-panel"><div><div className="section-kicker">Local by design</div><h2 id="principles-title">你的檔案，仍然是你的檔案。</h2><p>一個 Page 對應一個 Markdown 檔案。必要角色保留在文字中，Workspace 索引、搜尋結果、Graph 與 Task Center 則是可重新建立的投影。</p></div><div className="principle-list"><div><FolderTree size={19} /><span><strong>一般檔案結構</strong>可由檔案總管、Git、備份與其他 Markdown 工具管理。</span></div><div><PanelTopOpen size={19} /><span><strong>多 Editor Window</strong>共享文件 revision、Undo／Redo 與 autosave。</span></div><div><Languages size={19} /><span><strong>可讀的 metadata</strong>保留 Block、Template、Lens 與 Task 的必要語意。</span></div><div><Command size={19} /><span><strong>不靠專有匯出</strong>資料仍能在 NiNote 之外被閱讀、編輯與版本控制。</span></div></div></div>
      </section>

      <section className="scope-section section-shell" id="scope">
        <div className="scope-card"><div className="scope-status"><span /> 目前產品範圍</div><h2>先為個人的 Windows 知識工作，把核心做好。</h2><p>NiNote 目前是 Windows Desktop-first、以個人本機 Workspace 為主的早期產品。它已具備 Markdown 編輯、連結、搜尋、Template、Task 與多種 View 基礎，但仍在外部使用者驗證階段。</p><div className="scope-details"><div><strong>現在聚焦</strong><span>個人知識工作、本機檔案自主、結構化理解</span></div><div><strong>尚未承諾</strong><span>完整跨平台、多人協作、雲端同步或 AI 自動推理</span></div><div><strong>行動裝置</strong><span>目前只有有限的 Android companion prototype，不是完整行動版</span></div><div><strong>Calendar</strong><span>目前是 Workspace 的本機唯讀投影，不與外部行事曆同步</span></div></div><div className="scope-footer"><p>NiNote 正在尋找真實工作情境，持續驗證產品方向。</p><span className="coming-soon">Early access details coming soon</span></div></div>
      </section>

      <footer className="site-footer"><div className="footer-brand"><BrandMark /><div><strong>NiNote</strong><span>不只保存知識，而是看見知識中尚未被說清楚的結構。</span></div></div><div className="footer-links"><a href="./guide/">使用說明</a><a href="./demo/">互動展示</a><p>Windows Desktop-first · Product preview</p></div></footer>
    </main>
  );
}
