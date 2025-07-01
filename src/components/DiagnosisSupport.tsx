import React, { useState } from 'react';
import { Search, AlertTriangle, FileText, Calculator, Brain, Stethoscope, Activity } from 'lucide-react';
import diagnosisData from '../data/diagnosis.json';

const DiagnosisSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tools' | 'common' | 'recent'>('tools');
  const [searchSymptom, setSearchSymptom] = useState('');

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Search,
      AlertTriangle,
      FileText,
      Calculator
    };
    return icons[iconName] || Search;
  };

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      orange: 'bg-orange-500 hover:bg-orange-600',
      green: 'bg-green-500 hover:bg-green-600',
      purple: 'bg-purple-500 hover:bg-purple-600'
    };
    return colors[color] || 'bg-blue-500 hover:bg-blue-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Hỗ Trợ Chẩn Đoán</h2>
              <p className="text-gray-600">Công cụ hỗ trợ quyết định lâm sàng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('tools')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tools'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Công cụ chẩn đoán
            </button>
            <button
              onClick={() => setActiveTab('common')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'common'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Chẩn đoán thường gặp
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'recent'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Chẩn đoán gần đây
            </button>
          </nav>
        </div>

        {/* Diagnosis Tools Tab */}
        {activeTab === 'tools' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {diagnosisData.diagnosisTools.map((tool) => {
                const IconComponent = getIconComponent(tool.icon);
                return (
                  <button
                    key={tool.id}
                    className={`${getColorClass(tool.color)} text-white p-6 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105`}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <IconComponent className="h-8 w-8" />
                      <h3 className="font-semibold text-lg">{tool.name}</h3>
                      <p className="text-sm opacity-90 text-center">{tool.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Symptom Checker */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                Kiểm tra triệu chứng nhanh
              </h3>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Nhập triệu chứng (ví dụ: đau đầu, sốt, ho...)"
                    value={searchSymptom}
                    onChange={(e) => setSearchSymptom(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
                  Phân tích
                </button>
              </div>
              {searchSymptom && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600">
                    Đang phân tích triệu chứng: <strong>{searchSymptom}</strong>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Kết quả sẽ hiển thị các chẩn đoán có thể và mức độ tin cậy
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Common Diagnoses Tab */}
        {activeTab === 'common' && (
          <div className="p-6">
            <div className="space-y-4">
              {diagnosisData.commonDiagnoses.map((diagnosis, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{diagnosis.name}</h4>
                      <p className="text-sm text-gray-600">Mã ICD-10: {diagnosis.icd10}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Chi tiết →
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Triệu chứng thường gặp:</h5>
                      <div className="flex flex-wrap gap-1">
                        {diagnosis.symptoms.map((symptom, idx) => (
                          <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Điều trị:</h5>
                      <p className="text-sm text-gray-600">{diagnosis.treatment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Diagnoses Tab */}
        {activeTab === 'recent' && (
          <div className="p-6">
            <div className="space-y-4">
              {diagnosisData.recentDiagnoses.map((diagnosis, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Activity className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{diagnosis.patientName}</h4>
                        <p className="text-sm text-gray-600">{diagnosis.diagnosis}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-500">Độ tin cậy:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          diagnosis.confidence >= 90 ? 'bg-green-100 text-green-800' :
                          diagnosis.confidence >= 70 ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {diagnosis.confidence}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{new Date(diagnosis.date).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisSupport;