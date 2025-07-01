import React from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Stethoscope,
  MessageSquare,
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: Home },
    { id: 'patients', label: 'Bệnh nhân', icon: Users },
    { id: 'appointments', label: 'Lịch hẹn', icon: Calendar },
    { id: 'records', label: 'Hồ sơ', icon: FileText },
    { id: 'analytics', label: 'Thống kê', icon: BarChart3 },
    { id: 'diagnosis', label: 'Chẩn đoán', icon: Stethoscope },
    { id: 'messages', label: 'Tin nhắn', icon: MessageSquare },
  ];

  return (
    <div className="bg-white shadow-lg h-full w-64 fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">MediCare</h2>
            <p className="text-sm text-gray-600">Hệ thống y tế</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 hover:bg-blue-50 ${
                activeTab === item.id ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700' : 'text-gray-700'
              }`}
            >
              <Icon className={`h-5 w-5 ${activeTab === item.id ? 'text-blue-500' : 'text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings className="h-5 w-5 text-gray-500" />
          <span>Cài đặt</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2">
          <LogOut className="h-5 w-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;