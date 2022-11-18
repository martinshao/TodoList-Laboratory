import { useEffect, useState } from 'react';

function SubCounter({ count }: { count: number }) {
  console.info('SubCounter-----start rendering');
  const [subcount, setSubcount] = useState(1);
  useEffect(() => {
    console.info('SubCounter-----useEffect running');
    const interval = setInterval(() => {
      console.info('setTimeout calling...')
      setSubcount((count) => count + 1);
    }, 1000);
    return () => {
      clearInterval(interval)
      console.info('SubCounter-----useEffect cleaning');
    };
  }, [count]);
  console.log(
    '%c-------------------------------------------------------',
    'color:skyblue'
  );
  console.info('SubCounter-----start');
  return (
    <div>
      <h2>SubCounter</h2>
      <p>props.count: {count}</p>
      <p>subcount: {subcount}</p>
    </div>
  );
}

function Counter() {
  console.info('Counter-----start');
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.info('Counter-----useEffect running');

    return () => {
      console.info('Counter-----useEffect cleaning');
    };
  }, [count]);
  console.log(
    '%c-------------------------------------------------------',
    'color:skyblue'
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
      <SubCounter count={count} />
    </div>
  );
}

export default Counter;
