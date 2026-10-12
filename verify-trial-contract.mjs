import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: Home } = await server.ssrLoadModule('/app/page.tsx');
  const html = renderToStaticMarkup(createElement(Home));
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
  const mailLinks = links.filter(([, href]) => href.startsWith('mailto:'));
  assert.ok(mailLinks.length >= 3, 'Hero, trial section and footer must provide email contact.');
  for (const [, href] of mailLinks) {
    const mail = new URL(href.replaceAll('&amp;', '&'));
    assert.equal(mail.pathname, 'alegalone@gmail.com');
    assert.equal(mail.searchParams.get('subject'), 'Intugrove 試用申請');
  }
  assert.match(html, /href="#download">申請試用<\/a>/);
  assert.match(html, /id="download"/);
  assert.match(html, /目前不提供公開下載或免費版本/);
  assert.match(html, /聯絡 Robin 本人申請試用/);
  assert.match(html, /alegalone@gmail\.com/);
  for (const [, href] of links) {
    assert.doesNotMatch(href, /github\.com\/MSIT12806\/ninote-site\/releases/i);
    assert.doesNotMatch(href, /\.(?:exe|msi|zip|nupkg)(?:[?#]|$)/i);
  }
  assert.doesNotMatch(html, /下載 Windows 版|使用安裝精靈|快速安裝|Early Access 可下載/);
  for (const file of ['app/page.tsx', 'app/guide-page.tsx', 'app/guide-content.ts', 'app/demo-page.tsx']) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /https:\/\/github\.com\/MSIT12806\/ninote-site\/releases/i, file);
  }
  console.log(`TRIAL_REQUEST_CONTRACT_OK recipient=alegalone@gmail.com emailLinks=${mailLinks.length} publicDownloads=0`);
} finally {
  await server.close();
}
