import Button from "components/button";
import Input from "components/input";
import Spinner from "components/spinner";
import Subtitle from "components/subtitle";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/api";

const StorageAdd = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [count, setCount] = useState("");
    const navigate = useNavigate();

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setLoading(true);
            api.post("storage/add", {
                name,
                price,
                count,
            })
                .then(() => {
                    navigate("/storage");
                })
                .catch(() => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [navigate, setLoading, name, price, count]
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
                    Додати позицію на склад
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
                            Назва позиції
                        </p>
                        <Input
                            required
                            type="text"
                            value={name}
                            placeholder="Назва позиції"
                            onInput={(e) => setName(e.target.value)}
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
                            Ціна
                        </p>
                        <Input
                            required
                            type="number"
                            min="0"
                            value={price}
                            placeholder="Ціна"
                            onInput={(e) => setPrice(e.target.value)}
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
                            Кількість
                        </p>
                        <Input
                            min="0"
                            type="number"
                            value={count}
                            placeholder="Кількість"
                            onInput={(e) => setCount(e.target.value)}
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

export default StorageAdd;
