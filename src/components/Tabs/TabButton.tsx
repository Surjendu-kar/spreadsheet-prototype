import React from 'react';

interface TabButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      className={`px-4 py-2.5 text-sm font-medium  focus:outline-none transition-colors duration-150 ${active ? 'bg-lighter-green text-[#3E5741] border-t-2 border-t-[#4B6A4F] font-semibold' : 'bg-white text-text-light hover:bg-gray-100'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
