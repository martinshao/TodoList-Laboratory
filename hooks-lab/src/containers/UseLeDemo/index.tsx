import { useEffect, useLayoutEffect, useState } from 'react'

function UseLeDemo() {
  const [count, setCount] = useState(0);

  //用 useLayoutEffect 试试
  useLayoutEffect(() => {
    if (count === 0) {
      const randomNum = Math.random() * 100;//随机生成一个数字

      const now = performance.now();

      while (performance.now() - now < 100) {//阻塞一段时间
        console.log('blocking...');
      }

      setCount(randomNum);//重新设置状态，设置成随机数
    }
  }, [count]);

  return <div onClick={() => setCount(0)}>{count}</div>;
}

export default UseLeDemo