import { createMachine, assign, sendParent } from 'xstate'

export interface TodoContext {
  id: string;
  title: string;
  completed: boolean;
  preTitle?: string;
}

type TodoEvent =
  | { type: 'CHANGE'; value: string } |
  { type: 'COMMIT'; user: TodoContext } |
  { type: 'BLUR'; error: string } |
  { type: 'CANCEL'; error: string } |
  { type: 'SET_COMPLETED'; } |
  { type: 'TOGGLE_COMPLETE'; } |
  { type: 'SET_ACTIVE'; value: TodoContext } |
  { type: 'EDIT'; } |
  { type: 'DELETE'; }

type TodoTypestate =
  | {
    value: 'SET_COMPLETED';
    context: TodoContext & {
      user: undefined;
      error: undefined;
    };
  }
  | {
    value: 'commit';
    context: TodoContext;
  }
  | {
    value: 'success';
    context: TodoContext & { user: TodoContext; error: undefined };
  }
  | {
    value: 'failure';
    context: TodoContext & { user: undefined; error: string };
  };

export const createTodoMachine = ({ id, title, completed }: TodoContext) =>
  createMachine<TodoContext, TodoEvent, TodoTypestate>(
    {
      id: "todo",
      initial: "reading",
      context: {
        id,
        title,
        preTitle: title,
        completed
      },
      on: {
      },
      states: {
        reading: {
          on: {
            SET_COMPLETED: {
            },
            TOGGLE_COMPLETE: {
            },
            SET_ACTIVE: {
              actions: [assign({ completed: false }) as any, "commit"]
            },
            EDIT: {
              target: "editing",
              actions: "focusInput"
            },
          }
        },
        editing: {
          entry: assign({ preTitle: (context) => (context as TodoContext).title }),
          on: {
            CHANGE: {
              actions: assign({
                title: (_, event) => event.value
              })
            },
            COMMIT: [
              {
                target: "reading",
                actions: sendParent((context) => ({
                  type: "TODO.COMMIT",
                  todo: context
                })),
                cond: (context) => context.title.trim().length > 0
              },
              { target: "deleted" }
            ],
            BLUR: {
              target: "reading",
              actions: sendParent((context) => ({
                type: "TODO.COMMIT",
                todo: context
              }))
            },
            CANCEL: {
              target: "reading",
              actions: assign({ title: (context) => (context as any).preTitle })
            }
          }
        },
        deleted: {
          entry: sendParent((context) => ({
            type: "TODO.DELETE",
            id: context.id
          }))
        },
      },
    },
    {
      actions: {
        commit: sendParent((context) => ({
          type: 'TODO.COMMIT',
          todo: context
        })),
        focusInput: () => { }
      }
    }
  )