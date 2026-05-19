import React, { useState } from 'react';
import { usePrevious } from '../hooks/usePrevious';

function UsePreviousDemo() {
  const [count, setCount] = useState<number>(0);
  const preCount = usePrevious(count);
  return (
    <div>
      <div>当前值{count}</div>
      <div>上一次值{preCount}</div>

      <button onClick={() => setCount((count) => count + 1)}>+1</button>
    </div>
  );
}

export default UsePreviousDemo;
