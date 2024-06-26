export const stateMap = {
  id: 'trafficLightsId',
  initial: 'green',
  states: {
    green: {
      on: { NEXT: 'yellow' },
    },
    yellow: {
      on: { NEXT: 'red' },
    },
    red: {
      on: { NEXT: 'green' },
    },
  },
};
