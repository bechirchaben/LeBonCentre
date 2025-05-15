import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";


const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-xl font-bold text-gray-700 mb-6">🧭 Admin</h2>
      <nav className="space-y-4">
        <Link
          to="/admin"
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/admin/formations"
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
        >
          <SchoolIcon />
          <span>Formations</span>
        </Link>

      </nav>
    </aside>
  );
};

export default Sidebar;
