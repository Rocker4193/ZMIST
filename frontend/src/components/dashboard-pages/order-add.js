import Button from "components/button";
import Input from "components/input";
import Pagination from "components/pagination";
import Spinner from "components/spinner";
import Subtitle from "components/subtitle";
import Table from "components/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/api";
import Select from "react-select";
import formatPrice from "utils/format-price";
import useAuth from "hooks/use-auth";

const OrderAdd = () => {
    const navigate = useNavigate();
    const { id } = useAuth();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState(null);
    const [countProducts, setCountProducts] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [tables, setTables] = useState([]);
    const [currentTable, setCurrentTable] = useState(null);
    const [showPosition, setShowPosition] = useState(false);
    const [positionsInOrder, setPositionsInOrder] = useState([]);
    const total = positionsInOrder.reduce(
        (sum, item) => sum + item.count * item.price,
        0
    );

    useEffect(() => {
        setCurrentPage(1);
        setSearch("");
    }, [showPosition]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    useEffect(() => {
        api.get("tables", {
            params: {
                forOrder: true,
            },
        }).then(({ data }) => {
            setCurrentTable(data.tables[0].id)
            setTables(data.tables.map((el) => ({ value: el.id, label: el.id })));
        });
    }, []);

    useEffect(() => {
        if (showPosition) {
            setLoadingData(true);
            api.get("menu", {
                params: {
                    page: currentPage,
                    search,
                },
            })
                .then(({ data }) => {
                    setProducts(data.menuItems);
                    setCountProducts(data.countPosition);
                })
                .finally(() => {
                    setLoadingData(false);
                });
        }
    }, [currentPage, search, showPosition]);

    const addOrder = () => {
        if (positionsInOrder.length) {
            setLoadingAdd(true);
            api.post("orders/add", {
                currentTable,
                positionsInOrder,
                id,
                total,
            })
                .then(() => {
                    navigate("/orders");
                })
                .finally(() => {
                    setLoadingAdd(false);
                });
        }
    };

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
                    {showPosition
                        ? "Додати позицію"
                        : `Нове замовлення, загальна ціна: ${formatPrice(
                              total
                          )}`}
                </Subtitle>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {!showPosition && (
                    <div
                        style={{
                            marginRight: "25px",
                        }}
                    >
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
                                Cтолик
                            </p>
                            {tables.length && (
                                <Select
                                    options={tables}
                                    defaultValue={{ label: currentTable, value: currentTable}}
                                    styles={{
                                        control: (styles) => ({
                                            ...styles,
                                            width: "200px",
                                            border: "0",
                                        }),
                                    }}
                                    onChange={(e) => { 
                                        setCurrentTable(e.value);
                                    }}
                                />
                            )}
                        </div>
                        <Button
                            onClick={() => {
                                setShowPosition(true);
                            }}
                        >
                            Додати позицію
                        </Button>
                    </div>
                )}
                <div
                    style={{
                        width: "100%",
                    }}
                >
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
                            disabled={loadingAdd}
                            onClick={() => {
                                if (showPosition) {
                                    setShowPosition(false);
                                } else {
                                    addOrder();
                                }
                            }}
                            bgColor="#84C128"
                        >
                            {loadingAdd ? (
                                <Spinner sizes="10px" />
                            ) : showPosition ? (
                                "Готово"
                            ) : (
                                "Створити замовлення"
                            )}
                        </Button>
                    </div>
                    <div className="table-header">
                        <div className={"table-item table-item--active"}>
                            <span className="table-item__text">Позиції</span>
                            <span className="table-item__count">
                                {!showPosition ? (
                                    positionsInOrder?.length
                                ) : countProducts === null ? (
                                    <Spinner sizes="5px" />
                                ) : (
                                    countProducts
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        {!showPosition && (
                            <>
                                <Table
                                    data={positionsInOrder
                                        .filter((pos) =>
                                            search
                                                ? pos.name.includes(search)
                                                : true
                                        )
                                        .slice(
                                            (currentPage - 1) * 10,
                                            currentPage * 10
                                        )}
                                    columns={[
                                        {
                                            title: "Номер продукту",
                                            key: "product_id",
                                        },
                                        {
                                            title: "Назва продукту",
                                            key: "name",
                                        },
                                        {
                                            title: "Ціна за одиницю",
                                            key: "price",
                                            cb: formatPrice,
                                        },
                                        {
                                            title: "Додано",
                                            key: "count",
                                        },
                                    ]}
                                    idKey="product_id"
                                />
                                <Pagination
                                    countItems={
                                        positionsInOrder.filter((pos) =>
                                            search
                                                ? pos.name.includes(search)
                                                : true
                                        ).length
                                    }
                                    currentPage={currentPage}
                                    setPage={setCurrentPage}
                                />
                            </>
                        )}
                        {showPosition && (
                            <>
                                {!loadingData ? (
                                    <>
                                        <Table
                                            data={products?.map((product) => ({
                                                ...product,
                                                count: positionsInOrder.length
                                                    ? positionsInOrder.find(
                                                          (el) =>
                                                              el.product_id ===
                                                              product.product_id
                                                      )?.count || 0
                                                    : 0,
                                            }))}
                                            columns={[
                                                {
                                                    title: "Номер продукту",
                                                    key: "product_id",
                                                },
                                                {
                                                    title: "Назва продукту",
                                                    key: "name",
                                                },
                                                {
                                                    title: "Ціна за одиницю",
                                                    key: "price",
                                                    cb: formatPrice,
                                                },
                                                {
                                                    title: "Додано",
                                                    key: "count",
                                                },
                                            ]}
                                            idKey="product_id"
                                            action={{
                                                buttons: (item) => {
                                                    return (
                                                        <>
                                                            <Button
                                                                onClick={() => {
                                                                    setPositionsInOrder(
                                                                        (
                                                                            items
                                                                        ) => {
                                                                            const index =
                                                                                items.findIndex(
                                                                                    (
                                                                                        el
                                                                                    ) =>
                                                                                        el.product_id ===
                                                                                        item.product_id
                                                                                );

                                                                            if (
                                                                                index !==
                                                                                -1
                                                                            ) {
                                                                                const newItems =
                                                                                    [
                                                                                        ...items,
                                                                                    ];
                                                                                const newItem =
                                                                                    {
                                                                                        ...newItems[
                                                                                            index
                                                                                        ],
                                                                                    };
                                                                                newItem.count++;
                                                                                newItems[
                                                                                    index
                                                                                ] =
                                                                                    newItem;

                                                                                return newItems;
                                                                            } else {
                                                                                return [
                                                                                    ...items,
                                                                                    {
                                                                                        ...item,
                                                                                        count: 1,
                                                                                    },
                                                                                ];
                                                                            }
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                Додати
                                                            </Button>
                                                            {item.count !==
                                                                0 && (
                                                                <Button
                                                                    bgColor="#EE5858"
                                                                    onClick={() => {
                                                                        setPositionsInOrder(
                                                                            (
                                                                                items
                                                                            ) => {
                                                                                const index =
                                                                                    items.findIndex(
                                                                                        (
                                                                                            el
                                                                                        ) =>
                                                                                            el.product_id ===
                                                                                            item.product_id
                                                                                    );
                                                                                if (
                                                                                    index !==
                                                                                    -1
                                                                                ) {
                                                                                    const newItems =
                                                                                        [
                                                                                            ...items,
                                                                                        ];
                                                                                    const newItem =
                                                                                        {
                                                                                            ...newItems[
                                                                                                index
                                                                                            ],
                                                                                        };
                                                                                    newItem.count--;

                                                                                    if (
                                                                                        newItem.count ===
                                                                                        0
                                                                                    ) {
                                                                                        newItems.splice(
                                                                                            index,
                                                                                            1
                                                                                        );
                                                                                    } else {
                                                                                        newItems[
                                                                                            index
                                                                                        ] =
                                                                                            newItem;
                                                                                    }

                                                                                    return newItems;
                                                                                }
                                                                            }
                                                                        );
                                                                    }}
                                                                >
                                                                    Видалити
                                                                </Button>
                                                            )}
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
                                <Pagination
                                    countItems={countProducts}
                                    currentPage={currentPage}
                                    setPage={setCurrentPage}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderAdd;
