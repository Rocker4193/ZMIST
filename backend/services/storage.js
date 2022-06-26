import databaseQuery from "../utils/database-query.js";

const getStorageItems = async (search, page, show) => {
    const results = await databaseQuery(
        `
        SELECT item_id, item_name,  bought_price, availiable_quantity
        FROM storage as s
        ${search ? `WHERE s.item_name LIKE '%${search}%'` : ""} 
        ORDER BY s.item_name LIMIT ${(page - 1) * show}, ${show}
        `
    );

    return results;
};

const getCountStoragePositions = async (search) => {
    return await databaseQuery(
        `
        SELECT count(item_id) as count
        FROM storage as s
        ${search ? `WHERE s.item_name LIKE '%${search}%'` : ""} 
        `
    );
};

const insertStorageItem = async (name, price, count) => {
    await databaseQuery(
        `
        INSERT storage(item_name, bought_price,  availiable_quantity) 
        VALUES ("${name}", ${price}, ${count});
        `
    );
};

export { getStorageItems, getCountStoragePositions, insertStorageItem };
