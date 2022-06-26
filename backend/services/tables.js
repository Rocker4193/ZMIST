import databaseQuery from "../utils/database-query.js";

const getTables = async (search, page, show) => {
    const results = await databaseQuery(
        `
        SELECT id, seat_count FROM tables as t
        ${search ? `WHERE t.id=${search}` : ""} 
        ${page ? `ORDER BY t.id LIMIT ${(page - 1) * show}, ${show}` : ''}
        `
    );

    return results;
};

const getCountTables = async (search) => {
    return await databaseQuery(`SELECT count(id) as count FROM tables as t
    ${search ? `WHERE t.id=${search}` : ""}`);
};

const insertTable = async (seatCount) => {
    await databaseQuery(`INSERT tables (seat_count) VALUES (${seatCount})`);
};

export { getTables, getCountTables, insertTable };
