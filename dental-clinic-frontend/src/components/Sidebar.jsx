import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserRound, CalendarDays, ClipboardList } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/doctors', icon: <UserRound size={20} />, label: 'Doctors' },
        { to: '/patients', icon: <Users size={20} />, label: 'Patients' },
        { to: '/appointments', icon: <CalendarDays size={20} />, label: 'Appointments' },
        { to: '/records', icon: <ClipboardList size={20} />, label: 'Medical Records' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">🦷</div>
                <h1>DentalCare</h1>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
