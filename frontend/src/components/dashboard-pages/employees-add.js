import Button from "components/button";
import Input from "components/input";
import Spinner from "components/spinner";
import Subtitle from "components/subtitle";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/api";
import Select from "react-select";

const EmployeesAdd = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [salary, setSalary] = useState("");
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("jobs").then(({ data }) => {
            setJobs(data.jobs);
            setPosition(data.jobs[0].value);
        });
    }, []);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setLoading(true);
            api.post("employees/add", {
                firstName,
                lastName,
                birthDate,
                phone,
                position,
                login,
                password,
                salary,
            })
                .then(() => {
                    navigate("/employees");
                })
                .catch(() => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [
            navigate,
            setLoading,
            firstName,
            lastName,
            birthDate,
            phone,
            position,
            login,
            password,
            salary,
        ]
    );

    return (
        <div className="review-page">
            <div
                style={{
                    marginBottom: "25px",
                }}
            >
                <Subtitle
                    style={{
                        marginRight: "50px",
                        marginBottom: "25px",
                    }}
                >
                    Додати працівника
                </Subtitle>
                <form onSubmit={onSubmit}>
                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            Прізвище
                        </p>
                        <Input
                            required
                            minLength="3"
                            value={lastName}
                            placeholder="Прізвище"
                            onInput={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            Ім’я
                        </p>
                        <Input
                            required
                            minLength="3"
                            value={firstName}
                            placeholder="Ім’я"
                            onInput={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            Дата народження
                        </p>
                        <Input
                            value={birthDate}
                            required
                            pattern="\d{4}-\d{2}-\d{2}"
                            placeholder="Дата народження "
                            onInput={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            Номер телефону
                        </p>
                        <Input
                            required
                            maxLength="15"
                            value={phone}
                            placeholder="Номер телефону"
                            onInput={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            Позиція
                        </p>
                        {jobs.length && (
                            <Select
                                options={jobs}
                                styles={{
                                    control: (styles) => ({
                                        ...styles,
                                        width: "250px",
                                        border: "0",
                                    }),
                                }}
                                defaultValue={jobs[0]}
                                placeholder="Позиція"
                                onChange={(e) => setPosition(e.value)}
                            />
                        )}
                    </div>
                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            Зарплатня
                        </p>
                        <Input
                            required
                            type="number"
                            min="0"
                            value={salary}
                            placeholder="Зарплатня"
                            onInput={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            Логін
                        </p>
                        <Input
                            required
                            minLength="3"
                            value={login}
                            placeholder="Логін"
                            onInput={(e) => setLogin(e.target.value)}
                        />
                    </div>
                    <div>
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            Пароль
                        </p>
                        <Input
                            required
                            minLength="3"
                            value={password}
                            placeholder="Пароль"
                            onInput={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        bgColor="#84C128"
                        style={{
                            marginTop: "25px",
                            width: "250px",
                        }}
                    >
                        {loading ? <Spinner sizes="10px" /> : "Готово"}
                    </Button>
                    {error && (
                        <p
                            style={{
                                marginTop: "10px",
                                fontSize: "14px",
                                color: "#EE5858",
                            }}
                        >
                            Помилка при додаванні!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EmployeesAdd;
