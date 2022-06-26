import "assets/styles/subtitle/subtitle.scss";
import classNames from "classnames";
import React from "react";

const Subtitle = ({ children, className, ...props }) => <h2 className={classNames("subtitle", className)} {...props}>{children}</h2>;

export default Subtitle;
