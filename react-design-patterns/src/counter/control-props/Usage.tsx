import React, { useState } from 'react';
import Counter from './Counter';

function Usage() {
  const [count, setCount] = useState<number>(0);

  const handleChangeCounter = (newCount: number) => {
    setCount(newCount);
  };
  return (
    <Counter value={count} onChange={handleChangeCounter}>
      <Counter.Decrement icon={'minus'} />
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment icon={'plus'} />
    </Counter>
  );
}

export default Usage;
