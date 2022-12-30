import { useState } from 'react';

function useCounter(initialValue: number) {
  const [count, setCount] = useState<number>(initialValue);

  const handleIncrement = () => {
    setCount((preCount) => preCount + 1);
  };

  const handleDecrement = () => {
    setCount((preCount) => Math.max(0, preCount - 1));
  };

  return { count, handleIncrement, handleDecrement };
}

export { useCounter };
