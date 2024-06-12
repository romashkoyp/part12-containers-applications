import { Route, Routes } from 'react-router-dom'
import './App.css';
import TodoView from './Todos/TodoView'
import SingleTodo from './Todos/Todo'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:id" element={<SingleTodo />} />
        <Route path="/" element={<TodoView />} />
      </Routes>
    </div>
  )
}

export default App
