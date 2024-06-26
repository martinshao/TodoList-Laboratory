import React from 'react';
import Filter from './components/Filter';
import { Counter } from './Counter';

function Usage() {
  const handleChangeCounter = (count: number) => {
    console.info('count', count);
  };
  return (
    <Counter onChange={handleChangeCounter}>
      <Counter.Decrement icon='minus' />
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment icon='plus' />
      <Filter />
    </Counter>
  );
}

export default Usage;
