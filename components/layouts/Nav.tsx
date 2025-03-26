import Link from "next/link";
import { FaTachometerAlt, FaUsers, FaBook, FaCog, FaChartBar } from "react-icons/fa";

const Nav: React.FC = () => {
    return (
        <aside className="w-64 bg-blue-900 text-white hidden md:flex flex-col shadow-lg">
            
            <nav className="flex-1">
                <ul className="space-y-2 mt-4">
                    <li>
                        <Link href="/user/dashboard" className="flex items-center px-6 py-3 hover:bg-blue-800 rounded-md transition">
                            <FaTachometerAlt className="mr-3" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                
                    <li>
                        <div className="group">
                            <Link href="/journal/entry" className="flex items-center px-6 py-3 hover:bg-blue-800 rounded-md transition">
                                <FaBook className="mr-3" />
                                <span>Journals</span>
                            </Link>
                            <ul className="hidden group-hover:block ml-8 mt-2 space-y-2">
                                <li>
                                    <Link href="/journal/category" className="flex items-center px-4 py-2 hover:bg-blue-700 rounded-md transition">
                                        <span>New Category</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/journal/entry" className="flex items-center px-4 py-2 hover:bg-blue-700 rounded-md transition">
                                        <span>Journal Entry List</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                   
                    <li>
                        <Link href="/user/reports" className="flex items-center px-6 py-3 hover:bg-blue-800 rounded-md transition">
                            <FaChartBar className="mr-3" />
                            <span>Reports</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Nav;