import React from 'react';
import './App.css'; // グローバルなスタイルを維持する場合
import TodoApp from './TodoApp'; // 新しく作るTodoAppコンポーネントをインポート

function App() {
  return (
    <div className="App">
      <TodoApp /> {/* TodoAppをレンダリング */}
    </div>
  );
}

export default App;