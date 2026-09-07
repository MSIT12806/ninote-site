import { useEffect, useMemo, useState } from 'react';
import type * as React from 'react';
import {
  ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Circle, FileCode2,
  GitBranch, ListTree, Moon, Network, Plus, RotateCcw, Sun,
} from 'lucide-react';

type Theme = 'light' | 'dark';
type Mode = 'nimode' | 'rendered' | 'source';
type Projection = 'outline' | 'graph' | 'matrix';
type TaskStatus = 'todo' | 'doing' | 'done' | null;
type DemoBlock = { id: number; depth: number; text: string; status: TaskStatus };

const initialBlocks: DemoBlock[] = [
  { id: 1, depth: 0, text: '知識工作', status: null },
  { id: 2, depth: 1, text: '研究', status: null },
  { id: 3, depth: 2, text: '整理來源與證據', status: null },
  { id: 4, depth: 2, text: '連結到 [[研究方法]]', status: null },
  { id: 5, depth: 1, text: '寫作', status: null },
  { id: 6, depth: 2, text: '比較共同點與差異', status: null },
  { id: 7, depth: 2, text: '補上尚未說清楚的缺口', status: 'todo' },
];

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><span>N</span></span>;
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function toMarkdown(blocks: DemoBlock[]) {
  return blocks.map((block) => `${'  '.repeat(block.depth)}- ${block.status ? `[${block.status}] ` : ''}${block.text}`).join('\n');
}

const statusLabel: Record<Exclude<TaskStatus, null>, string> = { todo: 'Todo', doing: 'Doing', done: 'Done' };

export default function DemoPage() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mode, setMode] = useState<Mode>('nimode');
  const [projection, setProjection] = useState<Projection>('outline');
  const [blocks, setBlocks] = useState<DemoBlock[]>(initialBlocks);
  const [activeId, setActiveId] = useState(4);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('ninote-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#080b10' : '#f5f7f8');
  }, [theme]);

  const updateBlocks = (next: DemoBlock[]) => { setBlocks(next); setRevision((value) => value + 1); };
  const activeIndex = blocks.findIndex((block) => block.id === activeId);
  const active = blocks[activeIndex] ?? blocks[0];

  const changeText = (id: number, text: string) => updateBlocks(blocks.map((block) => block.id === id ? { ...block, text } : block));
  const addBlock = (asChild: boolean) => {
    const nextId = Math.max(...blocks.map((block) => block.id)) + 1;
    const newBlock = { id: nextId, depth: asChild ? Math.min(active.depth + 1, 3) : active.depth, text: asChild ? '新的子 Block' : '新的 Block', status: null } satisfies DemoBlock;
    const next = [...blocks]; next.splice(activeIndex + 1, 0, newBlock); updateBlocks(next); setActiveId(nextId);
  };
  const changeDepth = (delta: number) => {
    if (activeIndex < 0) return;
    const previousDepth = activeIndex > 0 ? blocks[activeIndex - 1].depth : 0;
    const maxDepth = delta > 0 ? Math.min(previousDepth + 1, 3) : 3;
    const depth = Math.max(0, Math.min(active.depth + delta, maxDepth));
    updateBlocks(blocks.map((block) => block.id === activeId ? { ...block, depth } : block));
  };
  const cycleTask = () => {
    const nextStatus: Record<string, TaskStatus> = { none: 'todo', todo: 'doing', doing: 'done', done: null };
    updateBlocks(blocks.map((block) => block.id === activeId ? { ...block, status: nextStatus[block.status ?? 'none'] } : block));
  };
  const reset = () => { setBlocks(initialBlocks); setActiveId(4); setRevision((value) => value + 1); };

  const links = useMemo(() => [...new Set(blocks.flatMap((block) => [...block.text.matchAll(/\[\[([^\]]+)\]\]/g)].map((match) => match[1])))], [blocks]);
  const branches = useMemo(() => blocks.filter((block) => block.depth === 1), [blocks]);

  return (
    <div className="demo-page">
      <header className="demo-header">
        <a className="demo-brand" href="../"><BrandMark /><span>NiNote</span><i>Interactive demo</i></a>
        <nav><a href="../">產品介紹</a><a href="../guide/">使用說明</a></nav>
        <div className="theme-switch demo-theme" role="group" aria-label="網站色彩主題">
          <button type="button" className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')} aria-pressed={theme === 'light'} aria-label="切換為淺色主題"><Sun size={15} /><span>淺色</span></button>
          <button type="button" className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'} aria-label="切換為深色主題"><Moon size={15} /><span>深色</span></button>
        </div>
      </header>

      <main className="demo-main">
        <section className="demo-intro">
          <div><span className="demo-kicker">Browser-only concept demo</span><h1>動手整理一小段知識。</h1><p>編輯 Block、改變層級、加入 Task，再觀察同一份內容如何投影成不同 View。</p></div>
          <aside><strong>這是互動概念展示</strong><span>內容只存在目前瀏覽器記憶體，不會儲存或上傳，也不是完整 NiNote 網頁版。</span></aside>
        </section>

        <ol className="demo-tour" aria-label="建議體驗步驟">
          <li><span>1</span><p><strong>選一個 Block</strong>直接修改文字</p></li>
          <li><span>2</span><p><strong>調整結構</strong>加入子 Block 或切換 Task</p></li>
          <li><span>3</span><p><strong>切換 View</strong>觀察右側投影</p></li>
        </ol>

        <section className="demo-workbench">
          <div className="demo-window-bar">
            <div className="demo-window-title"><BrandMark /><span>NiNote · 知識工作.md</span></div>
            <div className="demo-modes" role="tablist" aria-label="編輯模式">
              <button className={mode === 'nimode' ? 'active' : ''} onClick={() => setMode('nimode')} role="tab" aria-selected={mode === 'nimode'}>NiMode</button>
              <button className={mode === 'rendered' ? 'active' : ''} onClick={() => setMode('rendered')} role="tab" aria-selected={mode === 'rendered'}>Rendered</button>
              <button className={mode === 'source' ? 'active' : ''} onClick={() => setMode('source')} role="tab" aria-selected={mode === 'source'}>Source</button>
            </div>
            <button className="demo-reset" type="button" onClick={reset}><RotateCcw size={14} />重設</button>
          </div>

          <div className="demo-toolbar">
            <button type="button" onClick={() => addBlock(false)}><Plus size={15} />同層 Block</button>
            <button type="button" onClick={() => addBlock(true)}><GitBranch size={15} />子 Block</button>
            <button type="button" onClick={() => changeDepth(-1)} disabled={active.depth === 0}><ArrowLeft size={15} />升級</button>
            <button type="button" onClick={() => changeDepth(1)} disabled={activeIndex === 0 || active.depth >= blocks[activeIndex - 1].depth + 1}><ArrowRight size={15} />降級</button>
            <button type="button" onClick={cycleTask}><Circle size={15} />切換 Task</button>
          </div>

          <div className="demo-grid">
            <section className="demo-editor" aria-label="互動編輯器">
              <div className="demo-editor-heading"><span>pages / 知識工作.md</span><i>{mode === 'nimode' ? '可編輯' : '投影預覽'}</i></div>
              {mode === 'nimode' && <div className="demo-block-list">{blocks.map((block) => <div className={`demo-block ${block.id === activeId ? 'active' : ''}`} style={{ '--depth': block.depth } as React.CSSProperties} key={block.id} onClick={() => setActiveId(block.id)}><button type="button" className={`task-dot ${block.status ?? ''}`} aria-label={block.status ? `目前狀態 ${statusLabel[block.status]}` : '一般 Block'} onClick={(event) => { event.stopPropagation(); setActiveId(block.id); const map: Record<string, TaskStatus> = { none: 'todo', todo: 'doing', doing: 'done', done: null }; updateBlocks(blocks.map((item) => item.id === block.id ? { ...item, status: map[item.status ?? 'none'] } : item)); }}>{block.status === 'done' ? '✓' : block.status === 'doing' ? '◐' : ''}</button><input value={block.text} onFocus={() => setActiveId(block.id)} onChange={(event) => changeText(block.id, event.target.value)} aria-label={`Block ${block.id} 內容`} /></div>)}</div>}
              {mode === 'rendered' && <div className="rendered-preview">{blocks.map((block) => <div className={`rendered-row depth-${block.depth}`} key={block.id}>{block.depth === 0 ? <h2>{block.text}</h2> : <p>{block.status && <span className={`rendered-task ${block.status}`}>{block.status === 'done' ? '✓' : block.status === 'doing' ? '◐' : '○'}</span>}{block.text.replace(/\[\[|\]\]/g, '')}</p>}</div>)}</div>}
              {mode === 'source' && <pre className="source-preview"><code>{toMarkdown(blocks)}</code></pre>}
              <div className="demo-status"><span className="saved-indicator" />展示內容未儲存 · revision {revision + 1}</div>
            </section>

            <section className="demo-projection" aria-label="即時投影">
              <div className="projection-tabs" role="tablist"><button className={projection === 'outline' ? 'active' : ''} onClick={() => setProjection('outline')} role="tab"><ListTree size={15} />Outline</button><button className={projection === 'graph' ? 'active' : ''} onClick={() => setProjection('graph')} role="tab"><Network size={15} />Graph</button><button className={projection === 'matrix' ? 'active' : ''} onClick={() => setProjection('matrix')} role="tab"><FileCode2 size={15} />Matrix</button></div>
              <div className="projection-body" key={`${projection}-${revision}`}>
                {projection === 'outline' && <div className="outline-demo">{blocks.map((block) => <button type="button" className={block.id === activeId ? 'active' : ''} style={{ '--depth': block.depth } as React.CSSProperties} key={block.id} onClick={() => setActiveId(block.id)}>{block.depth < 2 ? <ChevronDown size={13} /> : <ChevronRight size={13} />}<span>{block.text.replace(/\[\[|\]\]/g, '')}</span></button>)}</div>}
                {projection === 'graph' && <div className="graph-demo"><span className="graph-edge edge-main" /><span className="graph-edge edge-link" /><button className="demo-node center" type="button">知識工作</button>{branches.slice(0, 2).map((block, index) => <button className={`demo-node branch branch-${index + 1}`} type="button" key={block.id} onClick={() => setActiveId(block.id)}>{block.text}</button>)}{links.slice(0, 1).map((link) => <button className="demo-node linked" type="button" key={link}>{link}</button>)}</div>}
                {projection === 'matrix' && <div className="matrix-demo"><table><thead><tr><th>面向</th>{branches.slice(0, 2).map((branch) => <th key={branch.id}>{branch.text}</th>)}</tr></thead><tbody><tr><th>來源</th><td className="present">有</td><td>—</td></tr><tr><th>比較</th><td>—</td><td className="present">有</td></tr><tr><th>缺口</th><td>—</td><td className="present">有</td></tr></tbody></table><p>示意：Matrix 對齊同層分支，缺少的面向不會被自動補寫。</p></div>}
              </div>
            </section>
          </div>
        </section>

        <section className="demo-next"><span>想了解每項操作的完整範圍？</span><a href="../guide/">前往使用說明 <ArrowRight size={16} /></a></section>
      </main>
    </div>
  );
}
