import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Check, X, Phone, User, AlertCircle } from 'lucide-react';
import appointmentsData from '../data/appointments.json';

const AppointmentManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'normal': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'waiting': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận';
      case 'waiting': return 'Chờ khám';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Quản Lý Lịch Hẹn</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Đặt lịch mới</span>
          </button>
        </div>
        
        {/* Date and View Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'day' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Ngày
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'week' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Tuần
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Khẩn cấp</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Ưu tiên cao</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Bình thường</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Lịch hẹn hôm nay ({new Date(selectedDate).toLocaleDateString('vi-VN')})
            </h3>
            <div className="space-y-4">
              {appointmentsData.todayAppointments.map((appointment) => (
                <div key={appointment.id} 
                     className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(appointment.priority)} hover:shadow-sm transition-shadow`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{appointment.time}</h4>
                        <p className="text-sm text-gray-600">{appointment.duration} phút</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{appointment.patient.name}</h4>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {appointment.notes && (
                    <p className="text-sm text-gray-600 bg-white p-2 rounded">
                      <strong>Ghi chú:</strong> {appointment.notes}
                    </p>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Phone className="h-3 w-3 mr-1" />
                    <span>{appointment.patient.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Khung giờ trống</h3>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => {
                const isBooked = appointmentsData.todayAppointments.some(apt => apt.time === time);
                return (
                  <button
                    key={time}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      isBooked 
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                    }`}
                    disabled={isBooked}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tổng quan tuần</h3>
            <div className="space-y-3">
              {appointmentsData.weeklySchedule.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">{day.dayOfWeek}</h4>
                    <p className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{day.appointments} lịch hẹn</p>
                    <p className="text-sm text-green-600">{day.availableSlots} slot trống</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;