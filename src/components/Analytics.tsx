import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Activity, Calendar, BarChart3 } from 'lucide-react';
import analyticsData from '../data/analytics.json';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const maxRevenue = Math.max(...analyticsData.revenueChart.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Thống Kê & Báo Cáo</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="quarter">Quý này</option>
            <option value="year">Năm này</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Tổng bệnh nhân</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{analyticsData.monthlyStats.currentMonth.patients}</p>
              <p className="text-sm mt-2 flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{analyticsData.monthlyStats.growth.patients}% so với tháng trước
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Lượt khám</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{analyticsData.monthlyStats.currentMonth.appointments}</p>
              <p className="text-sm mt-2 flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{analyticsData.monthlyStats.growth.appointments}% so với tháng trước
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Doanh thu</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {formatCurrency(analyticsData.monthlyStats.currentMonth.revenue)}
              </p>
              <p className="text-sm mt-2 flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{analyticsData.monthlyStats.growth.revenue}% so với tháng trước
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50">
              <DollarSign className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Đánh giá</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{analyticsData.monthlyStats.currentMonth.satisfaction}/5</p>
              <p className="text-sm mt-2 flex items-center text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{analyticsData.monthlyStats.growth.satisfaction}% so với tháng trước
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <Activity className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Biểu đồ doanh thu</h3>
          <div className="flex items-end justify-between h-64 space-x-2">
            {analyticsData.revenueChart.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center space-y-2 flex-1">
                <div className="w-full flex flex-col items-center">
                  <div 
                    className="w-8 bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${(data.revenue / maxRevenue) * 200}px` }}
                  ></div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-800">{data.month}</p>
                  <p className="text-xs text-gray-500">{(data.revenue / 1000000).toFixed(0)}M</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disease Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống kê bệnh lý</h3>
          <div className="space-y-4">
            {analyticsData.diseaseStats.map((disease, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-gray-700">{disease.disease}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${disease.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{disease.cases}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Groups */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Phân bố độ tuổi</h3>
          <div className="space-y-4">
            {analyticsData.patientDemographics.ageGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{group.range} tuổi</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${group.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{group.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Phân bố giới tính</h3>
          <div className="space-y-6">
            {analyticsData.patientDemographics.gender.map((gender, index) => (
              <div key={index} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(gender.percentage / 100) * 351.86} 351.86`}
                      className={index === 0 ? "text-blue-500" : "text-pink-500"}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-800">{gender.percentage}%</p>
                      <p className="text-sm text-gray-600">{gender.type}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{gender.count} bệnh nhân</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;