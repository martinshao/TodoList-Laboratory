import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Count, Label, Increment, Decrement } from './components';
import { CounterProvider } from './useCounterContext';

interface CounterProps {
  value: number | null;
  children: ReactElement[];
  onChange: (count: number) => void;
  initialValue?: number;
}

function Counter({
  children,
  value = null,
  onChange,
  initialValue = 0,
}: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  const isControlled = value !== null && !!onChange;

  const getCount = () => (isControlled ? value : count);

  const firstMounted = useRef(true);

  useEffect(() => {
    if (!firstMounted.current && !isControlled) {
      onChange && onChange(count);
    }
    firstMounted.current = false;
  }, [count, isControlled, onChange]);

  const handleCountChange = (newValue: number) => {
    isControlled ? onChange(newValue) : setCount(newValue);
  };

  const handleIncrement = () => {
    handleCountChange(getCount() + 1);
  };

  const handleDecrement = () => {
    handleCountChange(Math.max(0, getCount() - 1));
  };

  return (
    <CounterProvider
      value={{ count: getCount(), handleIncrement, handleDecrement }}
    >
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
