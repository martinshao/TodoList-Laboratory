import React, { useState, useEffect } from 'react'

const UseIntervalDemo: React.FC = () => {
  console.info('UseIntervalDemo start#######################')
  let [count, setCount] = useState(0);

  useEffect(() => {
    console.info('useEffect runing')
    let id = setInterval(() => {
      setCount(count => ++count);
    }, 1000);
    return () => {
      console.info('clearInterval(id) runing')
      clearInterval(id)
    };
  }, []);

  return <h1>{count}</h1>;
}

export default UseIntervalDemo