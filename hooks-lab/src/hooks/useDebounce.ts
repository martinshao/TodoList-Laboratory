import { useState, useEffect, DependencyList, useCallback } from 'react'

export type UseDebounceReturn = [boolean, () => void];

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * from react-use
 * @param fn 
 * @param delay 
 * @param immediate 
 * @return [isReady, cancel]
 */
export default function useDebounce(fn: Function, delay: number, immediate: boolean, deps: DependencyList = []): UseDebounceReturn {
  const [isReady, setIsReady] = useState<boolean>(true)
  let timer: string | number | NodeJS.Timeout | undefined;

  const debouncedFn = function (this: any, args: any) {
    if (immediate) {
      fn.apply(this, args)
    }
    clearTimeout(timer)
    setIsReady(false)
    timer = setTimeout(() => {
      fn.apply(this, args)
      setIsReady(true)
    }, delay);
  }

  useEffect(() => {
    debouncedFn
    return () => {
      clearTimeout(timer)
    }
  }, deps)
  const cancel = () => clearTimeout(timer)
  return [isReady, cancel]
}

type CallbackReturn = ReturnType<typeof useCallback>

/**
 * 
 * @param fn 需要防抖的方法
 * @param wait 防抖的时间期限
 * @param deps 依赖的变量
 * @return isReady 一个函数，返回防抖进行中还是已结束
 * @return cancel 取消当前的防抖过程
 */
export type UseDebounceT = (fn: Function, wait: number, deps: DependencyList) => [isReady: CallbackReturn, cancel: CallbackReturn]
