import ToolbarLeft from './ToolbarLeft';
import ToolbarRight from './ToolbarRight';


const Toolbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-1.5 bg-white border-b border-b-[#EEEEEE]">
      <ToolbarLeft />
      <ToolbarRight />
    </div>
  );
};

export default Toolbar;
