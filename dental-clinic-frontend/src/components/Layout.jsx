import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Sidebar />
            <main className="main-content">
                <header className="top-header">
                    <div className="search-bar">
                        <input type="text" placeholder="Search for patients or appointments..." />
                    </div>
                    <div className="user-profile">
                        <div className="avatar">AD</div>
                        <span>Admin Dashboard</span>
                    </div>
                </header>
                <div className="page-container">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
