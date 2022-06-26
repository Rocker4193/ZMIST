import Button from "components/button";
import Input from "components/input";
import Spinner from "components/spinner";
import Subtitle from "components/subtitle";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/api";

const TablesAdd = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [seatCount, setSeatCount] = useState("");
    const navigate = useNavigate();

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setLoading(true);
            api.post("tables/add", {
                seatCount,
            })
                .then(() => {
                    navigate("/tables");
                })
                .catch(() => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [navigate, setLoading, seatCount]
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
                    Додати стіл
                </Subtitle>
                <form onSubmit={onSubmit}>
                    <div>
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            Кількість місць
                        </p>
                        <Input
                            required
                            type="number"
                            min="0"
                            value={seatCount}
                            placeholder="Кількість місць"
                            onInput={(e) => setSeatCount(e.target.value)}
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

export default TablesAdd;
