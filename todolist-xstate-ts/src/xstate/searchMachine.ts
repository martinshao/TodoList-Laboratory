import { createMachine } from "xstate";

interface searchMachineContext {
  canSearch: boolean
}

type searchMachineEvent = { type: 'SEARCH'; value: string, query?: string }

const searchValid = (context: searchMachineContext, event: searchMachineEvent) => {
  return Boolean(context.canSearch && event.query && event.query.length > 0);
};

const searchMachine = createMachine<searchMachineContext, searchMachineEvent>(
  {
    id: 'search',
    initial: 'idle',
    context: {
      canSearch: true
    },
    states: {
      idle: {
        on: {
          SEARCH: [
            {
              target: 'searching',
              // 仅当守卫 (cond) 判断为真时才过渡到“搜索”
              // cond: { type: 'searchValid' }
              cond: 'searchValid' // 或 { type: 'searchValid' }
            },
            { target: '.invalid' }
          ]
        },
        initial: 'normal',
        states: {
          normal: {},
          invalid: {}
        }
      },
      searching: {
        entry: 'executeSearch'
        // ...
      },
      searchError: {
        // ...
      }
    }
  },
  {
    guards: {
      searchValid // 可选，如果实现没有改变
    }
  }
);

export default searchMachine