import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ArrowDownCircle, ArrowUpCircle, PieChart } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Tổng quan', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Khoản thu', path: '/income', icon: <ArrowUpCircle size={20} /> },
    { name: 'Khoản chi', path: '/expenses', icon: <ArrowDownCircle size={20} /> },
    { name: 'Báo cáo', path: '/reports', icon: <PieChart size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <PieChart size={28} className="text-emerald-500" />
        FamilyFin
      </div>
      <nav>
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
