import databaseQuery from "../utils/database-query.js";
import { comparePassword } from "../utils/password.js";

const login = async (login) => {
    return await databaseQuery(
        `SELECT e.id, e.first_name, e.last_name, e.login, (select j.job_name from jobs as j WHERE j.id = e.job_id) as job_name FROM employees as e WHERE e.login='${login}'`
    );
};

const checkPassword = async (login, password) => {
    const [result] = await databaseQuery(
        `SELECT password FROM employees WHERE employees.login='${login}'`
    );

    let isEqualPassword = false;

    if (result?.password) {
        isEqualPassword = await comparePassword(password, result.password);

    }
    return isEqualPassword;
};

export {
    login,
    checkPassword,
};
