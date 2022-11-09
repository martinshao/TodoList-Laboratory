import { useState } from 'react';
import { useDebounce } from 'ahooks';

/**
 * usage: ahooks useDebounce
 * @returns
 */
export default function UseDebounceDemo() {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });

  return (
    <div>
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder='Typed value'
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
}
