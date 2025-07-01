import BreadcrumbNav from './BreadcrumbNav';
import NotificationIcon from './NotificationIcon';
import SearchBar from './SearchBar';
import UserAvatars from './UserAvatars';

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 border-b-2 border-b-[#EEEEEE] bg-white">
      <BreadcrumbNav />

      <div className="flex justify-center items-center gap-1">
        <SearchBar />
        <NotificationIcon count={2} />
        <UserAvatars />
      </div>
    </header>
  );
};

export default Header;
