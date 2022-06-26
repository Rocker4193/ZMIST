import "assets/styles/pagination/pagination.scss";
import classNames from "classnames";
import React from "react";

const getPages = (countPages) => {
    const arr = [];

    for (let i = 1; i <= countPages; i++) {
        arr.push(i);
    }

    return arr;
};

const Pagination = ({ countItems, currentPage, setPage, perPage = 10 }) => {
    const countPages = Math.ceil(countItems / perPage);
    const pages = getPages(countPages);
    
    if (countItems === 0) {
        return null;
    }

    return (
        <div className="pagination-wrapper p-hide">
            <div className="pagination">
                {currentPage !== 1 && (
                    <p
                        className="prev page-numbers"
                        onClick={() => setPage(currentPage - 1)}
                    >
                        Попер.
                    </p>
                )}
                {pages.map((i) => (
                    <p
                        key={i}
                        className={classNames("page-numbers", {
                            current: currentPage === i,
                        })}
                        onClick={() => setPage(i)}
                    >
                        {i}
                    </p>
                ))}
                {currentPage !== countPages && (
                    <p
                        className="next page-numbers"
                        onClick={() => setPage(currentPage + 1)}
                    >
                        Наст.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Pagination;
