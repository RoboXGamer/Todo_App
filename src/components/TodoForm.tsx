import React, { memo } from "react";
import "../styles/TodoForm.css";
import type { TodoData } from "../App";

function TodoForm({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<TodoData>>;
}) {
  const AddTodo: React.FormEventHandler<HTMLFormElement> = function (e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todoTitle = formData.get("title");
    const title = todoTitle?.toString();
    if (!title) return;
    setData((prev) => {
      return [
        ...prev,
        { title, id: `${title}-#${prev.length}`, completed: false },
      ];
    });
    // @ts-ignore
    const inputElem = e.target[0];
    inputElem.value = "";
  };
  // console.log("RECOMPUTING FORM!!!!");

  return (
    <div className="form-container">
      <form onSubmit={AddTodo}>
        <input name="title" type="text" placeholder="Enter your todo here" />
      </form>
    </div>
  );
}
const memoizedForm = memo(TodoForm);
export default memoizedForm;
