import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, Phone, Mail, Calendar, User, Filter } from 'lucide-react';
import patientsData from '../data/patients.json';

const PatientManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredPatients = patientsData.patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'follow-up': return 'bg-orange-100 text-orange-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang điều trị';
      case 'follow-up': return 'Tái khám';
      case 'inactive': return 'Không hoạt động';
      default: return 'Khác';
    }
  };

  const openPatientDetail = (patient: any) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Quản Lý Bệnh Nhân</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Thêm bệnh nhân</span>
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang điều trị</option>
              <option value="follow-up">Tái khám</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Bệnh nhân</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Thông tin liên hệ</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Lần khám cuối</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Trạng thái</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-800">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">{patient.name}</h4>
                        <p className="text-sm text-gray-600">{patient.age} tuổi • {patient.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-2" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-2" />
                        {patient.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-3 w-3 mr-2" />
                      {new Date(patient.lastVisit).toLocaleDateString('vi-VN')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {getStatusText(patient.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openPatientDetail(patient)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail Modal */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Chi tiết bệnh nhân</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedPatient.avatar}
                  alt={selectedPatient.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{selectedPatient.name}</h4>
                  <p className="text-gray-600">{selectedPatient.age} tuổi • {selectedPatient.gender}</p>
                  <p className="text-sm text-gray-500">Nhóm máu: {selectedPatient.bloodType}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Thông tin liên hệ</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Điện thoại:</strong> {selectedPatient.phone}</p>
                    <p><strong>Email:</strong> {selectedPatient.email}</p>
                    <p><strong>Địa chỉ:</strong> {selectedPatient.address}</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Liên hệ khẩn cấp</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Tên:</strong> {selectedPatient.emergencyContact.name}</p>
                    <p><strong>Quan hệ:</strong> {selectedPatient.emergencyContact.relationship}</p>
                    <p><strong>Điện thoại:</strong> {selectedPatient.emergencyContact.phone}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Dị ứng</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.allergies.map((allergy: string, index: number) => (
                    <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Lịch sử khám bệnh</h5>
                <div className="space-y-3">
                  {selectedPatient.medicalHistory.map((record: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h6 className="font-medium text-gray-800">{record.condition}</h6>
                        <span className="text-xs text-gray-500">{new Date(record.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1"><strong>Chẩn đoán:</strong> {record.diagnosis}</p>
                      <p className="text-sm text-gray-600 mb-1"><strong>Điều trị:</strong> {record.treatment}</p>
                      <p className="text-sm text-gray-500"><strong>Bác sĩ:</strong> {record.doctor}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;