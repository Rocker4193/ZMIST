import "assets/styles/button/button.scss";
import classNames from "classnames";
import React from "react";

const Button = ({
    children,
    className,
    textColor = "#000",
    bgColor = "#e3cb8b",
    style,
    ...props
}) => {
    return (
        <button
            type="button"
            className={classNames("button", className)}
            style={{
                color: textColor,
                backgroundColor: bgColor,
                ...style,
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
