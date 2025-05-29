'use client';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface Props {
  value?: string;
  onChange: (val: string) => void;
  placeholder?: string;
  delay?: number;
}

export const SearchInput = ({
  value = '',
  onChange,
  placeholder = 'Search...',
  delay = 400,
}: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const [debouncedValue] = useDebounce(inputValue, delay);

  // Cuando cambia el valor debounced, llamamos a onChange
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="relative w-full md:w-64">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
      />
    </div>
  );
};
