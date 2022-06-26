import React from 'react';
import { useSelector } from 'react-redux';
import logoImg from "assets/images/logo.png";

const DashboardHeader = () => {
    const { firstName, lastName, jobName } = useSelector((state) => state.user);

    return (
        <div className='dashboard-header'>
            <img className="dashboard-header__logo" src={logoImg} alt="Зміст" />
            <div className='dashboard-header__info'>
                <span>{firstName} {lastName}</span>
                <span>{jobName}</span>
            </div>
        </div>
    );
};

export default DashboardHeader;
