import { useEffect, useRef, useState } from "react";

const THROTTLE_DEFAULT_VALUE = 300

export function useThrottleValue<T>(value: T, delay = THROTTLE_DEFAULT_VALUE): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const now = Date.now()

    if (now - lastTimeRef.current >= delay) {
      lastTimeRef.current = now
      setThrottledValue(value)
    }
  
  }, [value, delay])
  

  return throttledValue
}