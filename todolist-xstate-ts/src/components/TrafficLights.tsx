// import TrafficLight from './TrafficLight';
// import { createMachine } from 'xstate';
// import { stateMap } from '../state/light-state';
// import { useStateMachine } from '../xstate/useLightMachine';
import { useMachine } from '@xstate/react';
import lightMachine from '../xstate/lightMachine';

function TrafficLights() {
  // const trafficLightMachine = createMachine(stateMap);
  // const { state, dispatch } = useStateMachine(trafficLightMachine);

  const [state, send] = useMachine(lightMachine);

  console.info('state', state.value)

  return (
    <div className='App'>
      <div>
        {/* <TrafficLight
          RedOn={state === 'red'}
          YellowOn={state === 'yellow'}
          GreenOn={state === 'green'}
        /> */}
      </div>

      <button onClick={() => send({ type: 'TIMER' })}>Next light</button>
    </div>
  );
}

export default TrafficLights;
