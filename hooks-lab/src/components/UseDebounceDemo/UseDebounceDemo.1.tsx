import React, { ChangeEvent, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

export default function UseDebounceDemo() {
  const [count, setCount] = useState<number>(1);

  const debouncedCount = useMemo(() => debounce((count: number) => setCount(count), 300), [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.info(e.target.value);
    debouncedCount(parseInt(e.target.value))
  };

  return (
    <div>
      <h1>UseDebounceDemo</h1>
      <h2>count: {count}</h2>
      <input type='text' name='count' id='count' onChange={handleChange} />
    </div>
  );
}
