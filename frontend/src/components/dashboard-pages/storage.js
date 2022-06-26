import Button from "components/button";
import Input from "components/input";
import Pagination from "components/pagination";
import Spinner from "components/spinner";
import Subtitle from "components/subtitle";
import Table from "components/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/api";
import formatPrice from "utils/format-price";

const Storage = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [countPosition, setCountPosition] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoadingData(true);
        api.get("storage", {
            params: {
                page: currentPage,
                search,
            },
        })
            .then(({ data }) => {
                setData(data.storageItems);
                setCountPosition(data.countPosition);
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
                    Склад
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
                        navigate("/storage/new");
                    }}
                    bgColor="#84C128"
                >
                    Додати позицію
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
                                    title: "Номер позиції",
                                    key: "item_id",
                                },
                                {
                                    title: "Назва продукту",
                                    key: "item_name",
                                },
                                {
                                    title: "Ціна заказу",
                                    key: "bought_price",
                                    cb: formatPrice,
                                },
                                {
                                    title: "Кількість в заказі",
                                    key: "availiable_quantity",
                                },
                            ]}
                            idKey="item_id"
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

export default Storage;
