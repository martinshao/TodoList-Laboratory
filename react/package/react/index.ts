type React$Key = string | number;

/**
 * Type of a React element. React elements are commonly created using JSX
 * literals, which desugar to React.createElement calls (see below).
 */
 declare type React$Element<ElementType extends React$ElementType> = {
  readonly type: ElementType,
  readonly props: React$ElementProps<ElementType>,
  readonly key: React$Key | null,
  readonly ref: any,
};

/**
 * The type of an element in React. A React element may be a:
 *
 * - String. These elements are intrinsics that depend on the React renderer
 *   implementation.
 * - React component. See `ComponentType` for more information about its
 *   different variants.
 */
 declare type React$ElementType =
 | string
 | React$AbstractComponent<empty, unknown>;
