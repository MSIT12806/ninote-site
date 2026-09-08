import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight,
  Clipboard, ExternalLink, Menu, Moon, Search, Sun, X,
} from 'lucide-react';
import { categories, docs, docsById, type DocBlock, type DocPage } from './guide-content';

type Theme = 'light' | 'dark';

function BrandLogo() {
  return <img className="brand-logo" src={`${import.meta.env.BASE_URL}intugrove-logo.png`} alt="" aria-hidden="true" />;
}

function ThemeSwitch({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  return (
    <div className="theme-switch docs-theme-switch" role="group" aria-label="網站色彩主題">
      <button type="button" className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')} aria-pressed={theme === 'light'} aria-label="切換為淺色主題"><Sun size={15} /><span>淺色</span></button>
      <button type="button" className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'} aria-label="切換為深色主題"><Moon size={15} /><span>深色</span></button>
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="docs-code">
      <div className="docs-code-bar"><span>{language}</span><button type="button" onClick={copy}>{copied ? <Check size={14} /> : <Clipboard size={14} />}{copied ? '已複製' : '複製'}</button></div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function RenderBlock({ block }: { block: DocBlock }) {
  if (block.type === 'paragraph') return <p>{block.text}</p>;
  if (block.type === 'code') return <CodeBlock language={block.language} code={block.code} />;
  if (block.type === 'media') return (
    <figure className="docs-media">
      <a href={block.src} target="_blank" rel="noreferrer" aria-label={`${block.alt}（開啟原始尺寸）`}>
        <img src={block.src} alt={block.alt} width={block.width} height={block.height} decoding="async" />
        <span className="docs-media-open"><ExternalLink size={14} />開啟原圖</span>
      </a>
      <figcaption>{block.caption}</figcaption>
    </figure>
  );
  if (block.type === 'note') return <aside className={`docs-callout ${block.tone === 'warning' ? 'warning' : ''}`}><CheckCircle2 size={18} /><div><strong>{block.title}</strong><p>{block.text}</p></div></aside>;
  if (block.type === 'steps') return <ol className="docs-steps">{block.items.map((item, index) => <li key={item}><span>{index + 1}</span><p>{item}</p></li>)}</ol>;
  return <ul className="docs-list">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function Article({ page }: { page: DocPage }) {
  const index = docs.findIndex((item) => item.id === page.id);
  const previous = docs[index - 1];
  const next = docs[index + 1];

  return (
    <article className="docs-article">
      <div className="docs-breadcrumb"><span>使用說明</span><ChevronRight size={13} /><span>{page.category}</span></div>
      <h1>{page.title}</h1>
      <p className="docs-lead">{page.description}</p>
      {page.sections.map((section) => (
        <section id={section.id} key={section.id}>
          <h2>{section.title}</h2>
          {section.blocks.map((block, blockIndex) => <RenderBlock block={block} key={`${section.id}-${blockIndex}`} />)}
        </section>
      ))}
      <nav className="docs-pagination" aria-label="前後文件">
        {previous ? <a href={`#${previous.id}`}><ArrowLeft size={16} /><span><small>上一篇</small>{previous.title}</span></a> : <span />}
        {next ? <a href={`#${next.id}`}><span><small>下一篇</small>{next.title}</span><ArrowRight size={16} /></a> : <span />}
      </nav>
    </article>
  );
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function getPageFromHash() {
  const id = window.location.hash.slice(1);
  return docsById.has(id) ? id : 'overview';
}

export default function GuidePage() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [activeId, setActiveId] = useState(getPageFromHash);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const activePage = docsById.get(activeId) ?? docs[0];

  useEffect(() => {
    const onHashChange = () => { setActiveId(getPageFromHash()); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('ninote-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e1713' : '#f7f3e9');
  }, [theme]);

  const matchingIds = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return new Set(docs.map((doc) => doc.id));
    return new Set(docs.filter((doc) => [doc.title, doc.description, doc.category, ...doc.keywords].join(' ').toLocaleLowerCase().includes(normalized)).map((doc) => doc.id));
  }, [query]);

  return (
    <div className="docs-page">
      <header className="docs-header">
        <div className="docs-header-left">
          <button className="docs-menu-button" type="button" aria-label={menuOpen ? '關閉文件導覽' : '開啟文件導覽'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
          <a className="docs-brand" href="../"><BrandLogo /><span>Intugrove</span><i>Guide</i></a>
        </div>
        <nav className="docs-top-nav"><a href="../">產品介紹</a><a className="active" href="#overview">使用說明</a><a href="../demo/">產品畫面</a></nav>
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </header>

      <div className="docs-layout">
        <aside className={`docs-sidebar ${menuOpen ? 'open' : ''}`}>
          <label className="docs-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋使用說明" /></label>
          <nav aria-label="文件分類">
            {categories.map((category) => {
              const visiblePages = category.pages.map((id) => docsById.get(id)).filter((page): page is DocPage => Boolean(page && matchingIds.has(page.id)));
              if (!visiblePages.length) return null;
              return <div className="docs-nav-group" key={category.title}><h2>{category.title}</h2>{visiblePages.map((page) => <a className={page.id === activePage.id ? 'active' : ''} href={`#${page.id}`} key={page.id}>{page.title}</a>)}</div>;
            })}
            {matchingIds.size === 0 && <p className="docs-no-result">找不到相符文件。</p>}
          </nav>
          <a className="demo-sidebar-link" href="../demo/"><BookOpen size={16} /><span><strong>先看看真實介面</strong>開啟 Desktop 操作畫面</span><ArrowRight size={15} /></a>
        </aside>

        <main className="docs-main"><Article page={activePage} /></main>

        <aside className="docs-toc" aria-label="本頁章節">
          <span>本頁內容</span>
          {activePage.sections.map((section) => (
            <a
              href={`#${section.id}`}
              key={section.id}
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {section.title}
            </a>
          ))}
        </aside>
      </div>
    </div>
  );
}
