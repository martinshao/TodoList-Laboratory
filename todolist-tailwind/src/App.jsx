import Card from "./components/Card";
import Title from "./components/Title";
import Check from "./components/Check";
import AddTodo from "./components/AddTodo";
import Tab, { TabItem } from "./components/Tab";
import TodolistWrap from "./components/TodolistWrap";
import Todolist, { TodoItem } from "./components/Todolist";

function App() {
  return (
    <TodolistWrap>
      <Title />
      <AddTodo />
      <Card>
        <Tab>
          <TabItem />
        </Tab>
        <Todolist>
          <TodoItem />
        </Todolist>
        <Check />
      </Card>
    </TodolistWrap>
  );
}

export default App;
