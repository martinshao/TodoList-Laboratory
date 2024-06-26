import { assign, createMachine, interpret } from 'xstate';

interface User {
  name: string;
}

interface UserContext {
  user?: User;
  error?: string;
}

type UserEvent =
  | { type: 'fetch'; id: string }
  | { type: 'resolve'; user: User, msg: string, success: boolean }
  | { type: 'reject'; error: string };

  // type SingleOrArray<T> = T[] | T;

  // type Transitions = [K in UserEvent['type']]

const transitions: {[K in UserEvent['type']]: string} = {
  fetch: '',
  resolve: '',
  reject: ''
}

console.info(transitions)

type UserTypeState =
  | {
      value: 'idle';
      context: UserContext & {
        user: undefined;
        error: undefined;
        age: number;
      };
    }
  | {
      value: 'loading';
      context: UserContext;
    }
  | {
      value: 'success';
      context: UserContext & { user: User; error: undefined };
    }
  | {
      value: 'failure';
      context: UserContext & { user: undefined; error: string };
    };

const userMachine = createMachine<UserContext, UserEvent, UserTypeState>(
  {
    id: 'user',
    initial: 'idle',
    states: {
      idle: {
        /* ... */
        on: {
          fetch: {
            actions: assign({
              user: (context, event) => event.id
            }),
          },
        },
      },
      loading: {
        /* ... */
        on: {
          resolve: {
            actions: (context, event) => { console.log('activating...', event.user); }
          },
          reject: {
            actions: 'consoleLogData'
          }
        }
      },
      success: {
        /* ... */
      },
      failure: {
        /* ... */
      },
    },
  },
  {
    actions: {
      consoleLogData: (context, event) => {
        // This will error at .flag
        console.info(context.error)
        console.log(event.type);
      },
    },
  }
);

const userService = interpret(userMachine);

userService.subscribe((state) => {
  if (state.matches('success')) {
    // from the UserState typestate, `user` will be defined
    // state.context.user.name;
    // state.context
    // state.can()
  }
});
