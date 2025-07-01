const UserAvatars = () => {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
      <img
        src="/avatar.webp"
        alt="User Avatar"
        className="w-7 h-7 rounded-full object-cover"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-medium text-text">John Doe</span>
        <span className="text-[10px] text-text-light">john.doe...</span>
      </div>
    </div>
  );
};

export default UserAvatars;
