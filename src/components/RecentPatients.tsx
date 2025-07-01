import React from 'react';
import { Clock, User } from 'lucide-react';
import patientsData from '../data/patients.json';

const RecentPatients: React.FC = () => {
  const patients = patientsData.recentPatients;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'pending': return 'Chờ xử lý';
      case 'scheduled': return 'Đã lên lịch';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Bệnh Nhân Gần Đây</h3>
      <div className="space-y-4">
        {patients.map((patient) => (
          <div key={patient.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <img
              src={patient.avatar}
              alt={patient.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">{patient.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                  {getStatusText(patient.status)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{patient.condition}</p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>{patient.time}</span>
                <span className="mx-2">•</span>
                <span>{patient.age} tuổi</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
        Xem tất cả bệnh nhân →
      </button>
    </div>
  );
};

export default RecentPatients;