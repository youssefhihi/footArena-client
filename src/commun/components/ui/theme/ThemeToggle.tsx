import  { useState } from 'react';
import { BiSun, BiMoon } from 'react-icons/bi';
import { useTheme } from './ThemeProvider'; // adjust path as needed

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(prev => !prev);
  const handleTheme = (theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-transparent hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-full inline-flex items-center"
      >
        <div className="relative">
          <BiSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <BiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </div>
        <span className="sr-only">Toggle theme</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => handleTheme("light")}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Light
            </button>
            <button
              onClick={() => handleTheme("dark")}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dark
            </button>
            <button
              onClick={() => handleTheme("system")}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeToggle;
