import { createMachine } from 'xstate';

export const STATES = {
  RED: 'red',
  YELLOW: 'yellow',
  GREEN: 'green',
};

export const lightColor = {
  red: ['#BE0000', '#681313'],
  yellow: ['#FFF338', '#F1CA89'],
  green: ['#81B214', '#4A503D'],
};

export const lightMachine = createMachine({
  id: 'light',
  initial: STATES.RED,
  states: {
    [STATES.RED]: {
      on: {
        Click: STATES.GREEN,
      },
    },
    [STATES.GREEN]: {
      on: {
        Click: STATES.YELLOW,
      },
    },
    [STATES.YELLOW]: {
      on: {
        Click: STATES.RED,
      },
    },
  },
});
