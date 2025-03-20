// components/AdminLayout.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import router from 'next/router';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const [user, setUser] = useState<{ username?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the JWT from local storage
    if (token) {
      try {
        const decoded = jwt.decode(token) as { username?: string }; // Decode the JWT
        setUser(decoded); // Set the user data
      } catch (error) {
        console.error('Invalid token:', error);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT
    router.push('/login');
  };

  return (
    <div>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex flex-1">
          <aside className="w-64 bg-blue-900 text-white hidden md:flex flex-col">
            <div className="p-6 text-xl font-bold border-b border-blue-700">Admin Menu</div>
            <nav className="flex-1">
              <ul className="space-y-2">
                <li>
                  <Link href="/admin/dashboard" className="block px-6 py-3 hover:bg-blue-800 rounded-md">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin/users" className="block px-6 py-3 hover:bg-blue-800 rounded-md">
                    Manage Users
                  </Link>
                </li>
                <li>
                  <Link href="/user/journals" className="bblock px-6 py-3 hover:bg-blue-800 rounded-md">
                    Journals 
                  </Link>
                </li>
                <li>
                  <Link href="/admin/settings" className="block px-6 py-3 hover:bg-blue-800 rounded-md">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link href="/admin/reports" className="block px-6 py-3 hover:bg-blue-800 rounded-md">
                    Reports
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-6 border-t border-blue-700">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Logout
              </button>
            </div>
          </aside>
          <div className="flex-1 p-6">
            <header className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">User Dashboard</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="relative">
                    <FaBell className="text-2xl text-gray-600 hover:text-gray-800" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                  >
                    <FaUserCircle className="text-2xl text-gray-600 hover:text-gray-800" />
                    <span className="text-gray-700">{user?.username || 'Guest'}</span>
                  </button>
                  {dropdownVisible && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                      <ul className="py-2">
                        <li>
                          <Link href="/user/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            View Profile
                          </Link>
                        </li>
                      
                        <li>
                          <Link href="/user/reset-password" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Reset Password
                          </Link>
                        </li>
                        <li>
                          <button
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </header>
            <main className="bg-white rounded-lg shadow p-4">
              {children}
            </main>
          </div>
        </div>
        <footer className="bg-gray-200 text-center py-4">
          <p className="text-gray-600">© {new Date().getFullYear()} Shamiri Personal Journal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;