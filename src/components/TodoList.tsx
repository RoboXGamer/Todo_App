import TodoItem from "./TodoItem";
import "../styles/TodoList.css";
import { useCallback } from "react";
import type { TodoData } from "../App";

type TodoListProps = {
  data: TodoData;
  setData: React.Dispatch<React.SetStateAction<TodoData>>;
};

function TodoList({ data, setData }: TodoListProps) {
  const deleteItem = useCallback(function (e: any) {
    e.preventDefault();
    const btnElem = e.currentTarget;
    const id = btnElem.dataset.id as string;

    setData((prev) => {
      return prev.filter((x) => x.id !== id);
    });
  }, []);

  return (
    <ul className="todo-list">
      {data.map((item) => {
        return (
          <TodoItem
            id={item.id}
            key={item.id}
            text={item.title}
            deleteHandler={deleteItem}
            setData={setData}
          />
        );
      })}
    </ul>
  );
}

export default TodoList;
