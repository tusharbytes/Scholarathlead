import { useState } from "react";
import { FiMenu, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({userName}) => {
    
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`h-screen bg-gray-600 font-bold text-2xl     text-white p-5 flex flex-col justify-between shadow-lg transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>

            {/* Sidebar Header */}
            <div>
                <button className="mb-6 flex items-center gap-3" onClick={() => setIsOpen(!isOpen)}>
                    <FiMenu className="text-xl" />
                    {isOpen && <span className="text-lg font-semibold">{JSON.stringify(userName)}</span>}
                </button>

                {/* Navigation Links */}
                <nav className="space-y-4">
                    <ul className="text-left">
                        <Link  to={"/profile"} className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-500 cursor-pointer">
                            <FiUser className="text-xl" />
                            {isOpen && <span>Profile</span>}
                        </Link >
                        <Link  className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-500 cursor-pointer">
                            <FaInfoCircle className="text-xl" />
                            {isOpen && <span>About</span>}
                        </Link >
                        <Link  className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-500 cursor-pointer">
                            <FiSettings className="text-xl" />
                            {isOpen && <span>Settings</span>}
                        </Link >
                    </ul>
                </nav>
            </div>

            {/* Logout Button */}
            <button className="px-4 py-3 flex items-center justify-center gap-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-300">
                <FiLogOut className="text-xl" />
                {isOpen && <span>Logout</span>}
            </button>
        </div>
    );
};

export default Sidebar;
