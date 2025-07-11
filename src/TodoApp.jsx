import React, { useState } from 'react';
import StickyNoteContainer from './StickyNoteContainer'; // 付箋コンテナをインポート
import './TodoApp.css'; // 必要に応じてTodoApp全体のスタイル

function TodoApp() {
  // notesの状態を管理（各noteはID、タイトル、タスクリストを持つ）
  const [notes, setNotes] = useState([]);
  // 現在アクティブな付箋のID（新しいタスクが追加される付箋）
  const [activeNoteId, setActiveNoteId] = useState(null);
  // 新規タスク入力用の状態
  const [inputValue, setInputValue] = useState('');

  // 新しい付箋を作成する関数
  const handleAddStickyNote = () => {
    const newNote = {
      id: Date.now(), // ユニークなID
      title: `新しい付箋 ${notes.length + 1}`, // 初期タイトル
      todos: [], // 付箋内のタスクリスト
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id); // 新しく作った付箋をアクティブにする
  };

  // アクティブな付箋にタスクを追加する関数
  const handleAddTaskToActiveNote = () => {
    if (inputValue.trim() === '') return;
    if (activeNoteId === null && notes.length === 0) {
      // アクティブな付箋がなく、付箋が一つもない場合は、まず新しい付箋を作成
      const newNote = {
        id: Date.now(),
        title: `新しい付箋 1`,
        todos: [],
      };
      setNotes([newNote]);
      setActiveNoteId(newNote.id);
      // 新しい付箋に追加
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === newNote.id
            ? { ...note, todos: [...note.todos, { id: Date.now(), text: inputValue, completed: false }] }
            : note
        )
      );
    } else if (activeNoteId !== null) {
      // アクティブな付箋がある場合はそこに追加
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === activeNoteId
            ? { ...note, todos: [...note.todos, { id: Date.now(), text: inputValue, completed: false }] }
            : note
        )
      );
    } else {
      // アクティブな付箋がないが、付箋は存在する（選択されていない状態）
      // この場合は、ユーザーに付箋を選択させるか、最初の付箋に追加するなど、挙動を決める必要があります。
      // ここでは、デフォルトで最初の付箋に追加する、というロジックを入れておきます。
      if (notes.length > 0) {
          setNotes((prevNotes) =>
            prevNotes.map((note, index) =>
              index === 0 // 最初の付箋に追加
                ? { ...note, todos: [...note.todos, { id: Date.now(), text: inputValue, completed: false }] }
                : note
            )
          );
      }
    }
    setInputValue('');
  };

  // StickyNoteContainerに渡すpropsを準備
  const stickyNoteProps = {
    notes,
    setNotes, // notesの状態を更新するための関数
    activeNoteId,
    setActiveNoteId, // アクティブな付箋を設定する関数
  };

  return (
    <div className="todo-app-container">
      <h1 className="app-title">My Sticky To-Do App</h1>
      <div className="input-form-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={activeNoteId ? "選択中の付箋にタスクを入力..." : "タスクを入力するか、新しい付箋を作成してください..."}
          className="task-input"
        />
        <button onClick={handleAddTaskToActiveNote} className="add-task-button">
          タスク追加
        </button>
      </div>

      <StickyNoteContainer {...stickyNoteProps} onAddNote={handleAddStickyNote} />
    </div>
  );
}

export default TodoApp;