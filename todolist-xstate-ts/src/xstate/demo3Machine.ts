import { createMachine } from 'xstate';

interface IContext {
  value: string
}

type Events = { type: 'FOO'; value: number } | { type: 'BOO' }

const machine = createMachine<IContext, Events>({
  initial: 'a',
  context: {
    value: '',
  },
  states: {
    a: {
      on: {
        FOO: {
          actions: 'consoleLogValue',
          target: 'b'
        }
      }
    },
    b: {
      entry: [
        (context, event) => {
          // This will error at .flag
          console.log(event.value);
        }
      ]
    }
  }
});

export default machine