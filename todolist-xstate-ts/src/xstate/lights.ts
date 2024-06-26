import { createMachine } from 'xstate';

const pedestrianStates = {
  initial: 'walk',
  states: {
    walk: {
      on: {
        PED_COUNTDOWN: { target: 'wait' },
      },
    },
    wait: {
      on: {
        PED_COUNTDOWN: { target: 'stop' },
      },
    },
    stop: {},
    blinking: {},
  },
};

const lightMachine = createMachine({
  key: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: { target: 'yellow' },
      },
    },
    yellow: {
      on: {
        TIMER: { target: 'red' },
      },
    },
    red: {
      on: {
        TIMER: { target: 'green' },
      },
      ...pedestrianStates,
    },
  },
  on: {
    POWER_OUTAGE: { target: '.red.blinking' },
    POWER_RESTORED: { target: '.red' },
  },
});

export { pedestrianStates, lightMachine };
