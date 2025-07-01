import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';
import dashboardData from '../data/dashboard.json';

const MedicalChart: React.FC = () => {
  const weeklyData = dashboardData.overview.weeklyChart;
  const maxPatients = Math.max(...weeklyData.map(d => d.patients));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Thống Kê Tuần</h3>
          <p className="text-sm text-gray-600">Số lượng bệnh nhân, tư vấn và doanh thu</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Bệnh nhân</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Tư vấn</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Doanh thu</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-end justify-between h-48 space-x-2">
        {weeklyData.map((data, index) => (
          <div key={data.day} className="flex flex-col items-center space-y-2 flex-1">
            <div className="w-full flex flex-col items-center space-y-1">
              <div 
                className="w-6 bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${(data.patients / maxPatients) * 120}px` }}
              ></div>
              <div 
                className="w-6 bg-green-500 rounded-t-sm transition-all duration-300 hover:bg-green-600"
                style={{ height: `${(data.consultations / maxPatients) * 120}px` }}
              ></div>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-gray-800">{data.day}</p>
              <p className="text-xs text-gray-500">{data.patients}</p>
              <p className="text-xs text-orange-600">{(data.revenue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">+12% so với tuần trước</span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Tổng doanh thu tuần</p>
          <p className="font-semibold text-gray-800">
            {formatCurrency(weeklyData.reduce((sum, day) => sum + day.revenue, 0))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalChart;