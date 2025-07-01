import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
  };

  return (
    <form onSubmit={handleSearch} className="relative ">
      <div className="flex items-center bg-[#F6F6F6] rounded-md px-3 py-3 gap-2 w-[165px] h-[40px]">
        <Search className="w-4 h-4 text-[#AFAFAF]" />
        <input
          type="text"
          placeholder="Search within sheet"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-transparent text-sm text-gray-700 placeholder-text-light placeholder:text-xs outline-none min-w-0 flex-1"
        />
      </div>
    </form>
  );
};

export default SearchBar;
