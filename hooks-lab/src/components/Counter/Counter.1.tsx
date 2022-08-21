import React, { useState, useEffect, useRef } from 'react'

interface CounterProps {
  name: string;
}

const Counter: React.FC<CounterProps> = ({ name }) => {
  console.info('Counter component rendering...')
  const [counter, setCounter] = useState<number>(0)
  const countRef = useRef<number>(counter)

  // function handleAlertClick() {
  //   setTimeout(() => {
  //     window.alert(counter)
  //   }, 2000)
  // }

  useEffect(() => {
    console.info(`Hello ${name}`)
  }, [name])


  useEffect(() => {
    // console.info('count effect is runing')
    countRef.current = counter
    // console.info('useEffec is calling')
    // document.title = `You clicked ${counter} times`;
    // setTimeout(() => {
    //   console.info(`You clicked ${countRef.current} times`)
    // }, 3000)
    // return () => {
    //   console.info('clear count effect')
    // }
  });

  useEffect(() => {
    console.info('setInterval effect is runing')
    const id = setInterval(() => {
      setCounter(counter => counter + 1);
    }, 1000);
    return () => {
      console.info('clear effect')
      clearInterval(id)
    };
  }, []);

  return (
    <div>
      <p> you clicked {counter} times</p>
      <button onClick={() => setCounter(counter => counter + 1)}>
        Click Me
      </button>
      {/* <button onClick={handleAlertClick}>
        Alter Counter
      </button> */}
    </div>
  )
}

export default React.memo(Counter)