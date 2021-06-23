import React, { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [...state.todos, { text: action.text, completed: false }],
        todoCount: state.todos.length + 1
      };
    case "toggole-todo":
      return {
        todos: state.todos.map((t, idx) =>
          idx === action.idx ? { ...t, completed: !t.completed } : t
        ),
        todoCount: state.todoCount
      };
    default:
      return state;
  }
}

const App = () => {
  const [{ todos, todoCount }, dispatch] = useReducer(reducer, {
    todos: [],
    todoCount: 0
  });
  const [text, setText] = useState();
  function click(idx) {
    dispatch({ type: "toggole-todo", idx });
  }
  console.log(todos, "todos");
  return (
    <div>
      number: todo count: {todoCount}
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch({ type: "add-todo", text });
          setText("");
        }}
      >
        <input value={text} onChange={e => setText(e.target.value)}></input>
      </form>
      <ul>
        {todos.map((el, idx) => {
          return (
            <li
              key={el.text}
              onClick={() => click(idx)}
              style={{ textDecoration: el.completed ? "line-through" : "" }}
            >
              {el.text}
            </li>
          );
        })}
      </ul>
      <pre>{JSON.stringify(todos)}</pre>
    </div>
  );
};

export default App;
