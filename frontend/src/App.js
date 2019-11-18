import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Serverless todo app!
        </p>
      </header>

      <TodoList />


    </div>
  );
}

export default App;
