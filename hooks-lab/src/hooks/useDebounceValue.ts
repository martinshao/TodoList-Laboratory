import { useEffect, useState } from 'react';

const DEBOUNCE_DEFAULT_DELAY = 300;

export function useDebounceValue<T>(
  value: T,
  delay = DEBOUNCE_DEFAULT_DELAY,
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [delay, value]);

  return debouncedValue;
}
