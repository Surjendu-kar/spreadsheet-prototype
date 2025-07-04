import { useState } from 'react';
import TabButton from './TabButton';
import PlusIcon from '../../assets/tab/plus.svg';

const Tabs = () => {
  const [tabLabels, setTabLabels] = useState([
    'All Orders',
    'Pending',
    'Reviewed',
    'Arrived',
  ]);
  const [activeTab, setActiveTab] = useState(0);

  const addTab = () => {
    const newTabName = `New Tab ${tabLabels.length - 3}`;
    setTabLabels([...tabLabels, newTabName]);
    setActiveTab(tabLabels.length);
  };

  return (
    <div className="fixed bottom-0 pl-8 pt-0 pr-4 pb-0 w-full bg-white border-t border-[#EEEEEE] flex items-center z-1">
      {tabLabels.map((label, idx) => (
        <TabButton
          key={label}
          label={label}
          active={activeTab === idx}
          onClick={() => setActiveTab(idx)}
        />
      ))}
      <button
        className="px-4 py-2.5 flex items-center justify-center hover:bg-[#e2e2e257] rounded-t-md"
        onClick={addTab}
      >
        <img src={PlusIcon} alt="Add" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Tabs;
