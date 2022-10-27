import React, { useEffect, useMemo, useState } from 'react';

export default function OptimizationDemo() {
  const dep = useMemo(
    () => ({
      step: 2,
    }),
    []
  );

  const [count, setCount] = useState<number>(0);

  const update = () => setCount((count) => count + 1);

  useEffect(() => {
    console.info('useEffect runing...');
  }, [dep]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={update}>OptimizationDemo</button>
    </div>
  );
}
