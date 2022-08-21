import { useEffect, useState } from 'react'

function OrderDemo() {
  const [counter, setCounter] = useState<number>(0)

  useEffect(() => {
    console.info('parent...')
  })

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(count => count + 1)}>Add</button>
      <Child />
    </>
  )
}

function Child() {
  useEffect(() => {
    console.info('child...')
  })

  return (
    <div>Child</div>
  )
}

interface ComposeProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = any,
  R = React.JSXElementConstructor<React.PropsWithChildren<T>>,
  > {
  components: Array<[R, T] | [R]>;
  children: React.ReactNode;
}

const Compose = ({ components, children }: ComposeProps) => (
  <>
    {components.reduceRight(
      (acc, [Comp, props]) => (
        <Comp {...props}>{acc}</Comp>
      ),
      children,
    )}
  </>
);

// <Compose
//     components={[
//       [QueryClientProvider, { client: queryClient }],
//       [ThemeProvider, { theme: themeOptions }],
//       [HelmetProvider],
//       [ReduxProvider, { store }],
//       [isElectron ? HashRouter : BrowserRouter],
//     ]}
//   > 

export { Compose };


export default OrderDemo