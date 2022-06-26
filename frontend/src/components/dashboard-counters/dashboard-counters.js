import classNames from "classnames";
import React from "react";

const DashboardCounters = ({ children, small }) => (
    <div
        className={classNames("dashboard-counters", {
            "dashboard-counters--small": small,
        })}
    >
        {children}
    </div>
);

export default DashboardCounters;
