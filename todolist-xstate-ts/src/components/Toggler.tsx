import { useMachine } from '@xstate/react';
import toggleMachine from '../xstate/toggleMachine';

const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  console.info('****', state.value);

  return (
    <>
      <button onClick={() => send('TRIGGER')}>
        {state.value === 'inactive'
          ? 'Click to activate'
          : 'Active! Click to deactivate'}
      </button>
      <button onClick={() => send('STOP')}>
        {state.value === 'inactive'
          ? 'Click to activate'
          : 'Active! Click to deactivate'}
      </button>
    </>
  );
};

export default Toggler;
