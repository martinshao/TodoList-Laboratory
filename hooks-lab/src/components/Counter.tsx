import React, { useEffect, useRef, useReducer, Reducer } from 'react'

interface CounterProps {
  name: string;
}

interface TickState {
  count: number;
  step: number;
}

const initialState: TickState = {
  count: 0,
  step: 1,
};

interface ActionType {
  type: string;
  step?: number;
}

const reducer: Reducer<TickState, ActionType> = (state: TickState, action: ActionType) => {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step as number };
  } else {
    return state
    // throw new Error();
  }
}

const Counter: React.FC<CounterProps> = ({ name }) => {
  console.info('Counter component rendering...')

  // const [count, setCount] = useState<number>(0)
  // const [step, setStep] = useState<number>(1)

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const countRef = useRef<number>(count)

  useEffect(() => {
    countRef.current = count
  })


  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCount(c => c + step)
  //   }, 1000)

  //   return () => {
  //     clearInterval(id)
  //   }
  // }, [step])

  useEffect(() => {
    console.info('effect runing...')
    const id = setInterval(() => {
      dispatch({ type: 'tick' }); // Instead of setCount(c => c + step);
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);


  return (
    <div>
      <p>{name}</p>
      <p> you clicked {count} times</p>
      <input type="number" value={step} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'step', step: Number(e.currentTarget.value) })} />
    </div>
  )
}

export default React.memo(Counter)