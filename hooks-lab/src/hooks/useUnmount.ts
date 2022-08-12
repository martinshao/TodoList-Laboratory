import { useEffect, useRef } from 'react';

const useUnmount = (fn: () => void) => {

  const ref = useRef(fn);
  ref.current = fn;

  useEffect(
    () => () => {
      fn?.()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export default useUnmount;