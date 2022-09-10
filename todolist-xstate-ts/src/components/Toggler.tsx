import { useMachine } from '@xstate/react';
import toggleMachine from '../xstate/toggleMachine'

const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onClick={() => send('TOGGLE')}>
      {
        state.value === 'inactive'
          ? 'Click to activate'
          : 'Active! Click to deactivate'
      }
    </button>
  );
}

export default Toggler