import React from 'react';
import { Plus, FileText, Users, Calendar, Stethoscope, Pill } from 'lucide-react';
import dashboardData from '../data/dashboard.json';

const QuickActions: React.FC = () => {
  const actions = dashboardData.overview.quickActions;

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Plus,
      Pill,
      Calendar,
      FileText
    };
    return icons[iconName] || Plus;
  };

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      orange: 'bg-orange-500 hover:bg-orange-600',
      purple: 'bg-purple-500 hover:bg-purple-600'
    };
    return colors[color] || 'bg-blue-500 hover:bg-blue-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Thao Tác Nhanh</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const IconComponent = getIconComponent(action.icon);
          return (
            <button
              key={action.id}
              className={`${getColorClass(action.color)} text-white p-4 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105`}
            >
              <div className="flex flex-col items-center space-y-2">
                <IconComponent className="h-6 w-6" />
                <span className="font-medium text-sm">{action.label}</span>
                <span className="text-xs opacity-90 text-center">{action.description}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;