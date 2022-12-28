import { ReactElement, useEffect, useRef, useState } from 'react';
import { CounterProvider } from './useCounterContext';
import styled from 'styled-components';
import { Count, Decrement, Increment, Label } from './components';

interface CounterProps {
  children: ReactElement[];
  onChange: (count: number) => void;
  initialValue?: number;
}

function Counter({ children, onChange, initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  const firstMounded = useRef<boolean>(true);

  useEffect(() => {
    if (!firstMounded.current) {
      onChange && onChange(count);
    }

    firstMounded.current = false;
  }, [count, onChange]);

  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

  const handleDecrement = () => {
    setCount(Math.max(0, count - 1));
  };

  return (
    <CounterProvider value={{ count, handleIncrement, handleDecrement }}>
      <StyledCounter>{children}</StyledCounter>
    </CounterProvider>
  );
}

const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`;

Counter.Count = Count;
Counter.Label = Label;
Counter.Increment = Increment;
Counter.Decrement = Decrement;

export { Counter };
