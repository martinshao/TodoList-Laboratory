import React, { useState, useEffect, useRef, useCallback } from 'react';

const create = () => {
  let id = setTimeout(() => {
    console.info('1');
  }, 1000);
  return () => clearTimeout(id);
};

function UseStateDemo() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);
  const [step, setStep] = useState<number>(8);

  const useCountRef = useRef<number>(count);

  console.info(useCountRef.current);

  useEffect(create, [count]);

  useEffect(() => {
    console.info('useEffect runing...');
    let id = setInterval(() => {
      console.info('2');
    }, 2000);
    console.info('interval id', id);
    return () => {
      console.info('useEffect clear runing...');
      console.info('interval id', id);
      clearInterval(id);
    };
  }, [step]);

  const handleClick = useCallback(
    () => setCount((count) => count + 1),
    [setCount]
  );

  // useEffect(() => {
  //   let id = setTimeout(() => {
  //     console.info('3')
  //   }, 3000)
  //   return () => clearTimeout(id)
  // })

  // useEffect(() => {
  //   let id = setTimeout(() => {
  //     console.info('4')
  //   }, 4000)
  //   return () => clearTimeout(id)
  // })

  return (
    <div style={{ marginTop: '200px' }}>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default UseStateDemo;
