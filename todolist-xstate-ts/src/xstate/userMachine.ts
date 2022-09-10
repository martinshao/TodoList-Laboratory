import { createMachine, interpret } from 'xstate'

interface User {
  name: string;
}

interface UserContext {
  user?: User;
  error?: string;
}

type UserEvent =
  { type: 'fetch'; id: string } |
  { type: 'resolve'; user: User } |
  { type: 'reject'; error: string }

type UserTypeState =
  {
    value: 'idle';
    context: UserContext & {
      user: undefined;
      error: undefined;
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

const userMachine = createMachine<UserContext, UserEvent, UserTypeState>({
  id: 'user',
  initial: 'idle',
  states: {
    idle: {
      /* ... */
    },
    loading: {
      /* ... */
    },
    success: {
      /* ... */
    },
    failure: {
      /* ... */
    }
  }
})

const userService = interpret(userMachine);

userService.subscribe((state) => {
  if (state.matches('success')) {
    // from the UserState typestate, `user` will be defined
    state.context.user.name;
  }
});