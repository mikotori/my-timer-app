import React from 'react';
import StickyNote from './StickyNote';
import './StickyNoteContainer.css';

function StickyNoteContainer({ notes, setNotes, activeNoteId, setActiveNoteId, onAddNote }) {
  // 特定の付箋内のタスクを更新するヘルパー関数
  const updateNoteTodos = (noteId, updatedTodos) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, todos: updatedTodos } : note
      )
    );
  };

  // 特定の付箋を削除する関数
  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    // 削除した付箋がアクティブだった場合、アクティブな付箋をリセット
    if (activeNoteId === noteId) {
      setActiveNoteId(null);
    }
  };

  // 特定の付箋内の全タスクを削除する関数
  const handleClearAllTodosInNote = (noteId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, todos: [] } : note
      )
    );
  };

  // 付箋のタイトルを編集する関数
  const handleEditNoteTitle = (noteId, newTitle) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, title: newTitle } : note
      )
    );
  };

  return (
    <div className="sticky-note-container">
      <button onClick={onAddNote} className="add-note-button">
        + 新しい付箋を追加
      </button>

      <div className="notes-grid">
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            isActive={note.id === activeNoteId}
            onSelect={() => setActiveNoteId(note.id)} // 付箋がクリックされたらアクティブに設定
            updateNoteTodos={(updatedTodos) => updateNoteTodos(note.id, updatedTodos)}
            onDeleteNote={() => handleDeleteNote(note.id)}
            onClearAllTodos={() => handleClearAllTodosInNote(note.id)}
            onEditTitle={(newTitle) => handleEditNoteTitle(note.id, newTitle)}
          />
        ))}
      </div>
    </div>
  );
}

export default StickyNoteContainer;