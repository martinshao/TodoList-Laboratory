export type Key = string | number;

export interface ErrorInfo {
  componentStack: string;
}


export interface Attributes {
  key?: Key | null | undefined;
}

export interface ComponentLifecycle<P, S> {
  componentDidMount?(): void;
  componentWillUnmount?(): void;
  componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
}

export interface Component<P = {}, S = {}> extends ComponentLifecycle<P, S> { }

export type JSXElementConstructor<P> =
  | ((props: P) => ReactElement<any, any> | null)
  | (new (props: P) => Component<any, any>);

export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
  type: T;
  props: P;
  key: Key | null;
}

export const nominalTypeHack: unique symbol = Symbol();

export interface IValidator<T> {
  (props: { [key: string]: any }, propName: string, componentName: string, location: string, propFullName: string): Error | null;
  [nominalTypeHack]?: {
      type: T;
  } | undefined;
}

type Validator<T> = IValidator<T>;
export type WeakValidationMap<T> = {
  [K in keyof T]?: null extends T[K]
      ? Validator<T[K] | null | undefined>
      : undefined extends T[K]
      ? Validator<T[K] | null | undefined>
      : Validator<T[K]>
};