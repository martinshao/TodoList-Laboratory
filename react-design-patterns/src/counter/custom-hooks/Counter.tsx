import React, { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Count, Label, Increment, Decrement } from './components';
import { CounterProvider } from './useCounterContext';

interface CounterProps {
  children: ReactNode;
  value: number;
  onChange?: (value: number) => void;
}

function Counter({ children, value: count, onChange }: CounterProps) {
  const firstMounded = useRef<boolean>(true);
  useEffect(() => {
    if (!firstMounded.current) {
      onChange && onChange(count);
    }
    firstMounded.current = false;
  }, [count, onChange]);

  return (
    <CounterProvider value={{ count }}>
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

export default Counter;
