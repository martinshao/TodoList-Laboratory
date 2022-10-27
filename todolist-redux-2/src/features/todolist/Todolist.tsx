export default function TodoList({
  todos,
  addTodo,
}: {
  todos: string[];
  addTodo: (text: string) => void;
}) {

  const addTodoEvent = () => addTodo('text')

  return (
    <div>
      <h1>Todolist</h1>
      <ul>
        {todos.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <button onClick={addTodoEvent}>button</button>
    </div>
  );
}
