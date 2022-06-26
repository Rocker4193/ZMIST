import "assets/styles/login-page/login-page.scss";

import React, { useEffect, useState } from "react";
import logoImg from "assets/images/logo.png";
import loginImg from "assets/images/login-img.jpg";
import classNames from "classnames";
import Spinner from "components/spinner";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/user-slice";
import api from "utils/api";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/use-auth";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputClass = classNames("login-page__input", {
        "login-page__input--error": error,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        const controller = new AbortController();

        api.post("users/login", {
            signal: controller.signal,
            data: {
                login,
                password,
            },
        })
            .then(({ data }) => {
                dispatch(
                    setUser({
                        id: data.id,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        login: data.login,
                        jobName: data.job_name
                    })
                );
                setError(false);
                navigate("/review");
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => controller?.abort?.();
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/review");
        }
    }, [isAuth, navigate]);

    return (
        <div className="login-page">
            <div className="login-page__inner">
                <div className="login-page__left">
                    <img
                        src={logoImg}
                        alt="ЗМІСТ"
                        className="login-page__logo"
                    />
                    <img
                        src={loginImg}
                        alt="ЗМІСТ"
                        className="login-page__login-img"
                    />
                </div>
                <form className="login-page__right" onSubmit={onSubmit}>
                    <h2 className="login-page__title">Вхід</h2>
                    <div className="login-page__form">
                        <input
                            type="text"
                            value={login}
                            placeholder="Логін"
                            minLength="3"
                            className={inputClass}
                            required
                            onInput={({ target }) => setLogin(target.value)}
                        />
                        <input
                            type="password"
                            value={password}
                            minLength="4" 
                            required
                            placeholder="Пароль"
                            className={inputClass}
                            onInput={({ target }) => setPassword(target.value)}
                        />
                        <button
                            type="submit"
                            className="login-page__btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <Spinner sizes="30px" color="#fff" />
                            ) : (
                                "Увійти"
                            )}
                        </button>
                        <p
                            className={classNames("login-page__err", {
                                "no-display": !error,
                            })}
                        >
                            Якісь з зазначенних данних невірні
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
