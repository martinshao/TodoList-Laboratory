import { useEffect, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { DebounceOptions } from 'ahooks/lib/useDebounce/debounceOptions';

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();
  }, [run, value]);

  return debounced;
}

export default useDebounce;
