import { useState, useMemo, useCallback } from 'react';
import { useDebounceFn } from 'ahooks';
import throttle from 'lodash/throttle';

function foo() {
  return 'bar';
}

function add(a: number, b: number) {
  return a + b;
}

// const a = () => () => {}
// const a = () => add(1, 2)

/**
 * usage: ahooks useDebounceFn
 * @returns
 */
export default function UseDebounceDemo() {
  const [value, setValue] = useState(0);
  const { run } = useDebounceFn(
    () => {
      setValue(value + 1);
    },
    {
      wait: 500,
    }
  );

  const memoizedState = useMemo(() => () => 12, []);

  const memoizedCallback = useCallback(foo, []);
  const memoizedResult = useMemo(foo, []);

  const throttledMethod = useMemo(() => throttle(foo, 500), []);
  const memoizedAdd = useMemo(() => add(1, 2), []);

  console.info('memoizedState', memoizedState);
  console.info('memoizedCallback', memoizedCallback);
  console.info('memoizedResult', memoizedResult);
  console.info('throttledMethod', throttledMethod);
  console.info('memoizedAdd', memoizedAdd);

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <button type='button' onClick={run}>
        Click fast!
      </button>
    </div>
  );
}
