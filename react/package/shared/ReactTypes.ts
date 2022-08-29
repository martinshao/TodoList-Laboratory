/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { Fiber } from "../react-reconciler/src/ReactInternalTypes";

type Key = string | number;

interface ErrorInfo {
  /**
   * Captures which component contained the exception, and its ancestors.
   */
  componentStack: string;
}

interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS>, DeprecatedLifecycle<P, S> {
  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   */
  componentDidMount?(): void;
  /**
   * Called to determine whether the change in props and state should trigger a re-render.
   *
   * `Component` always returns true.
   * `PureComponent` implements a shallow comparison on props and state and returns true if any
   * props or states have changed.
   *
   * If false is returned, `Component#render`, `componentWillUpdate`
   * and `componentDidUpdate` will not be called.
   */
  shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
  /**
   * Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
   * cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.
   */
  componentWillUnmount?(): void;
  /**
   * Catches exceptions generated in descendant components. Unhandled exceptions will cause
   * the entire component tree to unmount.
   */
  componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
}

interface NewLifecycle<P, S, SS> {
  /**
   * Runs before React applies the result of `render` to the document, and
   * returns an object to be given to componentDidUpdate. Useful for saving
   * things such as scroll position before `render` causes changes to it.
   *
   * Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
   * lifecycle events from running.
   */
  getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null;
  /**
   * Called immediately after updating occurs. Not called for the initial render.
   *
   * The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.
   */
  componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
}

interface DeprecatedLifecycle<P, S> {
  /**
   * Called immediately before mounting occurs, and before `Component#render`.
   * Avoid introducing any side-effects or subscriptions in this method.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
   * prevents this from being invoked.
   *
   * @deprecated 16.3, use componentDidMount or the constructor instead; will stop working in React 17
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  componentWillMount?(): void;
  /**
   * Called immediately before mounting occurs, and before `Component#render`.
   * Avoid introducing any side-effects or subscriptions in this method.
   *
   * This method will not stop working in React 17.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
   * prevents this from being invoked.
   *
   * @deprecated 16.3, use componentDidMount or the constructor instead
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  UNSAFE_componentWillMount?(): void;
  /**
   * Called when the component may be receiving new props.
   * React may call this even if props have not changed, so be sure to compare new and existing
   * props if you only want to handle changes.
   *
   * Calling `Component#setState` generally does not trigger this method.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
   * prevents this from being invoked.
   *
   * @deprecated 16.3, use static getDerivedStateFromProps instead; will stop working in React 17
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
  /**
   * Called when the component may be receiving new props.
   * React may call this even if props have not changed, so be sure to compare new and existing
   * props if you only want to handle changes.
   *
   * Calling `Component#setState` generally does not trigger this method.
   *
   * This method will not stop working in React 17.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
   * prevents this from being invoked.
   *
   * @deprecated 16.3, use static getDerivedStateFromProps instead
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
  /**
   * Called immediately before rendering when new props or state is received. Not called for the initial render.
   *
   * Note: You cannot call `Component#setState` here.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
   * prevents this from being invoked.
   *
   * @deprecated 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
  /**
   * Called immediately before rendering when new props or state is received. Not called for the initial render.
   *
   * Note: You cannot call `Component#setState` here.
   *
   * This method will not stop working in React 17.
   *
   * Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
   * prevents this from being invoked.
   *
   * @deprecated 16.3, use getSnapshotBeforeUpdate instead
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update
   * @see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path
   */
  UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
}

interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }

type JSXElementConstructor<P> =
  | ((props: P) => ReactElement<any, any> | null)
  | (new (props: P) => Component<any, any>);

export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
  type: T;
  props: P;
  key: Key | null;
}

export type ReactNode =
  | ReactElement<any>
  | ReactPortal
  | ReactText
  | ReactFragment
  | ReactProvider<any>
  | ReactConsumer<any>;

export type ReactEmpty = null | void | boolean;

export type ReactFragment = ReactEmpty | Iterable<ReactNode>;

export type ReactNodeList = ReactEmpty | ReactNode;

export type ReactText = string | number;

export type ReactProvider<T> = {
  $$typeof: Symbol | number,
  type: ReactProviderType<T>,
  key: null | string,
  ref: null,
  props: {
    value: T,
    children?: ReactNodeList,

  },

};

export type ReactProviderType<T> = {
  $$typeof: Symbol | number,
  _context: ReactContext<T>,

};

export type ReactConsumer<T> = {
  $$typeof: Symbol | number,
  type: ReactContext<T>,
  key: null | string,
  ref: null,
  props: {
    children: (value: T) => ReactNodeList,
  },
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

export type ServerContextJSONValue =
  | string
  | boolean
  | number
  | null
  | ReadonlyArray<ServerContextJSONValue>
  | {[key: string]: ServerContextJSONValue};

export type ReactServerContext<T extends any> = ReactContext<T>;

export type ReactPortal = {
  $$typeof: Symbol | number,
  key: null | string,
  containerInfo: any,
  children: ReactNodeList,
  // TODO: figure out the API for cross-renderer implementation.
  implementation: any,
};

export type RefObject = {
  current: any,
};

export type ReactScope = {
  $$typeof: Symbol | number,
};

export type ReactScopeQuery = (
  type: string,
  props: { [property: string]: unknown },
  instance: unknown,
) => boolean;

export type ReactScopeInstance = {
  DO_NOT_USE_queryAllNodes(ReactScopeQuery): null | Array<Object>,
  DO_NOT_USE_queryFirstNode(ReactScopeQuery): null | Object,
  containsNode(Object): boolean,
  getChildContextValues: <T>(context: ReactContext<T>) => Array<T>,
};

// Mutable source version can be anything (e.g. number, string, immutable data structure)
// so long as it changes every time any part of the source changes.
export type MutableSourceVersion = NonNullable<unknown>;

export type MutableSourceGetSnapshotFn<
  Source extends NonNullable<unknown>,
  Snapshot,
  > = (source: Source) => Snapshot;

export type MutableSourceSubscribeFn<Source extends NonNullable<unknown>, Snapshot> = (
  source: Source,
  callback: (snapshot: Snapshot) => void,
) => () => void;

export type MutableSourceGetVersionFn = (
  source: NonNullable<unknown>,
) => MutableSourceVersion;

export type MutableSource<Source extends NonNullable<unknown>> = {
  _source: Source,

  _getVersion: MutableSourceGetVersionFn,

  // Tracks the version of this source at the time it was most recently read.
  // Used to determine if a source is safe to read from before it has been subscribed to.
  // Version number is only used during mount,
  // since the mechanism for determining safety after subscription is expiration time.
  //
  // As a workaround to support multiple concurrent renderers,
  // we categorize some renderers as primary and others as secondary.
  // We only expect there to be two concurrent renderers at most:
  // React Native (primary) and Fabric (secondary);
  // React DOM (primary) and React ART (secondary).
  // Secondary renderers store their context values on separate fields.
  // We use the same approach for Context.
  _workInProgressVersionPrimary: null | MutableSourceVersion,
  _workInProgressVersionSecondary: null | MutableSourceVersion,

  // DEV only
  // Used to detect multiple renderers using the same mutable source.
  _currentPrimaryRenderer?: Object | null,
  _currentSecondaryRenderer?: Object | null,

  // DEV only
  // Used to detect side effects that update a mutable source during render.
  // See https://github.com/facebook/react/issues/19948
  _currentlyRenderingFiber?: Fiber | null,
  _initialVersionAsOfFirstRender?: MutableSourceVersion | null,
};

// The subset of a Thenable required by things thrown by Suspense.
// This doesn't require a value to be passed to either handler.
export interface Wakeable {
  then(onFulfill: () => unknown, onReject: () => unknown): void | Wakeable;
}

// The subset of a Promise that React APIs rely on. This resolves a value.
// This doesn't require a return value neither from the handler nor the
// then function.
export interface Thenable<R> {
  then<U>(
    onFulfill: (value: R) => void | Thenable<U> | U,
    onReject: (error: unknown) => void | Thenable<U> | U,
  ): void | Thenable<U>;
}

export type OffscreenMode =
  | 'hidden'
  | 'unstable-defer-without-hiding'
  | 'visible';

export type StartTransitionOptions = {
  name?: string,
};
