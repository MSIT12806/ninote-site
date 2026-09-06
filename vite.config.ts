import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const rawBasePath = env.PAGES_BASE_PATH || '/';
  const base = rawBasePath === '/' ? '/' : `${rawBasePath.replace(/\/$/, '')}/`;

  return {
    base,
    plugins: [react()],
  };
});
