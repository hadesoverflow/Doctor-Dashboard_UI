import React, { useState } from 'react';
import { Search, FileText, Download, Eye, Plus, Calendar, User, Pill } from 'lucide-react';
import recordsData from '../data/records.json';

const MedicalRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'records' | 'prescriptions'>('records');

  const filteredRecords = recordsData.medicalRecords.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openRecordDetail = (record: any) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Hồ Sơ Bệnh Án</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Tạo hồ sơ mới</span>
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên bệnh nhân hoặc chẩn đoán..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('records')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'records'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Hồ sơ bệnh án
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'prescriptions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Đơn thuốc
            </button>
          </nav>
        </div>

        {/* Medical Records Tab */}
        {activeTab === 'records' && (
          <div className="p-6">
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{record.patientName}</h4>
                        <p className="text-sm text-gray-600">{record.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString('vi-VN')}
                      </span>
                      <button
                        onClick={() => openRecordDetail(record)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Chẩn đoán:</span>
                      <p className="text-gray-600">{record.diagnosis}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Điều trị:</span>
                      <p className="text-gray-600">{record.treatment}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Bác sĩ:</span>
                      <p className="text-gray-600">{record.doctor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="p-6">
            <div className="space-y-4">
              {recordsData.prescriptions.map((prescription) => (
                <div key={prescription.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Pill className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{prescription.patientName}</h4>
                        <p className="text-sm text-gray-600">Đơn thuốc #{prescription.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {new Date(prescription.date).toLocaleDateString('vi-VN')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        prescription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {prescription.status === 'active' ? 'Đang dùng' : 'Đã hết'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {prescription.medications.map((med, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-gray-800">{med.name}</h5>
                            <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                            <p className="text-xs text-gray-500">{med.instructions}</p>
                          </div>
                          <span className="text-sm text-blue-600">{med.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Record Detail Modal */}
      {showModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Chi tiết hồ sơ bệnh án</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Patient Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Thông tin bệnh nhân</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Tên:</strong> {selectedRecord.patientName}</div>
                  <div><strong>Ngày khám:</strong> {new Date(selectedRecord.date).toLocaleDateString('vi-VN')}</div>
                  <div><strong>Loại khám:</strong> {selectedRecord.type}</div>
                  <div><strong>Bác sĩ:</strong> {selectedRecord.doctor}</div>
                </div>
              </div>

              {/* Vital Signs */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Chỉ số sinh hiệu</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Huyết áp</p>
                    <p className="font-semibold text-gray-800">{selectedRecord.vitalSigns.bloodPressure}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Nhịp tim</p>
                    <p className="font-semibold text-gray-800">{selectedRecord.vitalSigns.heartRate} bpm</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Nhiệt độ</p>
                    <p className="font-semibold text-gray-800">{selectedRecord.vitalSigns.temperature}°C</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Cân nặng</p>
                    <p className="font-semibold text-gray-800">{selectedRecord.vitalSigns.weight} kg</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Chiều cao</p>
                    <p className="font-semibold text-gray-800">{selectedRecord.vitalSigns.height} cm</p>
                  </div>
                </div>
              </div>

              {/* Symptoms & Diagnosis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Triệu chứng</h4>
                  <ul className="space-y-1">
                    {selectedRecord.symptoms.map((symptom: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600">• {symptom}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Chẩn đoán</h4>
                  <p className="text-sm text-gray-600">{selectedRecord.diagnosis}</p>
                </div>
              </div>

              {/* Treatment & Medications */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Điều trị và thuốc</h4>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700"><strong>Phương pháp điều trị:</strong> {selectedRecord.treatment}</p>
                </div>
                <div className="space-y-2">
                  {selectedRecord.medications.map((med: any, index: number) => (
                    <div key={index} className="border border-gray-200 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-800">{med.name}</h5>
                          <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                        </div>
                        <span className="text-sm text-blue-600">{med.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Results */}
              {selectedRecord.labResults && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Kết quả xét nghiệm</h4>
                  <div className="space-y-2">
                    {selectedRecord.labResults.map((lab: any, index: number) => (
                      <div key={index} className="bg-yellow-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium text-gray-800">{lab.test}</h5>
                            <p className="text-sm text-gray-600">{lab.result}</p>
                          </div>
                          <span className="text-sm text-gray-500">{new Date(lab.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-up */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Tái khám</h4>
                <p className="text-sm text-gray-700">Lịch tái khám: {selectedRecord.followUp}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;