// pages/admin/dashboard.tsx
import React from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';

const Dashboard: React.FC = () => {
    
  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold">Dashboard Overview</h2>
      <p>Welcome to the admin dashboard!</p>
      {/* Add more dashboard content here */}
    </AdminLayout>
  );
};

export default Dashboard;