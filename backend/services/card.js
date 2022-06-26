import databaseQuery from "../utils/database-query.js";

const getCardCount = async (orderId, search) => {
    const [countOrdersToday] = await databaseQuery(
        `
        SELECT COUNT(id) as count
        FROM orders
        WHERE YEAR(order_time) = YEAR(NOW()) and  DAYOFYEAR(order_time) = DAYOFYEAR(NOW());
        `
    );
    const [reservationTableCount] = await databaseQuery(
        `
        SELECT COUNT(id) as count
        FROM table_reservations
        WHERE reservation_datetime > NOW();
        `
    );
    const [freeTableCount] = await databaseQuery(
        `
        SELECT count(id) as count 
        FROM tables
        WHERE id NOT IN (SELECT t.table_id  FROM tables_orders t INNER JOIN orders o 
            ON t.order_id = o.id WHERE is_closed = False)
        `
    );

    const [shiftId] = await databaseQuery(
        `
        SELECT id FROM shifts WHERE NOW() BETWEEN start_time AND end_time;
        `
    ); 

    const [shiftCount] = shiftId ? await databaseQuery(
        `
        SELECT count(id_employee) as count FROM employees_shifts WHERE id_shift=${shiftId.id};
        `
    ) : [{ count: 0 }];

    return {
        countOrdersToday: countOrdersToday.count,
        reservationTableCount: reservationTableCount.count,
        freeTableCount: freeTableCount.count,
        shiftCount: shiftCount.count,
    };
};

export {
    getCardCount,
};
