import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CounterProvider } from './useCounterContext';
import styled from 'styled-components';
import { Count, Decrement, Increment, Label } from './components';
import { FilterProvider } from './useFilterContext';

interface CounterProps {
  children: ReactElement[];
  onChange: (count: number) => void;
  initialValue?: number;
  filter?: number;
}

function Counter({
  children,
  onChange,
  initialValue = 0,
  filter = 0,
}: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  const firstMounded = useRef<boolean>(true);

  useEffect(() => {
    if (!firstMounded.current) {
      onChange && onChange(count);
    }

    firstMounded.current = false;
  }, [count, onChange]);

  const handleIncrement = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setCount((count) => Math.max(0, count - 1));
  }, []);

  const filterValue = useMemo(() => ({ filter }), [filter]);

  return (
    <CounterProvider value={{ count, handleIncrement, handleDecrement }}>
      <FilterProvider value={filterValue}>
        <StyledCounter>{children}</StyledCounter>
      </FilterProvider>
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
