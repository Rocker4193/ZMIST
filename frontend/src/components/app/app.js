import 'reset-css';
import 'assets/styles/app.scss';

import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import DashboardLayout from "../dashboard-layout";
import LoginPage from "../pages/login-page";
import { Employees, EmployeesAdd, Menu, MenuAdd, OrderAdd, Orders, Review, Storage, StorageAdd, Tables, TablesAdd } from 'components/dashboard-pages';
import OrderView from 'components/dashboard-pages/order-view';
import useAuth from 'hooks/use-auth';

const App = () => {
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth]); // eslint-disable-line

    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<DashboardLayout />}>
                    <Route path="review" element={<Review />} />
                    <Route path="menu" element={<Menu />} />
                    <Route path="menu/new" element={<MenuAdd />} />
                    <Route path="orders" element={<Orders />} /> 
                    <Route path="orders/new" element={<OrderAdd />} /> 
                    <Route path="orders/:orderId" element={<OrderView />} />
                    <Route path="orders/new" element={<h1>new order</h1>} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="employees/new" element={<EmployeesAdd />} />
                    <Route path="storage" element={<Storage />} />
                    <Route path="storage/new" element={<StorageAdd />} />
                    <Route path="tables" element={<Tables />} />
                    <Route path="tables/new" element={<TablesAdd />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
