import debounce from 'lodash/debounce';
import { useMemo } from 'react';
import type { DebounceOptions } from './useDebounce';
import useLatest from './useLatest';
import useUnmount from './useUnmount';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';

type noop = (...args: any[]) => any;

/**
 * from ahooks
 * @param fn 
 * @param options 
 * @returns 
 */
function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options,
      ),
    [fnRef, options, wait],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}

export default useDebounceFn;
