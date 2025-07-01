import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import RecentPatients from './components/RecentPatients';
import AppointmentSchedule from './components/AppointmentSchedule';
import QuickActions from './components/QuickActions';
import MedicalChart from './components/MedicalChart';
import PatientManagement from './components/PatientManagement';
import AppointmentManagement from './components/AppointmentManagement';
import MedicalRecords from './components/MedicalRecords';
import Analytics from './components/Analytics';
import DiagnosisSupport from './components/DiagnosisSupport';
import MessagesNotifications from './components/MessagesNotifications';
import { Users, Calendar, FileText, Activity, Heart, AlertCircle } from 'lucide-react';

// Import data
import dashboardData from './data/dashboard.json';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboardContent = () => {
    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Tổng Bệnh Nhân"
            value={dashboardData.overview.stats.totalPatients.toString()}
            change={`${dashboardData.overview.stats.monthlyGrowth.patients}%`}
            changeType="increase"
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Lịch Hẹn Hôm Nay"
            value={dashboardData.overview.stats.todayAppointments.toString()}
            change={`${dashboardData.overview.stats.monthlyGrowth.appointments}%`}
            changeType="increase"
            icon={Calendar}
            color="green"
          />
          <StatsCard
            title="Hồ Sơ Mới"
            value={dashboardData.overview.stats.newRecords.toString()}
            change={`${dashboardData.overview.stats.monthlyGrowth.records}%`}
            changeType="increase"
            icon={FileText}
            color="orange"
          />
          <StatsCard
            title="Trường Hợp Khẩn Cấp"
            value={dashboardData.overview.stats.emergencyCases.toString()}
            change={`${Math.abs(dashboardData.overview.stats.monthlyGrowth.emergency)}%`}
            changeType="decrease"
            icon={AlertCircle}
            color="red"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <MedicalChart />
            <RecentPatients />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <QuickActions />
            <AppointmentSchedule />
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'records':
        return <MedicalRecords />;
      case 'analytics':
        return <Analytics />;
      case 'diagnosis':
        return <DiagnosisSupport />;
      case 'messages':
        return <MessagesNotifications />;
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="ml-64">
        <Header />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;