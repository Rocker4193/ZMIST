import classNames from "classnames";
import React from "react";
import "assets/styles/table/table.scss";

const Table = ({ data, columns, idKey, action , printHide, printShow}) => {
    if (!data || !data?.length) {
        return (
            <h3
                style={{
                    paddingTop: "20px",
                    textAlign: "center",
                    fontSize: "16px",
                }}
            >
                Данних немає!
            </h3>
        );
    }

    const columnWidth = `${
        100 / (!action ? columns.length : columns.length + 1)
    }%`;

    return (
        <>
            <table className={classNames("table", {
                'p-hide' : printHide,
                'p-show': printShow,
            })}>
                <thead>
                    <tr>
                        {columns.map(({ title, key, classHeader }) => {
                            return (
                                <th
                                    key={key}
                                    className={classNames(classHeader)}
                                    style={{
                                        minWidth: columnWidth,
                                    }}
                                >
                                    {title}
                                </th>
                            );
                        })}
                        {action && (
                            <th
                                className={classNames(action.classHeader)}
                                style={{
                                    minWidth: columnWidth,
                                }}
                            >
                                Дії
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr key={item[idKey]}>
                                {columns.map(({ key, classBody, cb }) => {
                                    return (
                                        <td
                                            key={`${item[idKey]}-${key}-${item[key]}`}
                                            className={classNames(classBody)}
                                            style={{
                                                minWidth: columnWidth,
                                            }}
                                        >
                                            {cb ? cb(item[key]) : item[key]}
                                        </td>
                                    );
                                })}
                                {action && (
                                    <td
                                        style={{
                                            minWidth: columnWidth,
                                        }}
                                    >
                                        {action.buttons(item)}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Table;
