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
                    ???????????? ????????????????????
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
                            ????????????????
                        </p>
                        <Input
                            required
                            minLength="3"
                            value={lastName}
                            placeholder="????????????????"
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
                            ?????????
                        </p>
                        <Input
                            required
                            minLength="3"
                            value={firstName}
                            placeholder="?????????"
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
                            ???????? ????????????????????
                        </p>
                        <Input
                            value={birthDate}
                            required
                            pattern="\d{4}-\d{2}-\d{2}"
                            placeholder="???????? ???????????????????? "
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
                            ?????????? ????????????????
                        </p>
                        <Input
                            required
                            maxLength="15"
                            value={phone}
                            placeholder="?????????? ????????????????"
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
                            ??????????????
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
                                placeholder="??????????????"
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
                            ??????????????????
                        </p>
                        <Input
                            required
                            type="number"
                            min="0"
                            value={salary}
                            placeholder="??????????????????"
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
                            ??????????
                        </p>
                        <Input
                            required
                            minLength="3"
                            value={login}
                            placeholder="??????????"
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
                            ????????????
                        </p>
                        <Input
                            required
                            minLength="3"
                            value={password}
                            placeholder="????????????"
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
                        {loading ? <Spinner sizes="10px" /> : "????????????"}
                    </Button>
                    {error && (
                        <p
                            style={{
                                marginTop: "10px",
                                fontSize: "14px",
                                color: "#EE5858",
                            }}
                        >
                            ?????????????? ?????? ??????????????????!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EmployeesAdd;
