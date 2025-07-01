import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'red';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-500 bg-blue-50',
    green: 'bg-green-500 text-green-500 bg-green-50',
    orange: 'bg-orange-500 text-orange-500 bg-orange-50',
    red: 'bg-red-500 text-red-500 bg-red-50'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          <p className={`text-sm mt-2 flex items-center ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{changeType === 'increase' ? '↑' : '↓'} {change}</span>
            <span className="text-gray-500 ml-1">so với tháng trước</span>
          </p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color].split(' ')[2]}`}>
          <Icon className={`h-6 w-6 ${colorClasses[color].split(' ')[1]}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;