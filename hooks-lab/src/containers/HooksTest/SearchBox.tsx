import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce2';

function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (!debouncedKeyword) return;

    console.log('发起搜索请求：', debouncedKeyword);
  }, [debouncedKeyword]);

  return (
    <>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='请输入关键词'
      />
      <span>{debouncedKeyword}</span>
    </>
  );
}

export default SearchBox;
