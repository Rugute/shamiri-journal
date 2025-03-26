// pages/admin/dashboard.tsx
import React from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';

const Dashboard: React.FC = () => {
    
  return (
    <AdminLayout>
      <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
      <p className="text-gray-600">Welcome to the admin dashboard! Here you can manage your application.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-blue-800">Users</h3>
        <p className="text-blue-700">Manage user accounts and permissions.</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-green-800">Reports</h3>
        <p className="text-green-700">View and analyze reports.</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-yellow-800">Settings</h3>
        <p className="text-yellow-700">Configure application settings.</p>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;