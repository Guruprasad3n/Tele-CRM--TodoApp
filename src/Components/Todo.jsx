import { useEffect, useState } from "react";
import "./todoStyle.css";

function Todo() {
  const [title, setTitle] = useState("completedTodo");
  const [description, setDescription] = useState("completedTodo");
  const [todo, setTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);

  useEffect(() => {
    let allTodos = JSON.parse(localStorage.getItem("todo")) || [];
    let completedTodos = JSON.parse(localStorage.getItem("completed")) || [];

    setTodo(allTodos);
    setCompletedTodo(completedTodos);
  }, []);
  console.log("todo", todo);
  console.log("completedTodo", completedTodo);

  const handleCreate = () => {
    if (title === "" || description === "") {
      alert("Fill the Titile and Description");
      return;
    }
    let newTodo = { title, description };
    const updatedTodos = [...todo, newTodo];
    setTodo(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
    setTitle("");
    setDescription("");
  };

  const handleRemove = (index) => {
    const updatedTodos = todo.filter((_, i) => i !== index);
    setTodo(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  };
  const handleCompletedRemove = (index) => {
    const updatedCompletedTodos = completedTodo.filter((_, i) => i !== index);
    setCompletedTodo(updatedCompletedTodos);
    localStorage.setItem("completed", JSON.stringify(updatedCompletedTodos));
  };

  const handleComplete = (index) => {
    const completedTodo = todo.filter((_, i) => i === index);
    console.log(completedTodo);

    const updatedTodos = todo.filter((_, i) => i !== index);
    setTodo(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));

    const completed = JSON.parse(localStorage.getItem("completed")) || [];
    const updateCompltedTodo = [...completed, ...completedTodo];
    setCompletedTodo(updateCompltedTodo);
    localStorage.setItem("completed", JSON.stringify(updateCompltedTodo));
  };
  return (
    <>
      <div className="todo-parent-container">
        <div className="add-todo-section">
          <input
            type="text"
            className="todo-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="todo-input"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleCreate} className="todo-button">
            Submit
          </button>
        </div>
        <div className="todo-list">
          <div>
            <h1 style={{ textDecoration: "underline" }}>Pending Tasks</h1>
            {todo &&
              todo.map((e, i) => (
                <div className="single-task" key={i}>
                  <div>
                    <p className="title-todo">
                      <span>Title:</span> {e.title}
                    </p>
                    <p className="description-todo">
                      <span>Description:</span> {e.description}
                    </p>
                  </div>
                  <div className="buttons-todo">
                    <button onClick={() => handleRemove(i)}>Delete</button>
                    <button onClick={() => handleComplete(i)}>Complete</button>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <h1 style={{ textDecoration: "underline" }}>Completed Tasks</h1>
            {completedTodo &&
              completedTodo.map((e, i) => (
                <div className="single-task" key={i}>
                  <div>
                    <p className="title-todo">
                      <span>Title:</span> {e.title}
                    </p>
                    <p className="description-todo">
                      <span>Description:</span> {e.description}
                    </p>
                  </div>
                  <div>
                    <button
                      className="delete-button"
                      onClick={() => handleCompletedRemove(i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Todo;
