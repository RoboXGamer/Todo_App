import { memo, useCallback, useState } from "react";
import "../styles/TodoItem.css";
import { TodoData } from "../App";

function TodoItem({
  text,
  deleteHandler,
  id,
  setData,
}: {
  text: string;
  deleteHandler: any;
  id: string;
  setData: React.Dispatch<React.SetStateAction<TodoData>>;
}) {
  const [editMode, setEditMode] = useState(false);
  const [textInput, setTextInput] = useState(text);
  const [isCompleted, setIsCompleted] = useState(false);
  const editHandler: React.FormEventHandler<HTMLFormElement> = function (e) {
    e.preventDefault();
    const id = e.currentTarget.dataset.id as string;

    // Save
    if (editMode === true) {
      setData((prev) => {
        const index = prev.findIndex((x) => x.id === id);
        const data = [...prev];
        data[index] = {
          id,
          title: textInput,
          completed: prev[index].completed,
        };
        return data;
      });
    }
    setEditMode((prev) => !prev);
  };
  const handleCompletion: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(function () {
      setIsCompleted((prev) => !prev);
      setData((prev) => {
        const index = prev.findIndex((x) => x.id === id);
        const data = [...prev];
        data[index] = {
          id,
          title: prev[index].title,
          completed: !prev[index].completed,
        };
        return data;
      });
    }, []);

  return (
    <li className="todo-item">
      <input type="checkbox" onChange={handleCompletion} name="completed" />
      <form
        onReset={deleteHandler}
        onSubmit={editHandler}
        data-id={id}
        className="todo-form"
      >
        {editMode ? (
          <input
            name="text"
            className="todo-input"
            autoFocus
            type="text"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.currentTarget.value);
            }}
          />
        ) : (
          <span className={isCompleted ? "completed" : ""}>{text}</span>
        )}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button id="edit-item" type="submit">
            {editMode ? "Save" : "Edit"}
          </button>
          <button id="delete" type="reset">
            Delete
          </button>
        </div>
      </form>
    </li>
  );
}

export default memo(TodoItem);
