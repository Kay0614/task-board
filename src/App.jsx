import { useEffect, useState } from 'react';

const STORAGE_KEY = 'task-board:tasks';

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // 想定外の形式のデータが入っていた場合は空から始める
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [text, setText] = useState('');

  // タスクをブラウザに保存（リロードしても消えないように）
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // 保存できない環境では何もしない
    }
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }]);
    setText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <main className="board">
      <h1>タスクボード</h1>

      <form className="add-form" onSubmit={addTask}>
        <label htmlFor="new-task" className="visually-hidden">
          新しいタスク
        </label>
        <input
          id="new-task"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="タスクを入力"
          autoComplete="off"
        />
        <button type="submit" disabled={!text.trim()}>
          追加
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">タスクはまだありません。</p>
      ) : (
        <>
          <p className="summary">
            未完了 {remaining} 件 / 全 {tasks.length} 件
          </p>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={task.done ? 'task done' : 'task'}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="task-title">{task.title}</span>
                </label>
                <button
                  type="button"
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`「${task.title}」を削除`}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
