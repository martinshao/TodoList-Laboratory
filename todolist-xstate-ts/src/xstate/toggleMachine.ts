import { createMachine } from 'xstate';

// const toggleMachine = createMachine({
//   id: 'toggle',
//   initial: 'inactive',
//   states: {
//     inactive: {
//       on: { TOGGLE: 'active' },
//     },
//     active: {
//       on: { TOGGLE: 'inactive' },
//     },
//   },
// });

const toggleMachine = createMachine(
  {
    id: 'trigger',
    initial: 'inactive',
    states: {
      inactive: {
        // key: '',
        // type: 'atomic',
        on: {
          TRIGGER: {
            target: 'active',
            // 转换 actions
            actions: ['activate', 'sendTelemetry', 'notifyDone']
          }
        }
      },
      active: {
        // 进入 actions
        entry: ['notifyActive', 'sendTelemetry'],
        // 退出 actions
        exit: ['notifyInactive', 'sendTelemetry'],
        on: {
          STOP: { target: 'inactive' }
        },
        onDone: []
      }
    }
  },
  {
    actions: {
      // action 实现
      activate: (context, event) => {
        console.log('activating...');
      },
      notifyActive: (context, event) => {
        console.log('notify active!');
      },
      notifyInactive: (context, event) => {
        console.log('notify inactive!');
      },
      sendTelemetry: (context, event) => {
        console.log('time:', Date.now());
      },
      notifyDone: (context, event) => {
        console.log('active done');
      }
    }
  }
);

export default toggleMachine;
