import React, { useMemo } from 'react';
import { useDebounce } from 'react-use';

/**
 * usage: react-use useDebounce
 * @returns
 */
function UseDebounceDemo() {
  const [state, setState] = React.useState('Typing stopped');
  const [val, setVal] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');

  const [, cancel] = useDebounce(
    () => {
      setState('Typing stopped');
      setDebouncedValue(val);
    },
    2000,
    [val]
  );

  const searchResult = useMemo(() => {
    console.info('debouncedValue', debouncedValue)
    return `debouncedValue ${debouncedValue}`
  }, [debouncedValue])

  return (
    <div>
      <input
        type='text'
        value={val}
        placeholder='Debounced input'
        onChange={({ currentTarget }) => {
          setState('Waiting for typing to stop...');
          setVal(currentTarget.value);
        }}
      />
      <div>{state}</div>
      <div>
        Debounced value: {debouncedValue}
        <button onClick={cancel}>Cancel debounce</button>
      </div>
      <div>searchResult: {searchResult}</div>
    </div>
  );
}

export default UseDebounceDemo;
