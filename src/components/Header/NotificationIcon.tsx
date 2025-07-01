import React from 'react';
import bellUrl from '../../assets/bell.svg';

interface NotificationIconProps {
  count: number;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ count }) => {
  return (
    <div className="relative">
      <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
        <img src={bellUrl} alt="Bell" className="w-5 h-5" />
        {count > 0 && (
          <span className="absolute top-0 right-0.5 flex items-center justify-center w-4 h-4 bg-primary text-white text-[8px] font-bold border-2 border-white rounded-full">
            {count}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationIcon;
