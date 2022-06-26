import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeUser } from "store/slices/user-slice";

const items = [
    {
        icon: "grid.svg",
        text: "Огляд",
        path: "review",
    },
    {
        icon: "chart.svg",
        text: "Меню",
        path: "menu",
    },
    {
        icon: "clipboard.svg",
        text: "Замовлення",
        path: "orders",
    },
    {
        icon: "users.svg",
        text: "Працівники",
        path: "employees",
    },
    {
        icon: "package.svg",
        text: "Склад",
        path: "storage",
    },
    {
        icon: "table.png",
        text: "Cтоли",
        path: "tables",
    },
];

const DashboardSidebar = () => {
    const dispatch = useDispatch();

    return (
        <div className="dashboard-sidebar">
            <div className="dashboard-sidebar__content">
                <p className="dashboard-sidebar__title">Керування</p>
                <nav className="dashboard-sidebar__nav sidebar-nav">
                    {items.map(({ icon, text, path }) => {
                        return (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    isActive ? 'sidebar-nav__item sidebar-nav__item--active' : 'sidebar-nav__item'
                                }
                            >
                                <img src={require('assets/icons/sidebar/' + icon)} alt={text} />
                                <span>{text}</span>
                            </NavLink>
                        );
                    })}
                </nav>
                <p className="sidebar-nav__item" style={{ color: '#EE5858', cursor: 'pointer' }} onClick={() => {
                    dispatch(removeUser());
                }}>
                    Вийти
                </p>
            </div>
            <div className="dashboard-sidebar__bottom">
                <p className="dashboard-sidebar__info">© ZMIST. 2022</p>
            </div>
        </div>
    );
};

export default DashboardSidebar;
