import { createMachine, assign, spawn, actions } from 'xstate';
import { createTodoMachine } from './todoMachine';
import { v4 as uuidv4 } from 'uuid';
import { TodoContext } from './todoMachine';

function createTodo(title: string) {
  return {
    ref: null,
    id: uuidv4(),
    title,
    completed: false,
  };
}

interface TodosContext {
  todo: string;
  todos: TodoContext[];
  filter: string;
}

type TodosEvent =
  | { type: 'NEWTODO.CHANGE'; value: string }
  | { type: 'NEWTODO.COMMIT'; value: string }
  | { type: 'TODO.COMMIT'; todo: TodoContext }
  | { type: 'TODO.DELETE' }
  | { type: 'SHOW' }
  | { type: 'MARK.completed' }
  | { type: 'MARK.active' }
  | { type: 'CLEAR_COMPLETED' };

export const todosMachine = createMachine<TodosContext, TodosEvent>({
  id: 'todos',
  preserveActionOrder: true,
  context: {
    todo: '', // new todo
    todos: [],
    filter: 'all',
  } as TodosContext,
  initial: 'loading',
  states: {
    loading: {
      entry: assign({
        todos: (context) => {
          console.log(context);
          // "Rehydrate" persisted todos
          return context.todos.map((todo) => ({
            ...todo,
            ref: spawn(createTodoMachine(todo)),
          }));
        },
      }),
      always: 'ready',
    },
    ready: {},
  },
  on: {
    'NEWTODO.CHANGE': {
      actions: assign({
        todo: (_, event) => event.value,
      }),
    },
    'NEWTODO.COMMIT': {
      actions: [
        assign({
          todo: '', // clear todo
          todos: (context, event) => {
            const newTodo = createTodo(event.value.trim());
            if (Array.isArray(context.todos)) {
              return context.todos.concat({
                ...newTodo,
                ref: spawn(createTodoMachine(newTodo)),
              });
            }
          },
        }),
        'persist',
      ],
      // cond: (_, event) => event.value.trim().length,
    },
  },
});
