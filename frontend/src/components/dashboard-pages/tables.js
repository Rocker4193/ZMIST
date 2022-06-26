import Button from "components/button";
import Input from "components/input";
import Pagination from "components/pagination";
import Spinner from "components/spinner";
import Subtitle from "components/subtitle";
import Table from "components/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/api";

const Tables = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [countTables, setCountTables] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoadingData(true);
        api.get("tables", {
            params: {
                page: currentPage,
                search,
            },
        })
            .then(({ data }) => {
                setData(data.tables);
                setCountTables(data.countTables)
            })
            .finally(() => {
                setLoadingData(false);
            });
    }, [currentPage, search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [countTables])

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
                    Столи
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
                        navigate("/tables/new");
                    }}
                    bgColor="#84C128"
                >
                    Додати стіл
                </Button>
            </div>
            <div className="table-header">
                <div className="table-item table-item--active">
                    <span className="table-item__text">Столи</span>
                </div>
            </div>
            <div className="table-wrapper">
                {!loadingData ? (
                    <>
                        <Table
                            data={data}
                            columns={[
                                {
                                    title: "Номер столу",
                                    key: "id",
                                },
                                {
                                    title: "Кількість місць",
                                    key: "seat_count",
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
                        countItems={countTables}
                        currentPage={currentPage}
                        setPage={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Tables;
