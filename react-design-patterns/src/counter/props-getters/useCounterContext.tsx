import { createContext, ReactElement, useContext } from 'react';

interface CounterContextInterface {
  count: number;
}

const CounterContext = createContext<CounterContextInterface | undefined>(
  undefined
);

interface CounterProviderProps {
  children: ReactElement;
  value: any;
}

function CounterProvider(props: CounterProviderProps) {
  return (
    <CounterContext.Provider value={props.value}>
      {props.children}
    </CounterContext.Provider>
  );
}

function useCounterContext(): CounterContextInterface {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounterContext must be used within a CounterProvider.');
  }
  return context;
}

export { CounterProvider, useCounterContext };
