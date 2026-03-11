import React from 'react';
import { useSelector } from 'react-redux';
import { Users, UserRound, CalendarDays, ClipboardList, Clock } from 'lucide-react';

const Dashboard = () => {
    const doctors = useSelector((state) => state.doctors.items);
    const patients = useSelector((state) => state.patients.items);
    const appointments = useSelector((state) => state.appointments.items);

    const stats = [
        { label: 'Total Doctors', value: doctors.length, icon: <UserRound size={24} />, color: '#3b82f6' },
        { label: 'Total Patients', value: patients.length, icon: <Users size={24} />, color: '#10b981' },
        { label: 'Total Appointments', value: appointments.length, icon: <CalendarDays size={24} />, color: '#f59e0b' },
        { label: 'Today Reservations', value: appointments.length, icon: <Clock size={24} />, color: '#ef4444' },
    ];

    return (
        <div className="dashboard">
            <div className="page-header">
                <h2>Clinic Overview</h2>
                <p className="text-muted">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className="premium-card stat-card">
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-value">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="premium-card">
                    <h3>Recent Appointments</h3>
                    <div className="empty-state">
                        <p className="text-muted">No recent appointments found.</p>
                    </div>
                </div>
                <div className="premium-card">
                    <h3>Upcoming Schedule</h3>
                    <div className="empty-state">
                        <p className="text-muted">No upcoming schedules.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
