import { useState } from 'react';

// function dist(x1: number, y1: number, x2: number, y2: number): number
// export function dist(point1: point, point2: point): number;
export function dist(...args: number[]): number {
  // function body
  return 1;
}

const callFnsInSequence =
  (...fns: (((...args: any[]) => void) | undefined)[]) =>
  (...args: any[]) =>
    fns.forEach((fn) => fn && fn(args));

function useCounter({ initial, max }: { initial: number; max: number }) {
  const [count, setCount] = useState<number>(initial);

  const handleIncrement = () => {
    setCount((prevCount) => Math.min(prevCount + 1, max));
  };

  const handleDecrement = () => {
    setCount((prevCount) => Math.max(0, prevCount - 1));
  };

  //props getter for 'Counter'
  const getCounterProps = (...otherProps: any[]) => ({
    value: count,
    'aria-valuemax': max,
    'aria-valuemin': 0,
    'aria-valuenow': count,
    ...otherProps,
  });

  const getDecrementProps = (
    {
      onClick,
      ...otherProps
    }: {
      onClick?: (...args: any[]) => void;
    } = {
      onClick: function (...args: any[]): null {
       return null;
      },
    }
  ) => {
    return {
      onClick: callFnsInSequence(handleDecrement, onClick),
      disabled: count === 0,
      ...otherProps,
    };
  };

  const getIncrementProps = (
    {
      onClick,
      ...otherProps
    }: {
      onClick?: (...args: any[]) => void;
      [key: string]: any;
    } = {
      onClick: function (...args: any[]): null {
       return null;
      },
    }
  ) => ({
    onClick: callFnsInSequence(handleIncrement, onClick),
    disabled: count === max,
    ...otherProps,
  });

  return {
    count,
    handleIncrement,
    handleDecrement,
    getCounterProps,
    getDecrementProps,
    getIncrementProps,
  };
}

export { useCounter };
