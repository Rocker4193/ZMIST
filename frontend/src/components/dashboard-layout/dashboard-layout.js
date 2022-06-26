import 'assets/styles/dashboard/dashboard.scss';

import DashboardHeader from 'components/dashboard-header';
import React from 'react';
import DashboardContent from '../dashboard-content';

const DashboardLayout = () => {
    return (
        <div className='dashboard-layout'>
            <DashboardHeader />
            <DashboardContent />  
        </div>
    );
}

export default DashboardLayout;
