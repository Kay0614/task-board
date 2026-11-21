# CLAUDE.md

## プロジェクト概要
タスクボード（task-board）Webアプリの作成プロジェクト。

## コミュニケーション
- 返答は日本語で、簡潔に。

## 技術スタック
| 分類 | 使用技術 |
| --- | --- |
| UI | React 19（関数コンポーネント + Hooks） |
| 言語 | JavaScript（JSX）※TypeScriptは未使用 |
| ビルドツール | Vite 8（`@vitejs/plugin-react`） |
| スタイル | 素のCSS（`src/index.css`、CSS変数で色を管理） |
| データ保存 | ブラウザの `localStorage`（キー：`task-board:tasks`） |
| ホスティング | GitHub Pages（GitHub Actions で自動デプロイ） |
| 実行環境 | Node.js（CIはLTS版） |

## 開発方針
- React + Vite で構築する（JavaScript / JSX）。
- レスポンシブ対応（スマホ・PC両方で表示崩れがないこと）。
- セマンティックなHTMLとアクセシビリティ（alt属性、見出し構造、キーボード操作など）に配慮する。
- 画像は適切なサイズ・形式に最適化する。

## ディレクトリ構成
- `index.html` … エントリーHTML
- `src/main.jsx` … Reactのエントリーポイント
- `src/App.jsx` … タスクボード本体
- `src/index.css` … スタイル
- `src/components/` … コンポーネントを分割する際に作成する

## 命名規約
- **コンポーネント**：PascalCase（例：`TaskItem`）。ファイル名もコンポーネント名と同じにする（`TaskItem.jsx`）。
- **1ファイル1コンポーネント**とし、`export default` で書き出す。
- **関数・変数**：camelCase（例：`tasks`, `remaining`）。
- **状態を変える関数**：動詞から始める（例：`addTask`, `toggleTask`, `deleteTask`）。
- **props で渡すイベント**：`on` + 動詞（例：`onToggle`, `onDelete`）。
- **定数**：UPPER_SNAKE_CASE（例：`STORAGE_KEY`）。
- **CSSクラス**：kebab-case（例：`task-list`, `add-form`）。状態を表すクラスは単語1つで付け足す（例：`task done`）。
- **localStorage のキー**：`task-board:<名前>` の形式にする。

## Git運用ルール
- **コードを変更するたびに、コミットしてGitHubにプッシュする。**
  1. `git add <変更ファイル>`
  2. `git commit -m "<変更内容の要約>"`
  3. `git push`
- コミットは変更の単位ごとに小さく分ける。
- コミットメッセージは日本語で、何を・なぜ変更したかを簡潔に書く。
- `.env` や認証情報などの機密ファイルはコミットしない（`.gitignore` に追加する）。
- プッシュに失敗した場合は、原因（コンフリクト・認証エラーなど）を報告して指示を仰ぐ。強制プッシュ（`--force`）は行わない。

## 確認方法
- `npm install` 後、`npm run dev` で開発サーバーを起動し、表示されたURLをブラウザで開いて確認する。
- `npm run build` でビルドが通ることを確認する。

## 公開（GitHub Pages）
- `main` にプッシュすると GitHub Actions（`.github/workflows/deploy.yml`）が自動でビルド・公開する。
- ビルド時のベースパスは `vite.config.js` の `base`（`/task-board/`）で設定している。リポジトリ名を変えた場合はここも変更する。

## デプロイ先
https://Kay0614.github.io/task-board/
