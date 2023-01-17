export function addTodo(text) {
  return {
    type: "ADD_TODO",
    payload: text,
  };
}

export function removeTodo(id) {
  return {
    type: "REMOVE_TODO",
    payload: id,
  };
}
