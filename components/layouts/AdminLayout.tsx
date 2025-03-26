import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Nav />
        <main className="flex-1 p-6 bg-white rounded-lg shadow">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;