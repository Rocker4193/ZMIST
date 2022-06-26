import mysql from "mysql";
import config from "../config/config.js";

const databaseQuery = (sql) => {
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config.database);

        db.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    
        db.end();
    });
};

export default databaseQuery;
