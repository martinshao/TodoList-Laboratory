import { useState } from 'react';
import ChildEffect from './ChildEffect';

export default function UseEffectDemo() {
  const [url, setUrl] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <>
      <button onClick={() => setUrl(Math.random().toString())}>
        Generator url
      </button>
      <button onClick={() => setVisible((prev) => !prev)}>Toggle</button>
      <div>UseEffectDemo</div>
      {visible && <ChildEffect url={url} />}
    </>
  );
}
