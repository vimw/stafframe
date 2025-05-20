import React, { useEffect, useState } from 'react'
import { Input } from 'antd';

interface Props {
  onSearch: (searchTerm: string) => void;
}

const SearchTaskInput = ({onSearch} : Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>(searchValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);
  
  return (
    <Input
      placeholder='Search tasks...'
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      />
  )
}

export default SearchTaskInput