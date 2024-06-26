import { createMachine } from 'xstate';

export const mouseMachine = createMachine({
  on: {
    mousemove: {
      actions: [
        (context, event) => {
          const { clientX, clientY } = event;
          // console.info(event)
          console.log({ clientX, clientY });
        }
      ]
    }
  }
});

// const mouseService = interpret(mouseMachine).start();

// window.addEventListener('mousemove', (event) => {
//   // event can be sent directly to service
//   mouseService.send(event);
// });