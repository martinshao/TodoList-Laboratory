import { useEffect, useState } from 'react';

function Counter() {
  console.info('Counter-----start');
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.info('Counter-----useEffect1 running');

    return () => {
      console.info('Counter-----useEffect1 cleaning');
    };
  }, [count]);

  useEffect(() => {
    console.info('Counter-----useEffect2 running');
    console.log(
      '%c-------------------------------------------------------',
      'color:deepskyblue'
    );
    return () => {
      console.info('Counter-----useEffect2 cleaning');
    };
  }, [count]);
  console.log(
    '%c-------------------------------------------------------',
    'color:#f16d7a'
  );

  console.info('Counter-----start rendering');
  return (
    <div className='container'>
      <h1>Counter</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>add</button>
        <button onClick={() => setCount((count) => count - 1)}>reduce</button>
      </div>
      <p>Counter: {count}</p>
    </div>
  );
}

export default Counter;
