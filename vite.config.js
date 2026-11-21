import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages では https://<ユーザー名>.github.io/task-board/ で公開されるため、
// ビルド時のみベースパスを /task-board/ にする（開発サーバーは / のまま）
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/task-board/' : '/',
}));
