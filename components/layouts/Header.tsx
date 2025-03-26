import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import jwt from 'jsonwebtoken';

const Header: React.FC = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [notifications, setNotifications] = useState(3);
    const [user, setUser] = useState<{ username?: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwt.decode(token) as { username?: string };
                setUser(decoded);
            } catch (error) {
                console.error('Invalid token:', error);
                setUser(null);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
            <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition">
                Shamiri Personal Journal
            </Link>
            <div className="flex items-center space-x-6">
                <button className="relative">
                    <FaBell className="text-2xl text-white hover:text-gray-200 transition" />
                    {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                            {notifications}
                        </span>
                    )}
                </button>
                <div className="relative">
                    <button
                        className="flex items-center space-x-2 text-white hover:text-gray-200 transition"
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                    >
                        <FaUserCircle className="text-2xl" />
                        <span>{user?.username || 'Guest'}</span>
                    </button>
                    {dropdownVisible && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <ul className="py-2">
                                <li>
                                    <Link
                                        href="/user/profile"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/user/reset-password"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        Reset Password
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
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
    );
};

export default Header;