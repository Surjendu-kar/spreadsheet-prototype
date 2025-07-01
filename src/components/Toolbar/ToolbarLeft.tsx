import ChevronIcon from '../../assets/toolbar/chevron.svg';
import HideFieldsIcon from '../../assets/toolbar/hide-fields.svg';
import SortIcon from '../../assets/toolbar/sort.svg';
import FilterIcon from '../../assets/toolbar/filter.svg';
import CellViewIcon from '../../assets/toolbar/cell-view.svg';

const ToolbarLeft = () => {
  return (
    <div className="flex items-center gap-1 text-text text-sm">
      <span className="flex items-center gap-1 p-2 pl-0">
        Tool bar
        <img src={ChevronIcon} alt="Chevron" className="w-4 h-4" />
      </span>

      <span className="h-6 w-px bg-[#EEEEEE] mx-1" />

      <span className="flex items-center gap-1 p-2 pr-3">
        <img src={HideFieldsIcon} alt="Hide fields" className="w-4 h-4" />
        Hide fields
      </span>

      <span className="flex items-center gap-1 p-2 pr-3">
        <img src={SortIcon} alt="Sort" className="w-4 h-4" />
        Sort
      </span>

      <span className="flex items-center gap-1 p-2 pr-3">
        <img src={FilterIcon} alt="Filter" className="w-4 h-4" />
        Filter
      </span>

      <span className="flex items-center gap-1">
        <img src={CellViewIcon} alt="Cell view" className="w-4 h-4" />
        Cell view
      </span>
    </div>
  );
};

export default ToolbarLeft;
