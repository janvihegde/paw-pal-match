
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Heart, 
  FileText, 
  Calendar, 
  Settings 
} from 'lucide-react';

const UserSidebar = () => {
  return (
    <div className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">User Portal</h2>
      </div>
      <nav className="space-y-2">
        <SidebarItem 
          icon={<User />} 
          label="Profile" 
          to="/user/profile" 
        />
        <SidebarItem 
          icon={<Heart />} 
          label="Saved Pets" 
          to="/user/saved-pets" 
        />
        <SidebarItem 
          icon={<FileText />} 
          label="Adoption History" 
          to="/user/adoptions" 
        />
        <SidebarItem 
          icon={<Calendar />} 
          label="Applications" 
          to="/user/applications" 
        />
        <SidebarItem 
          icon={<Settings />} 
          label="Settings" 
          to="/user/settings" 
        />
      </nav>
    </div>
  );
};

const SidebarItem = ({ 
  icon, 
  label, 
  to 
}: { 
  icon: React.ReactNode, 
  label: string, 
  to: string 
}) => {
  return (
    <Link 
      to={to} 
      className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default UserSidebar;
