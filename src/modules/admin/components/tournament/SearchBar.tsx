import type React from "react"
import { FiSearch } from "react-icons/fi"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative flex-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FiSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 pl-10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
