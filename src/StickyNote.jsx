import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './StickyNote.css';

function StickyNote({ note, isActive, onSelect, updateNoteTodos, onDeleteNote, onClearAllTodos, onEditTitle }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);

  const handleToggleComplete = (todoId) => {
    const updatedTodos = note.todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    updateNoteTodos(updatedTodos);
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodos = note.todos.filter((todo) => todo.id !== todoId);
    updateNoteTodos(updatedTodos);
  };

  const handleSaveTitle = () => {
    if (editedTitle.trim() !== '') {
      onEditTitle(editedTitle);
    } else {
      onEditTitle(note.title); // 空の場合は元のタイトルに戻す
    }
    setIsEditingTitle(false);
  };

  const handleKeyDownTitle = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enterキーでの改行を防ぐ
      handleSaveTitle();
    }
  };

  return (
    <div className={`sticky-note ${isActive ? 'active' : ''}`} onClick={onSelect}>
      {/* タイトル表示・編集エリア */}
      <div className="note-title-area">
        {isEditingTitle ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyDown={handleKeyDownTitle}
            className="note-title-input"
            autoFocus
          />
        ) : (
          <h3 className="note-title" onClick={() => setIsEditingTitle(true)}>
            {note.title}
          </h3>
        )}
      </div>

      {/* 編集・削除ボタンをタイトルフォームの下に配置 */}
      <div className="note-buttons-top">
        <button onClick={(e) => { e.stopPropagation(); setIsEditingTitle(true); }} className="note-button edit-button">編集</button>
        <button onClick={(e) => { e.stopPropagation(); onDeleteNote(); }} className="note-button delete-button">削除</button>
      </div>

      <div className="note-todos">
        {note.todos.length === 0 ? (
          <p className="no-tasks">タスクはありません</p>
        ) : (
          note.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={() => handleToggleComplete(todo.id)}
              onDelete={() => handleDeleteTodo(todo.id)}
            />
          ))
        )}
      </div>

      <div className="note-footer">
        <button onClick={(e) => { e.stopPropagation(); onClearAllTodos(); }} className="note-button clear-all-button">一括削除</button>
      </div>
    </div>
  );
}

export default StickyNote;