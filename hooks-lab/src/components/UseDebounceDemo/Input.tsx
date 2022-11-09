import React, { ChangeEvent, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

// 
export default function Input() {
  const [inputValue, setInputValue] = useState('');

  const sendQuery = (query: string) => {
    // Call API with query parameter here
    console.log(query);
  };

  // Delay search by 600ms
  const delayedSearch = useMemo(() => debounce((q) => sendQuery(q), 600), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Input will be changed immidiately
    setInputValue(event.target.value);

    // Search will only be called when user stops typing
    delayedSearch(event.target.value);
  };

  return <input value={inputValue} onChange={handleChange} />;
}
