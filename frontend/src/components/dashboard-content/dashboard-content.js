import DashboardSidebar from 'components/dashboard-sidebar';
import React from 'react';
import { Outlet } from "react-router-dom";

const DashboardContent = () => {
    return (
    <div className='dashboard-content'>
        <DashboardSidebar />
        <div className='dashboard-content__inner'>
            <Outlet />
        </div>    
    </div>
    );
}

export default DashboardContent;
