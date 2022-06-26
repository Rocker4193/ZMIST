import Button from "components/button";
import Input from "components/input";
import Pagination from "components/pagination";
import Spinner from "components/spinner";
import Subtitle from "components/subtitle";
import Table from "components/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/api";
import formatDate from "utils/format-date";

const Employees = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [countPosition, setCountPosition] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoadingData(true);
        api.get("employees", {
            params: {
                page: currentPage,
                search,
            },
        })
            .then(({ data }) => {
                setData(data.employees);
                setCountPosition(data.countEmployees);
            })
            .finally(() => {
                setLoadingData(false);
            });
    }, [currentPage, search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [countPosition])

    return (
        <div className="review-page">
            <div
                style={{
                    marginBottom: "25px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Subtitle
                    style={{
                        marginRight: "50px",
                    }}
                >
                    Працівники
                </Subtitle>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Input
                    placeholder="Поиск"
                    className="input--search"
                    value={search}
                    onInput={(e) => setSearch(e.target.value)}
                />
                <Button
                    onClick={() => {
                        navigate("/employees/new");
                    }}
                    bgColor="#84C128"
                >
                    Додати працівника
                </Button>
            </div>
            <div className="table-header">
                <div className="table-item table-item--active">
                    <span className="table-item__text">Позиції</span>
                    <span className="table-item__count">
                        {countPosition === null ? (
                            <Spinner sizes="5px" />
                        ) : (
                            countPosition
                        )}
                    </span>
                </div>
            </div>
            <div className="table-wrapper">
                {!loadingData ? (
                    <>
                        <Table
                            data={data}
                            columns={[
                                {
                                    title: "Позиція",
                                    key: "job_name",
                                },
                                {
                                    title: "Працівник",
                                    key: "full_name",
                                },
                                {
                                    title: "Дата народження",
                                    key: "date_of_birth",
                                    cb: (date) => {
                                        return formatDate(new Date(date));
                                    },
                                },
                                {
                                    title: "Телефонний номер",
                                    key: "phone_number",
                                },
                                {
                                    title: "Дата початку",
                                    key: "start_date",
                                    cb: (date) => {
                                        return formatDate(new Date(date));
                                    },
                                },
                                {
                                    title: "Дата звільнення",
                                    key: "end_date",
                                    cb: (date) => {
                                        const formatedDate = formatDate(new Date(date));
                                        return formatedDate === '1970-01-01' ? 'Досі працює' : formatedDate;
                                    },
                                },
                            ]}
                            idKey="id"
                        />
                    </>
                ) : (
                    <div
                        style={{
                            paddingTop: "25px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Spinner sizes="50px" color="#000" />
                    </div>
                )}
                {data && (
                    <Pagination
                        countItems={countPosition}
                        currentPage={currentPage}
                        setPage={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Employees;
