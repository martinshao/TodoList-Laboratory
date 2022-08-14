## useDebounce hooks的实现过程

### 解析 debounce

在我们动手开发 useDebounce 这个自定义hooks之前，首先了解 debounce 的原理。
> 一句话概括就说 在设定时间内，在频繁触发事件时，只执行最后一次事件。

了解这个前提之后，我们可以先动手实践传统意义上的防抖函数。

``` ts
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
```

以上代码可以清楚的看到，在重复触发debounce返回的函数时，之前的任务都会被清除，只有在设定时间内，停止触发了，才会执行对应的传递进来的函数。

### useDebounce 的API设计

在动手开发useDebounce之前，我们可以先弄清楚，这个自定义hooks要实现的功能是什么，使用的场景是什么？然后针对性的设计出API，并且写出用例demo。

``` ts
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
```

在我们的设计中，useDebounce 这个hooks具备的功能，有别于传统的debounce函数，更像是处理值的防抖。这句话的意思就是，在组件中频繁修改一个值，我们需要利用useDebounce 得到一个经过防抖处理后的值。如果这么考虑，我们就可以写出相应的测试用例。

``` tsx
function UseDebounceDemo() {
  const [val, setVal] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');

  const [isReady, cancel] = useDebounce(
    () => {
      setDebouncedValue(val);
    },
    2000,
    [val]
  );
}
```

我们初步实现一个hooks

``` ts
type UseDebounceReturn = [() => boolean | null, () => void];

default function useDebounce(
  fn: Function,
  ms: number = 0,
  deps: DependencyList = []
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
}
```

``` ts
export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

export default function useTimeoutFn(fn: Function, ms: number = 0): UseTimeoutFnReturn {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
}
```

```ts
interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return debounced;
}
```

``` ts
type noop = (...args: any) => any;

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  if (process.env.NODE_ENV === 'development') {
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
    [],
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
```