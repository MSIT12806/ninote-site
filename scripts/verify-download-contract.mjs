import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');

assert.match(
  page,
  /const standardInstallerUrl = 'https:\/\/github\.com\/MSIT12806\/ninote-site\/releases\/latest\/download\/NiNote-win-x64-Installer\.msi';/,
  'The stable-name MSI must be the standard installer URL.',
);
assert.match(
  page,
  /const quickInstallerUrl = 'https:\/\/github\.com\/MSIT12806\/ninote-site\/releases\/latest\/download\/NiNote-win-x64-Setup\.exe';/,
  'The one-click Setup executable must remain available as the quick installer URL.',
);
assert.match(
  page,
  /className="primary-action" href=\{standardInstallerUrl\}>使用安裝精靈/,
  'The primary download action must use the MSI and explain that it opens a wizard.',
);
assert.match(
  page,
  /href=\{quickInstallerUrl\}>快速安裝/,
  'Setup.exe must be a clearly labelled secondary quick-install action.',
);
assert.match(
  page,
  /固定安裝在目前 Windows 使用者的 Local App Data/,
  'The public copy must state the fixed per-user installation destination.',
);
assert.match(
  page,
  /開始功能表捷徑，不建立桌面捷徑/,
  'The public copy must state the shortcut policy.',
);

console.log('Verified the staged NiNote MSI download contract.');
