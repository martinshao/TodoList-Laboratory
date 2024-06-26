import { createContext, ReactElement, useContext } from 'react';

interface FilterContextInterface {
  filter: number;
}

const FilterContext = createContext<FilterContextInterface | undefined>(
  undefined
);

FilterContext.displayName = 'FILTER_CONTEXT';

interface FilterProviderProps {
  children: ReactElement;
  value: any;
}

function FilterProvider(props: FilterProviderProps) {
  return (
    <FilterContext.Provider value={props.value}>
      {props.children}
    </FilterContext.Provider>
  );
}

function useFilterContext(): FilterContextInterface {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useCounterContext must be used within a FilterProvider.');
  }
  return context;
}

export { FilterProvider, useFilterContext };
