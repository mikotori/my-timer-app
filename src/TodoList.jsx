import React, { useState } from 'react';
import './TodoList.css'; // スタイルシートをインポート

function TodoList() {
  // タスクの状態を管理
  // 各タスクは { id: number, text: string, completed: boolean } の形式
  const [todos, setTodos] = useState([]);
  // 新規タスク入力用の状態
  const [inputValue, setInputValue] = useState('');

  // タスク追加処理
  const handleAddTodo = () => {
    if (inputValue.trim() === '') return; // 空のタスクは追加しない

    const newTodo = {
      id: Date.now(), // ユニークなIDを生成
      text: inputValue,
      completed: false, // 初期状態は未完了
    };
    setTodos([...todos, newTodo]); // 既存のタスクリストに新しいタスクを追加
    setInputValue(''); // 入力フィールドをクリア
  };

  // タスクの完了/未完了を切り替える処理
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // タスク削除処理（オプション：必要であれば追加）
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>

      <div className="todo-input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="新しいタスクを入力..."
        />
        <button onClick={handleAddTodo}>追加</button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            onClick={() => handleToggleComplete(todo.id)}
          >
            {/* タスクのブロック分けはCSSで調整するか、後述の機能拡張で実装 */}
            <span className="todo-text">{todo.text}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 親要素のクリックイベントが発火しないようにする
                handleDeleteTodo(todo.id);
              }}
              className="delete-button"
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;