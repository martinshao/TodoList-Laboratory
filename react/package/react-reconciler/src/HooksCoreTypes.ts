import { basicStateReducer } from "./ReactFiberHooks";
import { Lane, Lanes, NoLanes } from "./ReactFiberLane";
import { BasicStateAction } from "./ReactInternalTypes";

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

export function mountState<S>(
  initialState: (() => S) | S,
) {

  const hook: Hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };

  const queue: UpdateQueue<S, BasicStateAction<S>> = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState as any),
  };

  hook.queue = queue;

  const baseQueue: Update<S, (value: S) => void> = {
    lane: 1,
    action: () => initialState,
    hasEagerState:  false,
    eagerState: null,
    next: null,
  }

  hook.baseQueue = baseQueue
}
