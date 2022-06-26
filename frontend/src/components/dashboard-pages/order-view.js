import Button from "components/button";
import Input from "components/input";
import Pagination from "components/pagination";
import Spinner from "components/spinner";
import Subtitle from "components/subtitle";
import Table from "components/table";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    createSearchParams,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import api from "utils/api";
import formatPrice from "utils/format-price";

const OrderView = () => {
    const navigate = useNavigate();
    const { firstName, lastName } = useSelector((state) => state.user);
    let { orderId } = useParams();
    const closed = useSearchParams()[0].get("closed");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [dataCheck, setDataCheck] = useState(null);
    const [countPosition, setCountPosition] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const [loadingCheck, setLoadingCheck] = useState(false);
    const [isClosed, setIsClosed] = useState(closed === "true");

    useEffect(() => {
        setIsClosed(closed === "true");
    }, [closed]);

    useEffect(() => {
        setLoadingData(true);
        api.get("orders/view", {
            params: {
                orderId,
                page: currentPage,
                search,
            },
        })
            .then(({ data }) => {
                setData(data.positions);
                setCountPosition(data.countPosition);
            })
            .finally(() => {
                setLoadingData(false);
            });
    }, [currentPage, orderId, search]);

    const endOrder = () => {
        api.post("orders/end", {
            orderId,
        }).then(() => {
            navigate({
                pathname: `/orders/${orderId}`,
                search: createSearchParams({
                    closed: true,
                }).toString(),
            });
        });
    };

    const printCheck = () => {
        setLoadingCheck(true);
        api.get("orders/check", {
            params: {
                orderId,
            },
        })
            .then(({ data }) => {
                setDataCheck(data.positions);
            })
            .finally(() => {
                setLoadingCheck(false);
                setTimeout(() => {
                    window.print();
                });
            });
    };

    const total = data?.reduce(
        (sum, item) => sum + item.quantity * item.product_price,
        0
    );

    return (
        <div className="review-page">
            <Subtitle
                className="p-show"
                style={{
                    marginBottom: "25px",
                }}
            >
                Чек до замовлення №{orderId}
            </Subtitle>
            <p className="p-show">
                Замовлення оформив {firstName} {lastName}
            </p>
            <div
                className="p-show"
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
                    className="p-hide"
                    style={{
                        marginRight: "50px",
                    }}
                >
                    Перегляд замовлення №{orderId}{" "}
                    {isClosed ? "(Завершене)" : ""}, загальна ціна:{" "}
                    {formatPrice(total)}
                </Subtitle>
                <Subtitle
                    className="p-show"
                    style={{
                        marginRight: "50px",
                    }}
                >
                    До сплати: {formatPrice(total)}
                </Subtitle>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    <div className="p-hide">
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
                            {!isClosed ? (
                                <Button
                                    onClick={() => {
                                        endOrder();
                                    }}
                                    bgColor="#EE5858"
                                >
                                    Завершити замовлення
                                </Button>
                            ) : (
                                <Button
                                    disabled={loadingCheck}
                                    onClick={printCheck}
                                >
                                    {loadingCheck ? (
                                        <Spinner sizes="10px" />
                                    ) : (
                                        "Роздрукувати чек"
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="p-hide">
                        <div className="table-header">
                            <div className="table-item table-item--active">
                                <span className="table-item__text">
                                    Позиції
                                </span>
                                <span className="table-item__count">
                                    {countPosition === null ? (
                                        <Spinner sizes="5px" />
                                    ) : (
                                        countPosition
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        {!loadingData ? (
                            <>
                                <Table
                                    printHide
                                    data={data}
                                    columns={[
                                        {
                                            title: "Номер продукту",
                                            key: "product_id",
                                        },
                                        {
                                            title: "Назва продукту",
                                            key: "product_name",
                                        },
                                        {
                                            title: "Ціна за одиницю",
                                            key: "product_price",
                                            cb: formatPrice,
                                        },
                                        {
                                            title: "Кількість",
                                            key: "quantity",
                                        },
                                    ]}
                                    idKey="product_id"
                                />
                                {dataCheck?.length && (
                                    <Table
                                        printShow
                                        data={dataCheck}
                                        columns={[
                                            {
                                                title: "Номер продукту",
                                                key: "product_id",
                                            },
                                            {
                                                title: "Назва продукту",
                                                key: "product_name",
                                            },
                                            {
                                                title: "Ціна за одиницю",
                                                key: "product_price",
                                                cb: formatPrice,
                                            },
                                            {
                                                title: "Кількість",
                                                key: "quantity",
                                            },
                                        ]}
                                        idKey="product_id"
                                    />
                                )}
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
            </div>
        </div>
    );
};

export default OrderView;
