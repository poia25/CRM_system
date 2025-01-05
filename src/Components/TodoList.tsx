import React, { useState } from "react";
import { Todo } from "../types/todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface TodoListProps {
  todos: Todo[] | undefined;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
  editTodo,
}) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  const startEditing = (id: number, currentTitle: string) => {
    setEditId(id);
    setEditTitle(currentTitle);
  };

  const finishEditing = () => {
    if (editId !== null) {
      editTodo(editId, editTitle);
      setEditId(null);
      setEditTitle("");
    }
  };

  return (
    <div>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
            <>
              <input
              className="change"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button className="btn-change" onClick={finishEditing}>Сохранить</button>
            </>
            ):(
            <>
              <div className="circle-button-wrapper">
                    <button
                    className={`circle-button ${todo.isDone ? "active" : ""}`}
                    onClick={() => toggleTodo(todo.id)}
                    ></button>
                    <span
                    style={{
                        textDecoration: todo.isDone ? "line-through" : "none",
                        color: todo.isDone ? '#a8a8a8' : "black",
                    }}
                    >
                    {todo.title}
                    </span>
                <div className="right">
                    <button className="btn" onClick={() => startEditing(todo.id, todo.title)}>
                    <FontAwesomeIcon icon={faEdit}  />
                    </button>
                    <button className="btn" onClick={() => deleteTodo(todo.id)} style={{backgroundColor:'red'}} >
                    <FontAwesomeIcon icon={faTrash} style={{color:'white', height:'12px'}} />
                    </button>
                </div>
              </div>
            </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
