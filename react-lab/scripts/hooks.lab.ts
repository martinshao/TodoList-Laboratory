import { BasicStateAction, Dispatch, Effect, FunctionComponentUpdateQueue, Hook } from "../react/@types/react-dom";
import {
  Passive as PassiveEffect,
  PassiveStatic as PassiveStaticEffect,
  HasEffect as HookHasEffect,
} from '../react/constants'

let workInProgressHook = null
let currentlyRenderingFiber = {}

// const HooksDispatcherOnMount: Dispatcher = {
//   readContext,


//   useCallback: mountCallback,
//   useContext: readContext,
//   useEffect: mountEffect,
//   useImperativeHandle: mountImperativeHandle,
//   useLayoutEffect: mountLayoutEffect,
//   useInsertionEffect: mountInsertionEffect,
//   useMemo: mountMemo,
//   useReducer: mountReducer,
//   useRef: mountRef,
//   useState: mountState,
//   useDebugValue: mountDebugValue,
//   useDeferredValue: mountDeferredValue,
//   useTransition: mountTransition,
//   useMutableSource: mountMutableSource,
//   useSyncExternalStore: mountSyncExternalStore,
//   useId: mountId,

//   unstable_isNewReconciler: enableNewReconciler,
// };

// const HooksDispatcherOnUpdate: Dispatcher = {
//   readContext,

//   useCallback: updateCallback,
//   useContext: readContext,
//   useEffect: updateEffect,
//   useImperativeHandle: updateImperativeHandle,
//   useInsertionEffect: updateInsertionEffect,
//   useLayoutEffect: updateLayoutEffect,
//   useMemo: updateMemo,
//   useReducer: updateReducer,
//   useRef: updateRef,
//   useState: updateState,
//   useDebugValue: updateDebugValue,
//   useDeferredValue: updateDeferredValue,
//   useTransition: updateTransition,
//   useMutableSource: updateMutableSource,
//   useSyncExternalStore: updateSyncExternalStore,
//   useId: updateId,

//   unstable_isNewReconciler: enableNewReconciler,
// };

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

function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    // $FlowFixMe: Flow doesn't like mixed types
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue: UpdateQueue<S, BasicStateAction<S>> = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  };
  hook.queue = queue;
  const dispatch = (queue.dispatch = (dispatchSetState.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ) as any));
  return [hook.memoizedState, dispatch];
}

function updateState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  return updateReducer(basicStateReducer, (initialState: any));
}



function mountEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  // if (
  //   __DEV__ &&
  //   enableStrictEffects &&
  //   (currentlyRenderingFiber.mode & StrictEffectsMode) !== NoMode
  // ) {
  //   return mountEffectImpl(
  //     MountPassiveDevEffect | PassiveEffect | PassiveStaticEffect,
  //     HookPassive,
  //     create,
  //     deps,
  //   );
  // } else {
  //   return mountEffectImpl(
  //     PassiveEffect | PassiveStaticEffect,
  //     HookPassive,
  //     create,
  //     deps,
  //   );
  // }
  return mountEffectImpl(
    PassiveEffect || PassiveStaticEffect,
    HookPassive,
    create,
    deps,
  );
}

function updateEffect(
  create: () => (() => void) | void,
  deps: Array<unknown> | void | null,
): void {
  return updateEffectImpl(PassiveEffect, HookPassive, create, deps);
}

function mountEffectImpl(fiberFlags, hookFlags, create, deps): void {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    undefined,
    nextDeps,
  );
}

function pushEffect(tag, create, destroy, deps) {
  const effect: Partial<Effect> = {
    tag,
    create,
    destroy,
    deps,
    // Circular
    next: (null as any),
  };
  let componentUpdateQueue: null | FunctionComponentUpdateQueue = (currentlyRenderingFiber.updateQueue as any);
  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = (componentUpdateQueue: any);
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    const lastEffect = componentUpdateQueue.lastEffect;
    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      const firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }
  return effect;
}

function updateReducer(basicStateReducer: any, arg1: (initialState: any) => any): [S, Dispatch<BasicStateAction<S>>] {
  throw new Error("Function not implemented.");
}
function basicStateReducer(basicStateReducer: any, arg1: (initialState: any) => any): [S, Dispatch<BasicStateAction<S>>] {
  throw new Error("Function not implemented.");
}

function HookPassive(arg0: number, HookPassive: any, create: () => (() => void) | void, deps: void | mixed[] | null): void {
  throw new Error("Function not implemented.");
}

function updateEffectImpl(PassiveEffect: any, HookPassive: any, create: () => (() => void) | void, deps: void | mixed[] | null): void {
  throw new Error("Function not implemented.");
}

function PassiveEffect(PassiveEffect: any, HookPassive: any, create: () => (() => void) | void, deps: void | mixed[] | null): void {
  throw new Error("Function not implemented.");
}

function createFunctionComponentUpdateQueue(): any {
  throw new Error("Function not implemented.");
}

