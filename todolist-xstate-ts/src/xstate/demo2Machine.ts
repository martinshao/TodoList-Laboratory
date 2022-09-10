import { createMachine } from 'xstate';

interface Context { }

type Event =
  { type: 'EVENT_WITH_FLAG'; flag: boolean }
  | {
    type: 'EVENT_WITHOUT_FLAG'; flag: boolean
  };

createMachine({
  schema: {
    context: {} as Context,
    events: {} as Event
  },
  initial: 'state1',
  states: {
    state1: {
      on: {
        EVENT_WITH_FLAG: {
          target: 'state2'
        }
      }
    },
    state2: {
      entry: [
        (context, event) => {
          // This will error at .flag
          console.log(event.flag);
        }
      ]
    }
  }
});