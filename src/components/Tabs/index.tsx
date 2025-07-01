import { useState } from 'react';
import TabButton from './TabButton';
import PlusIcon from '../../assets/tab/plus.svg';

const tabLabels = ['All Orders', 'Pending', 'Reviewed', 'Arrived'];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="fixed bottom-0 pl-8 pt-1 pr-4 pb-0 w-full bg-white border-t border-[#EEEEEE] flex items-center z-1">
      {tabLabels.map((label, idx) => (
        <TabButton
          key={label}
          label={label}
          active={activeTab === idx}
          onClick={() => setActiveTab(idx)}
        />
      ))}
      <button className="px-4 py-2 flex items-center justify-center hover:bg-gray-100 rounded-t-md">
        <img src={PlusIcon} alt="Add" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Tabs;
