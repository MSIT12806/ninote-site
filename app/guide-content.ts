export type DocBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: string[] }
  | { type: 'code'; language: string; code: string }
  | { type: 'note'; tone?: 'info' | 'warning'; title: string; text: string };

export type DocSection = {
  id: string;
  title: string;
  blocks: DocBlock[];
};

export type DocPage = {
  id: string;
  category: string;
  title: string;
  description: string;
  keywords: string[];
  sections: DocSection[];
};

export const categories = [
  { title: '開始使用', pages: ['overview', 'workspace'] },
  { title: '書寫與編輯', pages: ['editor-modes', 'blocks', 'appearance'] },
  { title: '連結與知識結構', pages: ['page-links', 'templates', 'lens'] },
  { title: '檢視與發現', pages: ['markmap', 'matrix', 'graphs'] },
  { title: '搜尋與日常工作', pages: ['search-navigation', 'journal'] },
  { title: '任務與時間', pages: ['tasks', 'task-time'] },
  { title: '檔案與產品邊界', pages: ['files', 'scope'] },
];

export const docs: DocPage[] = [
  {
    id: 'overview', category: '開始使用', title: '認識 NiNote',
    description: '先理解 NiNote 的資料模型、適用情境，以及每一種 View 和 Markdown 來源的關係。',
    keywords: ['Markdown', 'Windows', 'local', '本機', 'View'],
    sections: [
      { id: 'what-is-ninote', title: 'NiNote 是什麼', blocks: [
        { type: 'paragraph', text: 'NiNote 是一套 Windows Desktop-first 的知識工作工具。它以本機 Markdown 資料夾為核心，讓你在 Block 編輯、Page Links、Template、Task 與多種視覺 View 之間重新組織資訊。' },
        { type: 'note', title: '一句話原則', text: '內容只有一份：Markdown 是主資料，搜尋、Graph、Matrix、Task Center 等都是可以重新建立的投影。' },
      ] },
      { id: 'three-layers', title: '用三個層次理解產品', blocks: [
        { type: 'list', items: ['檔案層：一個 Page 對應一個 Markdown 檔案，Working Folder 就是你的資料範圍。', '結構層：Page、Block、Link、Template、Slot、Lens 與 Task 提供可攜的語意。', '檢視層：Outline、MarkMap、Matrix、Graph、Search 與 Task Center 從來源重建。'] },
      ] },
      { id: 'who-is-it-for', title: '適合哪些工作', blocks: [
        { type: 'paragraph', text: '適合用 Markdown 整理研究、課程、文章、產品決策與專案脈絡，並重視檔案自主、備份與版本控制的人。NiNote 不會替你判定內容真偽，而是幫你保留來源、比較結構並看見缺口。' },
      ] },
    ],
  },
  {
    id: 'workspace', category: '開始使用', title: '建立第一個 Workspace',
    description: '從選擇本機資料夾開始，理解一般 Working Folder 與 Initialized Workspace 的差別。',
    keywords: ['Workspace', 'Working Folder', '初始化', '資料夾', 'autosave'],
    sections: [
      { id: 'choose-folder', title: '選擇工作目錄', blocks: [
        { type: 'steps', items: ['開啟 NiNote，選擇一個本機資料夾，或先開啟其中一個 Markdown 檔案。', '從左側「檔案」檢視開啟既有 .md，或在選定資料夾中建立新檔。', '開始輸入；停止輸入約 500 ms 後，NiNote 會自動儲存。'] },
        { type: 'note', title: '不需要手動 Save', text: '一般內容由 autosave 與離開頁面前的安全寫回負責。File 選單提供的是「另存新檔」，不是手動儲存命令。' },
      ] },
      { id: 'initialize', title: '何時需要初始化', blocks: [
        { type: 'paragraph', text: '未初始化的 Working Folder 已能編輯一般 Markdown、建立檔案、使用三種編輯模式、Mermaid 與 MarkMap。當你要使用 Page Link 搜尋、Alias、Backlinks、首頁收錄、Daily Journal、Graph 與衍生索引時，再明確執行 Workspace 初始化。' },
        { type: 'note', tone: 'warning', title: '初始化不會搬動既有筆記', text: '初始化只啟用 Workspace 能力並建立必要 metadata；它不應修改既有 Markdown。' },
      ] },
      { id: 'default-workspace', title: '預設 Workspace', blocks: [
        { type: 'paragraph', text: '成功初始化或開啟 Initialized Workspace 後，NiNote 會記住它。下次啟動時會恢復該資料夾，並開啟或建立當日 Daily Journal。' },
      ] },
    ],
  },
  {
    id: 'editor-modes', category: '書寫與編輯', title: '三種編輯模式',
    description: '在 NiMode、Rendered Mode 與 Source Mode 之間切換，同時維持一份 Markdown 來源。',
    keywords: ['NiMode', 'Rendered', 'Source', 'editor', '編輯器'],
    sections: [
      { id: 'mode-comparison', title: '選擇適合當下工作的模式', blocks: [
        { type: 'list', items: ['NiMode：以 Block 階層為中心，適合大綱、縮排、摺疊、Task 與結構操作。', 'Rendered Mode：保留 Markdown 語意，提供接近成品閱讀效果的自然編輯。', 'Source Mode：直接查看並修改 Markdown 原始文字，適合精確控制與檢查 metadata。'] },
      ] },
      { id: 'shared-source', title: '模式切換不建立副本', blocks: [
        { type: 'paragraph', text: '三種模式共用同一份文件。切換模式不應改變 Markdown、建立額外 Undo 紀錄，或丟失游標與選取狀態。' },
      ] },
      { id: 'editing-basics', title: '共同編輯能力', blocks: [
        { type: 'list', items: ['Undo／Redo、中文 IME、文字選取與剪貼。', 'Page 內搜尋與取代。', '打字機模式與常用 Markdown 格式。', '多 Editor Window 開啟同一 Page 時，共享文件 revision、Undo／Redo 與 autosave。'] },
      ] },
    ],
  },
  {
    id: 'blocks', category: '書寫與編輯', title: '使用 NiMode Block',
    description: '以可攜的 Markdown 清單操作 Block 階層、摺疊、順序與同 Block 換行。',
    keywords: ['Block', 'NiMode', '縮排', '摺疊', 'Shift Enter'],
    sections: [
      { id: 'block-basics', title: 'Block 與階層', blocks: [
        { type: 'paragraph', text: 'NiMode 的基本單位是 Block，新 Block 預設保存成無序 Markdown 清單。Tab／Shift+Tab 調整層級，拖曳 Block lead 會連同完整子樹重新排列。' },
        { type: 'code', language: 'markdown', code: '- 研究問題\n  - 已知證據\n  - 尚待驗證\n    - 訪談使用者' },
      ] },
      { id: 'line-break', title: '同一個 Block 內換行', blocks: [
        { type: 'paragraph', text: '按 Shift+Enter 可以在同一 Block 中換行，不會建立新的 child 或 sibling。重新開啟或切換模式後，仍維持同一個 Block identity。' },
      ] },
      { id: 'ordered-and-fold', title: '順序與摺疊', blocks: [
        { type: 'paragraph', text: '順序功能可以和 Task、Template、Slot、縮排及摺疊一起使用。磁碟保留可攜的 Markdown marker，畫面上的 1／2／3 依同層順序即時計算，不把顯示序號寫回來源。' },
      ] },
    ],
  },
  {
    id: 'appearance', category: '書寫與編輯', title: '主題與 Markdown 樣式',
    description: '調整應用程式的深淺色介面，以及 NiMode／Rendered Mode 的文件閱讀樣式。',
    keywords: ['theme', 'dark', 'light', 'CSS', '樣式'],
    sections: [
      { id: 'app-theme', title: '介面主題', blocks: [
        { type: 'paragraph', text: '從 View 選單選擇「跟隨 Windows」、「淺色」或「深色」。主題會同步到所有 NiNote 視窗並保留到下次啟動；它只改變呈現，不修改 Workspace 或 Markdown。' },
      ] },
      { id: 'markdown-style', title: '匯入本機 CSS 樣式', blocks: [
        { type: 'paragraph', text: '你可以把本機 .css 匯入為 Markdown 樣式方案，調整 NiMode 與 Rendered Mode 的字體、間距與標題層次。選擇會同步到各 Editor Window。' },
        { type: 'note', tone: 'warning', title: '樣式有明確邊界', text: '匯入 CSS 只作用於文件表面，不能改寫 Toolbar、Sidebar、Dialog、Source Mode 或其他 View。使用不同 selector 的外部主題需要先針對 NiNote 調整。' },
      ] },
    ],
  },
  {
    id: 'page-links', category: '連結與知識結構', title: 'Page Links、Alias 與 References',
    description: '建立 Page 關係、預覽來源脈絡，並安全處理尚未存在或重新命名的 Page。',
    keywords: ['Page Link', 'Alias', 'Backlink', 'Linked References', 'Unlinked Mentions'],
    sections: [
      { id: 'create-link', title: '建立 Page Link', blocks: [
        { type: 'steps', items: ['在 NiMode 或 Rendered Mode 輸入 [[，或輸入 /link。', '依 Page Name 或 Alias 搜尋，使用方向鍵選擇候選。', '按 Enter 或 Tab 提交。若沒有完全相符名稱，可建立指向目前 namespace 的 unresolved link。'] },
        { type: 'code', language: 'markdown', code: '[心理學](心理學.md)\n[心理學#核心](心理學.md#核心)' },
        { type: 'note', title: '畫面與磁碟格式不同', text: 'NiMode 會把標準 Markdown link 顯示成 [[心理學]]；Source Mode 仍顯示真正保存的 Markdown。' },
      ] },
      { id: 'references', title: '找回引用脈絡', blocks: [
        { type: 'list', items: ['Linked References：顯示哪些 Page 在什麼 Block 脈絡中引用目前 Page。', 'Unlinked Mentions：找出文字已出現、但尚未建立明確 link 的 Page Name 或 Alias。', 'Outgoing Links：列出目前 Page 指向的目標與來源位置。', '同名頁面：用完整 Page Path 區分不同 namespace 中的同名 Page。'] },
      ] },
      { id: 'rename', title: '重新命名與抽取', blocks: [
        { type: 'paragraph', text: '重新命名 Page 或 Heading 時，NiNote 會以明確交易更新可安全辨識的 references。你也可以把逐漸長大的 Block 子樹抽成新 Page，再從原位置保留連結。' },
      ] },
    ],
  },
  {
    id: 'templates', category: '連結與知識結構', title: 'Template 與 Slot',
    description: '把可重用結構留在 Markdown 中，追蹤定義、角色、實例與缺少的 Slot。',
    keywords: ['Template', 'Slot', '模板', 'references'],
    sections: [
      { id: 'create-template', title: '建立與套用 Template', blocks: [
        { type: 'paragraph', text: 'Template 定義保存在 Workspace 的 templates/ 目錄。你可以直接用 NiMode 編輯模板檔，或把既有 Block 子樹抽成 Template 並保留第一個實例。' },
        { type: 'steps', items: ['把游標放在一般 NiMode Block。', '按 Ctrl+J，選擇「套用模板」，或輸入 /template。', '依名稱或 Slot 內容找到模板，按 Enter 套用。'] },
      ] },
      { id: 'reapply', title: '重新套用只補缺少內容', blocks: [
        { type: 'paragraph', text: '在 Template root 使用 Alt+Enter 的 Quick Actions，可以選擇「重新套用模板」。NiNote 只補入缺少的 Slot，不覆寫既有文字、位置或你新增的 Block。' },
      ] },
      { id: 'trace-instances', title: '追蹤實例與 Slot', blocks: [
        { type: 'paragraph', text: '開啟模板定義檔時，Links View 會顯示 Template references，並依定義順序顯示各 Slot references。每筆都保留來源 Page 與完整子樹，可直接導回實例。' },
        { type: 'note', tone: 'warning', title: 'Template 不是自動推理', text: '現有能力建立 definition → role → instance → query 的基礎，但不會自動判定不同實例的類比是否正確。' },
      ] },
    ],
  },
  {
    id: 'lens', category: '連結與知識結構', title: '語意 Lens',
    description: '用可讀的 Block 屬性標記分類，再以穩定顏色協助掃讀。',
    keywords: ['Lens', '分類', '顏色', 'Ctrl J'],
    sections: [
      { id: 'set-lens', title: '設定、變更或移除 Lens', blocks: [
        { type: 'steps', items: ['把游標放在要分類的 NiMode Block。', '按 Ctrl+J，選擇「設定 Lens」或「變更 Lens」。', '輸入名稱或選擇目前筆記已有的 Lens，再按「套用」。', '要取消時，再次開啟「變更 Lens」並選擇「移除 Lens」。'] },
      ] },
      { id: 'lens-source', title: 'Markdown 語法', blocks: [
        { type: 'code', language: 'markdown', code: '- {Lens: "氣候"} 季風影響降雨\n- 1. [todo] {Lens: "產業"} 比較供應鏈' },
        { type: 'paragraph', text: 'Lens 保存的是名稱，不是色碼。同一名稱跨 Page 與重新啟動仍會得到穩定配色；設定、替換與移除都能用 Undo／Redo 復原。' },
      ] },
      { id: 'lens-views', title: '各 View 如何呈現', blocks: [
        { type: 'list', items: ['NiMode 與 MarkMap：隱藏 marker，以文字色與說明列呈現 Lens。', 'Source Mode：顯示完整 {Lens: "..."} 原文。', 'Rendered Mode、Matrix、Task Center：保留 round trip，但第一版不套用 Lens 顏色。'] },
      ] },
    ],
  },
  {
    id: 'markmap', category: '檢視與發現', title: 'MarkMap 與主動回想',
    description: '把目前 Page 轉成即時心智圖，或暫時隱藏分支進行結構回想。',
    keywords: ['MarkMap', '心智圖', '回想', 'Follow'],
    sections: [
      { id: 'open-markmap', title: '開啟與導覽', blocks: [
        { type: 'paragraph', text: '從 View → 開啟 MarkMap，以獨立視窗查看目前 Page。普通節點導覽只改變心智圖；開啟 Follow 才會同步捲動並標示來源，明確選擇「前往來源／編輯此 Block」才移動 Editor 游標。' },
      ] },
      { id: 'active-recall', title: '開始一次主動回想', blocks: [
        { type: 'steps', items: ['把目前節點移到具有後代的提示節點。', '按「開始回想」，後代會暫時隱藏。', '每行輸入一個概念，以兩個空白或一個 Tab 表示層級。', '按「比對答案」，再用「揭露下一層」逐步查看來源。'] },
        { type: 'code', language: 'text', code: '- 氣候\n  - 溫度\n  - 降雨\n- 產業\n  - 農業' },
      ] },
      { id: 'recall-boundary', title: '回想資料不寫回筆記', blocks: [
        { type: 'note', title: '唯讀練習 View', text: '答案、比對、自評與揭露進度只存在目前 MarkMap 視窗。第一版不提供 Flashcard、間隔重複、跨 session 歷史或 AI 同義判斷。' },
      ] },
    ],
  },
  {
    id: 'matrix', category: '檢視與發現', title: 'Matrix 分類檢查器',
    description: '把同一 parent 下的同層分支排成表格，檢查共同、部分、獨有與缺口。',
    keywords: ['Matrix', '比較', '分類', '缺口', 'transpose'],
    sections: [
      { id: 'prepare-structure', title: '準備可比較的結構', blocks: [
        { type: 'code', language: 'markdown', code: '- 資料庫選型\n  - PostgreSQL\n    - 優點\n      - SQL 完整\n    - 雲端託管\n  - SQLite\n    - 優點\n    - 初期成本\n      - 低' },
        { type: 'paragraph', text: '開啟 View → 開啟 Matrix 後，選擇「資料庫選型」作為比較範圍。直接同層分支成為比較欄，下一層面向會對齊成列。' },
      ] },
      { id: 'read-result', title: '閱讀分類結果', blocks: [
        { type: 'list', items: ['共同：每個比較項目都具有該面向。', '部分：只有部分比較項目出現。', '獨有：只出現在一個比較項目。', '空值：面向 Block 存在，但沒有 value。', '缺口：該欄沒有這個面向；顯示為 —。', '重複：同一欄有多個相同面向，保留每個來源入口。'] },
      ] },
      { id: 'back-to-source', title: '回到來源', blocks: [
        { type: 'paragraph', text: '欄標題、value、空值與缺口都能導回開啟 Matrix 的原始 Pane。Matrix 不會替你新增內容，也不會猜測同義詞或宣稱分類正確。' },
      ] },
    ],
  },
  {
    id: 'graphs', category: '檢視與發現', title: 'Page Graph 與 Workspace Graph',
    description: '從單一 Page 的正反向連結，擴展到整個 Workspace 的關聯網路。',
    keywords: ['Graph', 'Page Graph', 'Workspace Graph', '3D'],
    sections: [
      { id: 'page-graph', title: 'Page Graph', blocks: [
        { type: 'paragraph', text: 'Page Graph 以目前 Page 為中心，呈現正向與反向 Page Link 脈絡。適合回答「這一頁引用了誰」與「哪些頁面正在引用它」。' },
      ] },
      { id: 'workspace-graph', title: 'Workspace Graph', blocks: [
        { type: 'paragraph', text: 'Workspace Graph 以可分群的 3D 網路探索整個 Initialized Workspace，包含沒有連結的孤立 Page。它使用知識索引，因此未初始化 Working Folder 不提供此 View。' },
      ] },
      { id: 'graph-source', title: '關係仍來自 Markdown', blocks: [
        { type: 'note', title: 'Graph 是投影', text: 'Graph edge 來自可解析的 Page Links；Unlinked Mention 只是建議，不會自動變成 Graph 關係。' },
      ] },
    ],
  },
  {
    id: 'search-navigation', category: '搜尋與日常工作', title: '搜尋、導覽與命令面板',
    description: '從檔名、Alias、全文內容與快捷命令，快速回到正確 Page 與位置。',
    keywords: ['Search', '搜尋', 'Folder Tree', 'Command Palette', '快捷鍵'],
    sections: [
      { id: 'search-levels', title: '三種尋找方式', blocks: [
        { type: 'list', items: ['Folder Tree：依資料夾、檔名與 Alias 尋找並管理 Markdown。', 'Workspace 全文搜尋：依閱讀時真正看見的文字跨 Page 搜尋，支援大小寫、全字與 Regex。', 'Page 內搜尋／取代：用 Ctrl+F 與 Ctrl+H 處理目前文件。'] },
      ] },
      { id: 'command-palette', title: '命令面板', blocks: [
        { type: 'paragraph', text: '按 Ctrl+Shift+P 搜尋 Workspace、View 與 Editor 命令。不適用的命令仍會顯示，並說明目前缺少的情境，讓功能保持可發現。' },
        { type: 'code', language: 'text', code: 'Ctrl+Shift+F  搜尋 Workspace\nAlt+← / Alt+→  回前頁／回後頁\nCtrl+J        手動叫出自動完成\nAlt+Enter     Block 快速動作' },
      ] },
      { id: 'navigation-history', title: '頁面導覽歷史', blocks: [
        { type: 'paragraph', text: '回前頁／回後頁記錄的是 Page 導覽，不是內容版本。返回時會恢復該 Page 的游標、選取與捲動位置。' },
      ] },
    ],
  },
  {
    id: 'journal', category: '搜尋與日常工作', title: 'Daily Journal',
    description: '用固定日期 Page 建立每天的入口，並在日期之間安全導覽。',
    keywords: ['Daily Journal', 'today', 'tomorrow', '日期', '日記'],
    sections: [
      { id: 'open-journal', title: '用命令前往日期', blocks: [
        { type: 'code', language: 'text', code: '/today\n/tomorrow\n/yesterday\n/2026/09/07+1\n/2026/09/07-1' },
        { type: 'paragraph', text: '在 Initialized Workspace 的 NiMode 使用日期命令，NiNote 會開啟既有 Journal，或在 pages/YYYY-MM-DD.md 安全建立新檔。' },
      ] },
      { id: 'date-navigation', title: '日期導覽', blocks: [
        { type: 'paragraph', text: '目前 Page 是標準 Daily Journal 時，可以使用前一天／後一天；也能從任何 Page 選擇特定日期，再按「前往」。只有確認後才會建立不存在的日期檔。' },
      ] },
      { id: 'journal-safety', title: '不覆寫、不在午夜跳頁', blocks: [
        { type: 'note', title: '安全邊界', text: '既有 Journal 不會被覆寫；目前文件無法安全寫回時不會建立目標。NiNote 也不會在午夜自動切換 Page。' },
      ] },
    ],
  },
  {
    id: 'tasks', category: '任務與時間', title: 'Task 與 Task Center',
    description: '把 Markdown 中的 Task 跨 Page 彙整，同時保留父 Block 與來源位置。',
    keywords: ['Task', 'Task Center', 'Todo', 'Doing', 'Done', '狀態'],
    sections: [
      { id: 'task-markers', title: '六種 Task 狀態', blocks: [
        { type: 'code', language: 'markdown', code: '- [backlog] 尚未排入\n- [todo] 準備開始\n- [doing] 進行中\n- [review] 等待確認\n- [cancel] 已取消\n- [done] 已完成' },
        { type: 'paragraph', text: 'NiNote 也相容讀取 [ ] 為 Todo、[x] 為 Done。Task 必須位於無序清單內容開頭，才能被 Task Center 納入。' },
      ] },
      { id: 'use-task-center', title: '跨筆記整理任務', blocks: [
        { type: 'steps', items: ['開啟左側「任務」分頁。', '用六個狀態按鈕決定要顯示哪些 Task。', '再用文字、全部／目前 Page、Project 與時間分類交叉篩選。', '點 Task 文字回到來源；用狀態控制直接更新唯一的來源 Markdown。'] },
      ] },
      { id: 'context-and-source', title: '保留脈絡，不複製任務', blocks: [
        { type: 'paragraph', text: 'Task Center 會顯示連接 Task 所需的最小父 Block 階層。它不是新的任務資料庫，也沒有第二份 Task 內容；狀態修改會寫回原 Page。' },
      ] },
    ],
  },
  {
    id: 'task-time', category: '任務與時間', title: 'Task 日期、提醒與 Calendar',
    description: '替 Task 加入開始、可執行、截止與提醒時間，再用唯讀 Calendar 檢視。',
    keywords: ['deadline', 'reminder', 'Calendar', 'execute-after', 'Project'],
    sections: [
      { id: 'add-property', title: '加入 Task Property', blocks: [
        { type: 'steps', items: ['在 NiMode Task 下建立直接 child Block。', '輸入 /，選擇 start、execute-after、deadline 或 remind-me。', '在共用日期時間選擇器確認時間；取消不會修改 Markdown。', '需要時加入 Project Page Link，讓 Task Center 能依 Project 篩選。'] },
        { type: 'code', language: 'markdown', code: '- [todo] 完成研究摘要\n  - {task:execute-after} 2026-09-08T09:00+08:00\n  - {task:deadline} 2026-09-10T18:00+08:00\n  - {task:remind-me} 2026-09-10T16:00+08:00' },
      ] },
      { id: 'task-calendar', title: 'Task Calendar', blocks: [
        { type: 'paragraph', text: '從 View 開啟獨立的月份 Calendar，切換日期種類與 Task 狀態。Calendar 是唯讀投影；點選項目會安全導回來源 Task，不建立另一份事件資料。' },
      ] },
      { id: 'windows-reminders', title: 'Windows 提醒', blocks: [
        { type: 'paragraph', text: '提醒意圖保留在 Markdown，本機排程與已交付狀態則是可重建投影。完成或取消 Task 後，尚未交付的提醒會取消。裝置長時間關機造成的錯過提醒，會在下次啟動時合併提示。' },
        { type: 'note', tone: 'warning', title: '不是外部行事曆同步', text: '目前不會登入、匯入、匯出或同步 Google Calendar、Outlook、Apple Calendar、CalDAV 或 ICS。' },
      ] },
    ],
  },
  {
    id: 'files', category: '檔案與產品邊界', title: '附件、外部檔案與其他程式',
    description: '讓圖片、附件與 Markdown Page 在 NiNote 和 Windows 其他工具之間自然進出。',
    keywords: ['asset', '附件', '拖曳', 'Git', '外部檔案'],
    sections: [
      { id: 'bring-files-in', title: '把圖片與檔案放進 Workspace', blocks: [
        { type: 'list', items: ['貼上剪貼簿圖片：保存成 Workspace asset，插入相對 Markdown 圖片連結。', '拖入一般檔案：複製到 assets/，插入可攜的相對連結。', '拖入 Workspace 外檔案：可建立明確的 Windows file URI 引用；這種引用不具可攜性。'] },
      ] },
      { id: 'send-pages-out', title: '把 Page 拖到其他程式', blocks: [
        { type: 'paragraph', text: '從 Folder Tree 把單一既有 Markdown Page 拖往能接收檔案的瀏覽器或外部程式。NiNote 傳遞實際檔案並採複製語意，不會刪除或修改來源 Page。' },
      ] },
      { id: 'external-change', title: '搭配 Git 與外部編輯器', blocks: [
        { type: 'paragraph', text: 'Workspace 保持一般檔案結構，可以用 Git、備份工具或其他 Markdown 編輯器管理。若外部版本在 NiNote 尚有未儲存內容時改變，NiNote 會暫停 autosave 並要求處理衝突，不以舊內容靜默覆寫。' },
      ] },
    ],
  },
  {
    id: 'scope', category: '檔案與產品邊界', title: '目前產品範圍',
    description: '了解 NiNote 現階段聚焦的平台、資料模型與尚未承諾的能力。',
    keywords: ['scope', 'Windows', 'Android', 'sync', 'AI', '限制'],
    sections: [
      { id: 'current-focus', title: '目前聚焦', blocks: [
        { type: 'list', items: ['Windows Desktop-first。', '以個人本機 Workspace 為主。', 'Markdown 檔案自主、結構化編輯、關係追蹤與可重建 View。', '目前仍在外部 design partners、留存與付費驗證階段。'] },
      ] },
      { id: 'android', title: 'Android companion prototype', blocks: [
        { type: 'paragraph', text: '目前只有有限 prototype：從 GitHub repository 已提交的 branch 查看今日 Journal 與可見 Task、快速追加 Todo，並安全更新既有 Task 狀態。它不是完整行動版或一般化同步服務。' },
      ] },
      { id: 'not-promised', title: '尚未承諾', blocks: [
        { type: 'list', items: ['完整 Windows 以外桌面平台與 iOS 支援。', '完整雙向雲端同步與離線 exactly-once。', '企業多人權限、身分、稽核與部署治理。', 'AI 自動推理、結構類比正確性或自動知識判定。', '外部 Calendar 同步，以及上市日期、價格、SLA 或 Roadmap。'] },
        { type: 'note', tone: 'warning', title: '文件邊界', text: '本指南說明目前已交付、使用者可觀察的能力，不應被解讀為未來功能或商業承諾。' },
      ] },
    ],
  },
];

export const docsById = new Map(docs.map((doc) => [doc.id, doc]));
