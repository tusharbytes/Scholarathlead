import { useState } from "react";
import { FiMenu, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ userName }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={`h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-medium transition-all duration-300 shadow-xl flex flex-col justify-between 
            ${isOpen ? "w-64 p-5" : "w-20 p-3"}`}
        >
            {/* Sidebar Header */}
            <div>
                <button
                    className="mb-6 flex items-center gap-3 text-lg font-semibold transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FiMenu className="text-2xl text-gray-300 hover:text-white transition" />
                    {isOpen && <span className="text-white">{JSON.stringify(userName || "User")}</span>}
                </button>

                {/* Navigation Links */}
                <nav className="space-y-4">
                    <ul className="text-left">
                        <Link
                            to="/profile"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 transition-all duration-300"
                        >
                            <FiUser className="text-xl" />
                            {isOpen && <span>Profile</span>}
                        </Link>
                        <Link
                            to="/forms"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 transition-all duration-300"
                        >
                            <FaInfoCircle className="text-xl" />
                            {isOpen && <span>All Forms</span>}
                        </Link>
                        <Link
                            to="/settings"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 transition-all duration-300"
                        >
                            <FiSettings className="text-xl" />
                            {isOpen && <span>Settings</span>}
                        </Link>
                    </ul>
                </nav>
            </div>

            {/* Logout Button */}
            <button
                className="px-4 py-3 flex items-center justify-center gap-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
            >
                <FiLogOut className="text-xl" />
                {isOpen && <span>Logout</span>}
            </button>
        </div>
    );
};

export default Sidebar;
