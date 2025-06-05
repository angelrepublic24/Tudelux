// SearchInput.tsx
'use client';

import { FaSearch } from 'react-icons/fa';

interface Props {
  value?: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchInput = ({
  value = '',
  onChange,
  placeholder = 'Search...',
}: Props) => {
  return (
    <div className="relative w-full md:w-64">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
      />
    </div>
  );
};
