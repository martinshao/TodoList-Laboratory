import { Fiber } from "../../../source/ReactFiberHooks";
import { Lane, NoLanes } from "./ReactFiberLane";
import { Dispatch, BasicStateAction } from './ReactInternalTypes'

export type LaneMap<T> = Array<T>;
export type RefObject = {
  current: any,
};

export type ReactProviderType<T> = {
  $$typeof: Symbol | number,
  _context: ReactContext<T>,
};

export type ReactContext<T> = {
  $$typeof: Symbol | number,
  Consumer: ReactContext<T>,
  Provider: ReactProviderType<T>,
  _currentValue: T,
  _currentValue2: T,
  _threadCount: number,
  // DEV only
  _currentRenderer?: Object | null,
  _currentRenderer2?: Object | null,
  // This value may be added by application code
  // to improve DEV tooling display names
  displayName?: string,

  // only used by ServerContext
  _defaultValue: T,
  _globalName: string,
};

let currentlyRenderingFiber: Fiber = null as any;

export type Update<S, A> = {
  lane: Lane,
  action: A,
  hasEagerState: boolean,
  eagerState: S | null,
  next: Update<S, A>,
};

/**
 * Hook 单元的基本结构
 */
export type Hook = {
  /**
   * 对于不同hook，有不同的值
   */
  memoizedState: any,
  /**
   * 初始state
   */
  baseState: any,
  /**
   * 初始queue队列
   */
  baseQueue: Update<any, any> | null,
  /**
   * 需要更新的update
   * 可能类型 UpdateQueue
   */
  queue: any,
  /**
   * 下一个hook
   */
  next: Hook | null,
};

export type UpdateQueue<S, A> = {
  pending: Update<S, A> | null,
  lanes: Lanes,
  dispatch: ((action: A) => unknown) | null,
  lastRenderedReducer: ((state: S, action: A) => S) | null,
  lastRenderedState: S | null,
};

let workInProgressHook: Hook | null = null;

function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };

  if (workInProgressHook === null) {
    // This is the first hook in the list
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}

export function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // $FlowFixMe: Flow doesn't like mixed types
  return typeof action === 'function' ? (action as (action: S) => S)(state) : action;
}

/**
 * 
 * @param initialState 
 * @returns 
 * 
 * dipatch: React.Dispatch<React.SetStateAction<number>>
 */
export function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    // $FlowFixMe: Flow doesn't like mixed types
    initialState = (initialState as () => S)();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue: UpdateQueue<S, BasicStateAction<S>> = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState as any),
  };
  hook.queue = queue;
  // var dispatch = queue.dispatch = dispatchSetState.bind(null, currentlyRenderingFiber$1, queue);
  const dispatch: Dispatch<
    BasicStateAction<S>
    > = (queue.dispatch = (dispatchSetState.bind(
      null,
      currentlyRenderingFiber,
      queue,
    ) as any));
  return [hook.memoizedState, dispatch];
}

export function updateState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  return updateReducer(basicStateReducer, (initialState as any));
}

function dispatchSetState<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A,
) {

  const lane = requestUpdateLane(fiber);

  const update: Update<S, A> = {
    lane,
    action,
    hasEagerState: false,
    eagerState: null,
    next: (null as any),
  };

  if (isRenderPhaseUpdate(fiber)) {
    enqueueRenderPhaseUpdate(queue, update);
  } else {
    const alternate = fiber.alternate;
    if (
      fiber.lanes === NoLanes &&
      (alternate === null || alternate.lanes === NoLanes)
    ) {
      // The queue is currently empty, which means we can eagerly compute the
      // next state before entering the render phase. If the new state is the
      // same as the current state, we may be able to bail out entirely.
      const lastRenderedReducer = queue.lastRenderedReducer;
      if (lastRenderedReducer !== null) {
        let prevDispatcher;
        try {
          const currentState: S = (queue.lastRenderedState as any);
          const eagerState = lastRenderedReducer(currentState, action);
          // Stash the eagerly computed state, and the reducer used to compute
          // it, on the update object. If the reducer hasn't changed by the
          // time we enter the render phase, then the eager state can be used
          // without calling the reducer again.
          update.hasEagerState = true;
          update.eagerState = eagerState;
          if (is(eagerState, currentState)) {
            // Fast path. We can bail out without scheduling React to re-render.
            // It's still possible that we'll need to rebase this update later,
            // if the component re-renders for a different reason and by that
            // time the reducer has changed.
            // TODO: Do we still need to entangle transitions in this case?
            // enqueueConcurrentHookUpdateAndEagerlyBailout(fiber, queue, update);
            return;
          }
        } catch (error) {
          // Suppress the error. It will throw again in the render phase.
        }
      }
    }

    // const root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
    // if (root !== null) {
    //   const eventTime = requestEventTime();
    //   scheduleUpdateOnFiber(root, fiber, lane, eventTime);
    //   entangleTransitionUpdate(root, queue, lane);
    // }
  }

  markUpdateInDevTools(fiber, lane, action);
}