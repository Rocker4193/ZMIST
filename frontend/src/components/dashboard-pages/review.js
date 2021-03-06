import classNames from "classnames";
import Button from "components/button";
import DashboardCounter from "components/dashboard-counter";
import DashboardCounters from "components/dashboard-counters";
import Input from "components/input";
import Pagination from "components/pagination";
import Spinner from "components/spinner";
import Subtitle from "components/subtitle";
import Table from "components/table";
import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import api from "utils/api";
import formatDate from "utils/format-date";

const Review = () => {
    const [search, setSearch] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [countActive, setCountActive] = useState(null);
    const [countClosed, setCountClosed] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const [counters, setCounters] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setLoadingData(true);
        api.get("orders", {
            params: {
                isClosed: !isActive,
                page: currentPage,
                search,
            },
        })
            .then(({ data }) => {
                setData(data.orders);
                setCountActive(data.countActive);
                setCountClosed(data.countClosed);
            })
            .finally(() => {
                setLoadingData(false);
            });
    }, [currentPage, isActive, search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [countClosed, countActive, isActive]);

    useEffect(() => {
        api.get("card")
            .then(({ data }) => {
                setCounters(data.counter);
            });
    }, [currentPage, isActive, search]);

    return (
        <div className="review-page">
            <Subtitle
                style={{
                    marginBottom: "25px",
                }}
            >
                ????????????????????
            </Subtitle>
            <DashboardCounters>
                <DashboardCounter text="?????????????? ????????????????" count={counters.freeTableCount} />
            </DashboardCounters>
            <div
                style={{
                    marginTop: "25px",
                    borderTop: "1px solid rgba(102, 102, 102, 0.2)",
                    width: "100%",
                }}
            ></div>
            <div
                style={{
                    marginTop: "25px",
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
                    ????????????????????
                </Subtitle>
                <DashboardCounters small>
                    <DashboardCounter text="?????????????????? ???? ????????????????" count={counters.countOrdersToday} />
                    <DashboardCounter text="?????????????? ????????????????????" count={countActive} />
                    <DashboardCounter text="???????????????????????????? ????????????" count={counters.reservationTableCount} />
                </DashboardCounters>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Input
                    placeholder="??????????"
                    className="input--search"
                    value={search}
                    onInput={(e) => setSearch(e.target.value)}
                />
                <Button
                    onClick={() => {
                        navigate("/orders/new");
                    }}
                >
                    ???????? ????????????????????
                </Button>
            </div>
            <div className="table-header">
                <div
                    className={classNames("table-item", {
                        "table-item--active": isActive,
                    })}
                    onClick={() => setIsActive(true)}
                >
                    <span className="table-item__text">?????????????? ????????????????????</span>
                    <span className="table-item__count">
                        {countActive === null ? (
                            <Spinner sizes="5px" />
                        ) : (
                            countActive
                        )}
                    </span>
                </div>
                <div
                    className={classNames("table-item", {
                        "table-item--active": !isActive,
                    })}
                    onClick={() => setIsActive(false)}
                >
                    <span className="table-item__text">
                        ?????????????????? ????????????????????
                    </span>
                    <span className="table-item__count">
                        {countClosed === null ? (
                            <Spinner sizes="5px" />
                        ) : (
                            countClosed
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
                                { title: "?????????? ????????????????????", key: "id" },
                                {
                                    title: "????????????",
                                    key: "is_closed",
                                    cb: (isClosed) => {
                                        return isClosed
                                            ? "??????????????"
                                            : "????????????????";
                                    },
                                },
                                { title: "????????????", key: "table_id" },
                                {
                                    title: "????????",
                                    key: "order_time",
                                    cb: (date) => {
                                        return formatDate(new Date(date));
                                    },
                                },
                                { title: "??????????????", key: "employee_name" },
                            ]}
                            idKey="id"
                            action={{
                                buttons: (item) => {
                                    return (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    navigate({
                                                        pathname: `/orders/${item.id}`,
                                                        search: createSearchParams(
                                                            {
                                                                closed: !!item.is_closed,
                                                            }
                                                        ).toString(),
                                                    });
                                                }}
                                            >
                                                ??????????????????????
                                            </Button>
                                        </>
                                    );
                                },
                            }}
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
                        countItems={isActive ? countActive : countClosed}
                        currentPage={currentPage}
                        setPage={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Review;
