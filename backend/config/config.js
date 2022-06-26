const config = {
    database: {
        host: process.env.mysqlHost || "localhost",
        user: process.env.mysqlUser || "root",
        password: process.env.mysqlPassword || "root",
        database: process.env.mysqlDatabase || "zmist",
    },
};

export default config;
