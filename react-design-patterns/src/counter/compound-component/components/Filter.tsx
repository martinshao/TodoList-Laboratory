// import { memo } from 'react';
import { useFilterContext } from '../useFilterContext';

function Filter() {
  console.info('Filter rendering...');
  const { filter } = useFilterContext();
  return <div>{filter}</div>;
}

export default Filter;
