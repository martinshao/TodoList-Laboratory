import { assign, createMachine } from "xstate";

interface searchMachineContext {
  results: string | undefined
  errorMessage: string | undefined
}

type searchMachineEvent = { type: 'SEARCH'; value: string, query: string }

function getSearchResults(query: string | undefined) {
  return query
}

const search = (context: searchMachineContext, event: searchMachineEvent) =>
  new Promise((resolve, reject) => {
    if (!event.query.length) {
      return reject('No query specified');
      // or:
      // throw new Error('No query specified');
    }

    return resolve(getSearchResults(event.query));
  });

// ...
const searchMachine = createMachine<searchMachineContext, searchMachineEvent>({
  id: 'search',
  initial: 'idle',
  context: {
    results: undefined,
    errorMessage: undefined
  },
  states: {
    idle: {
      on: {
        SEARCH: { target: 'searching' }
      }
    },
    searching: {
      invoke: {
        id: 'search',
        src: (context, event) => {
          console.info(context.errorMessage)
          console.info(event.query)
        },
        onError: {
          target: 'failure',
          actions: assign({
            errorMessage: (context, event) => {
              // event is:
              // { type: 'error.platform', data: 'No query specified' }
              return event.data;
            }
          })
        },
        onDone: {
          target: 'success',
          actions: assign({ results: (_, event) => event.data })
        }
      }
    },
    success: {},
    failure: {}
  }
});

export default searchMachine