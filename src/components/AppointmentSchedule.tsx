import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const AppointmentSchedule: React.FC = () => {
  const appointments = [
    {
      id: 1,
      time: '09:00',
      patient: 'Nguyễn Văn An',
      type: 'Khám tổng quát',
      duration: '30 phút',
      priority: 'normal'
    },
    {
      id: 2,
      time: '10:30',
      patient: 'Trần Thị Bình',
      type: 'Tái khám',
      duration: '20 phút',
      priority: 'high'
    },
    {
      id: 3,
      time: '11:00',
      patient: 'Lê Văn Cường',
      type: 'Xét nghiệm',
      duration: '15 phút',
      priority: 'normal'
    },
    {
      id: 4,
      time: '14:00',
      patient: 'Phạm Thị Dung',
      type: 'Chẩn đoán hình ảnh',
      duration: '45 phút',
      priority: 'urgent'
    },
    {
      id: 5,
      time: '15:30',
      patient: 'Hoàng Văn Em',
      type: 'Tư vấn điều trị',
      duration: '30 phút',
      priority: 'normal'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'normal': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Lịch Hẹn Hôm Nay</h3>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{new Date().toLocaleDateString('vi-VN')}</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {appointments.map((appointment) => (
          <div key={appointment.id} 
               className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(appointment.priority)} hover:shadow-sm transition-shadow`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{appointment.time}</h4>
                  <p className="text-sm text-gray-600">{appointment.duration}</p>
                </div>
              </div>
              <div className="text-right">
                <h4 className="font-medium text-gray-800">{appointment.patient}</h4>
                <p className="text-sm text-gray-600">{appointment.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full py-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
          Xem lịch đầy đủ →
        </button>
      </div>
    </div>
  );
};

export default AppointmentSchedule;