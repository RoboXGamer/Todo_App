import "./App.css";
import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
export type TodoData = { title: string; id: string; completed: boolean }[] | [];
const initialData: TodoData = [];
function App() {
  const [data, setData] = useState<TodoData>(initialData);
  return (
    <div className="app">
      <main>
        <TodoForm setData={setData} />
        <TodoList data={data} setData={setData} />
      </main>
      <footer>Made by ME!</footer>
    </div>
  );
}

export default App;
