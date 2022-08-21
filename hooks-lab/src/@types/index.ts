import { Attributes, ReactElement, WeakValidationMap } from "./component";


export interface RefObject<T> {
  readonly current: T | null;
}

export interface MutableRefObject<T> {
  current: T;
}

export type RefCallback<T> = { bivarianceHack(instance: T | null): void }["bivarianceHack"];

export type Ref<T> = RefCallback<T> | RefObject<T> | null;

export interface RefAttributes<T> extends Attributes {
  ref?: Ref<T> | undefined;
}

export type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;


export interface ForwardRefRenderFunction<T, P = {}> {
  (props: P, ref: ForwardedRef<T>): ReactElement | null;
  displayName?: string | undefined;
  defaultProps?: never | undefined;
  propTypes?: never | undefined;
}

export type PropsWithoutRef<P> =
  P extends any ? ('ref' extends keyof P ? Pick<P, Exclude<keyof P, 'ref'>> : P) : P;

export interface ExoticComponent<P = {}> {
  (props: P): (ReactElement | null);
  readonly $$typeof: symbol;
}
export interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
  displayName?: string | undefined;
}

export interface ForwardRefExoticComponent<P> extends NamedExoticComponent<P> {
  defaultProps?: Partial<P> | undefined;
  propTypes?: WeakValidationMap<P> | undefined;
}

// export function forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;

// export function forwardRef<Props, ElementType: React$ElementType>(
//   render: (props: Props, ref: React$Ref<ElementType>) => React$Node,
// ) {

//   const elementType = {
//     $$typeof: REACT_FORWARD_REF_TYPE,
//     render,
//   };
//   return elementType;
// }
