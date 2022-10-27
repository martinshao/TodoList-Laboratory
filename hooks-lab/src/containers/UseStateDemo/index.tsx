import { useCallback, useMemo, useState } from 'react';
import Children from './Children';

function UseStateDemo() {
  console.info('UseStateDemo rerendering');
  const [state, setState] = useState<number>(0);

  // const update = () => console.info(state);
  // const update = () => setState((prev) => prev + 1);
  const update = useCallback(() => setState((prev) => prev + 1), []);
  const counts = useMemo(() => [2, 3, 4, 5], []);
  return (
    <div onClick={update}>
      <button>UseStateDemo</button>
      <Children update={update} count={counts} />
    </div>
  );
}

export default UseStateDemo;
