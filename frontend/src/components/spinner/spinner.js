import "assets/styles/spinner/spinner.scss";

import React from "react";

const Spinner = ({ sizes = "80px", color = "#fff" }) => {
    return (
        <div
            style={{
                width: sizes,
                height: sizes,
                color,
            }}
            className="spinner"
        />
    );
};

export default Spinner;
