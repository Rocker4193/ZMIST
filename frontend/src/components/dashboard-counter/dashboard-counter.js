import React from "react";

const DashboardCounter = ({ count, text }) => {
    return (
        <div className="dashboard-counter">
            <span className="dashboard-counter__count">{count}</span>
            <span className="dashboard-counter__text">{text}</span>
        </div>
    );
};

export default DashboardCounter;
