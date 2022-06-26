import databaseQuery from "../utils/database-query.js";

const getCountOrders = async (isClosed, search) => {
    return await databaseQuery(
        `SELECT count(orders.id) as count FROM orders WHERE orders.is_closed=${isClosed} ${
            search
                ? `
            AND (
            SELECT
            CONCAT(e.first_name, " ", e.last_name)
            FROM
            employees AS e
            WHERE
            e.id = orders.id_employee
            limit 1) LIKE '%${search}%'
            `
                : ""
        }`
    );
};

const getOrders = async (isClosed, search, page, show) => {
    const results = await databaseQuery(
        `
        SELECT
        o.id,
        o.is_closed,
        o.order_time,
        (
            SELECT
            tao.table_id
            FROM
            tables_orders AS tao
            WHERE
            tao.order_id = o.id
            limit 1
        ) as table_id,
        (
            SELECT
            CONCAT(e.first_name, " ", e.last_name)
            FROM
            employees AS e
            WHERE
            e.id = o.id_employee
            limit 1
        ) as employee_name
        FROM
        orders AS o
        WHERE o.is_closed=${isClosed}
        ${
            search
                ? `AND (
            SELECT
            CONCAT(e.first_name, " ", e.last_name)
            FROM
            employees AS e
            WHERE
            e.id = o.id_employee
            limit 1
        ) LIKE '%${search}%'`
                : ""
        }
        ORDER BY o.order_time DESC 
        LIMIT ${(page - 1) * show}, ${show}
        `
    );

    return results;
};

const getOrderView = async (orderId, search, page, show) => {
    const results = await databaseQuery(
        `
        SELECT product_id, quantity, 
        (SELECT name FROM products as p where p.product_id=oi.product_id) as product_name, 
        (SELECT price FROM products as p1 where p1.product_id=oi.product_id) as product_price 
        FROM order_items as oi WHERE oi.order_id=${orderId} ${
            search
                ? `AND (SELECT name FROM products as p where p.product_id=oi.product_id) LIKE '%${search}%'`
                : ""
        } 
        ${page ? `ORDER BY product_name LIMIT ${(page - 1) * show}, ${show}` : ''}
        `
    );

    return results;
};

const getCountPositions = async (orderId, search) => {
    return await databaseQuery(
        `SELECT count(oi.product_id) as count
        FROM order_items as oi WHERE oi.order_id=${orderId} ${
            search
                ? `AND (SELECT name FROM products as p where p.product_id=oi.product_id) LIKE '%${search}%'`
                : ""
        }`
    );
};

const addOrder = async (currentTable, products, idUser, total) => {
    const values = products.map(({ product_id, count }) => {
            return `((select max(id) from orders), ${product_id}, ${count})`;  
    }).join(', ');
    await databaseQuery(
        `
        INSERT orders(id_employee, order_time, total, is_closed) 
        VALUES (${idUser}, NOW(), ${total}, false)
        `
    );
    await databaseQuery(
        `
        INSERT order_items(order_id, product_id, quantity) 
        VALUES 
        ${values}
        `
    );
    await databaseQuery(
        `
        INSERT INTO tables_orders (table_id, order_id)
        VALUES (${currentTable}, (select max(id) from orders));
        `
    );
};

const endOrder = async (orderId) => {
    await databaseQuery(
        `
        UPDATE orders
        SET is_closed = True
        WHERE id=${orderId}
        `
    );
};

export { getCountPositions, getOrderView, getOrders, getCountOrders, addOrder, endOrder };
