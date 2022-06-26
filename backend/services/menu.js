import databaseQuery from "../utils/database-query.js";

const getMenuItems = async (search, page, show) => {
    const results = await databaseQuery(
        `
        SELECT product_id, name, price FROM products as p
        ${search ? `WHERE p.name LIKE '%${search}%'` : ""} 
        ORDER BY p.name LIMIT ${(page - 1) * show}, ${show}
        `
    );

    return results;
};

const getCountMenuPositions = async (search) => {
    return await databaseQuery(
        `SELECT COUNT(name) as count FROM products as p ${
            search ? `WHERE p.name LIKE '%${search}%'` : ""
        }`
    );
};

const insertMenuItem = async (name, price) => {
    await databaseQuery(
        `INSERT products (name, price) VALUES ("${name}", ${price})`
    );
};

export { getMenuItems, getCountMenuPositions, insertMenuItem };
