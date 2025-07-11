import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggleComplete, onDelete }) {
  return (
    <div
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      onClick={onToggleComplete}
    >
      <span className="todo-text">{todo.text}</span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // 親要素のクリックイベントが発火しないようにする
          onDelete();
        }}
        className="delete-item-button"
      >
        ×
      </button>
    </div>
  );
}

export default TodoItem;