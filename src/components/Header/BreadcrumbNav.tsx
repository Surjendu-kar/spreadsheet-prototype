const BreadcrumbNav = () => {
  return (
    <nav className="flex gap-2 items-center justify-center text-sm text-[#AFAFAF] font-medium">
      <span className="flex items-center gap-4">
        <div className="flex border-2 border-accent-green rounded-[4px] overflow-hidden h-4 w-5">
          <div className="bg-white w-[70%] h-full"></div>
          <div className="bg-accent-green w-[30%] h-full"></div>
        </div>
        <span>Workspace</span>
      </span>
      <span>&gt;</span>
      <span>Folder 2</span>
      <span>&gt;</span>
      <span className="text-gray-900 font-semibold text-text">
        Spreadsheet 3
      </span>
      <span className="flex items-center justify-center gap-1 pt-0.5 pl-2">
        <span className="w-1 h-1 bg-[#AFAFAF] rounded-full"></span>
        <span className="w-1 h-1 bg-[#AFAFAF] rounded-full"></span>
        <span className="w-1 h-1 bg-[#AFAFAF] rounded-full"></span>
      </span>
    </nav>
  );
};

export default BreadcrumbNav;
