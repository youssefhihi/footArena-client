
// DropdownMenu: A container component for the dropdown
export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

// DropdownMenuTrigger: Renders its children and toggles the menu (click handling is done in the parent)
export const DropdownMenuTrigger: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => {
  return <div onClick={onClick}>{children}</div>;
};

// DropdownMenuContent: The dropdown content that appears below the trigger
export const DropdownMenuContent: React.FC<{ children: React.ReactNode; align?: 'start' | 'end' }> = ({ children, align = 'start' }) => {
  const alignmentClass = align === 'end' ? 'right-0' : 'left-0';
  return (
    <div className={`absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${alignmentClass}`}>
      {children}
    </div>
  );
};

// DropdownMenuItem: An individual clickable item inside the dropdown
export const DropdownMenuItem: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors"
    >
      {children}
    </div>
  );
};

// Example usage in ThemeToggle:
