import ImportIcon from '../../assets/toolbar/import.svg';
import ExportIcon from '../../assets/toolbar/export.svg';
import ShareIcon from '../../assets/toolbar/share.svg';
import ArrowSplitIcon from '../../assets/toolbar/arrow-split.svg';

const ToolbarRight = () => {
  return (
    <div className="flex items-center gap-2 text-[#545454] text-sm">
      <button className="flex p-2 pr-3  border border-[#EEEEEE] items-center gap-1 rounded-[6px]">
        <img src={ImportIcon} alt="Import" className="w-4 h-4" />
        Import
      </button>
      <button className="flex p-2 pr-3 border border-[#EEEEEE] items-center gap-1 rounded-[6px]">
        <img src={ExportIcon} alt="Export" className="w-4 h-4" />
        Export
      </button>
      <button className="flex p-2 pr-3 border border-[#EEEEEE] items-center gap-1 rounded-[6px]">
        <img src={ShareIcon} alt="Share" className="w-4 h-4" />
        Share
      </button>
      <button className="bg-primary text-white rounded-[6px] px-6 py-2 font-medium  flex items-center gap-1">
        <img src={ArrowSplitIcon} alt="New Action" className="w-5 h-5" />
        New Action
      </button>
    </div>
  );
};

export default ToolbarRight;
