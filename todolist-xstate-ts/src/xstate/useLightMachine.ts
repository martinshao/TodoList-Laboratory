import { useState, useEffect } from 'react';
// import type { StateMachine } from 'xstate';

export const useStateMachine = (machine: any) => {
  console.info('machine value', machine.value)
  const [state, setState] = useState(machine.value);
  
  useEffect(() => {
    machine.initial && setState(machine.initial);
  }, [machine.initial]);

  function dispatch(transition: string) {
    console.info('transition', transition)
    const { value: nextState } = machine.transition(state, transition);
    setState(nextState);
  }

  return { state, dispatch };
}
