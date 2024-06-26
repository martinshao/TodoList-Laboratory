import { createMachine } from 'xstate';

// const lightMachine = createMachine({
//   /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAjACZ0AT0FDkU5EA */
//   schema: {
//     // The context (extended state) of the machine
//     context: {} as { elapsed: number },
//     // The events this machine handles
//     events: {} as
//       | { type: 'TIMER' }
//       | { type: 'POWER_OUTAGE' }
//       | { type: 'PED_COUNTDOWN'; duration: number }
//   }
//   /* Other config... */
// });

const lightMachine = createMachine({
  id: "light",
  initial: "red",
  states: {
    green: {
      on: {
        TIMER: "yellow",
      },
    },
    yellow: {
      on: {
        TIMER: "red",
      },
    },
    red: { 
      on: {
        TIMER: "green",
      },
    },
  },
});

export default lightMachine