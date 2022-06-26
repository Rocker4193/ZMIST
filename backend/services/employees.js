import databaseQuery from "../utils/database-query.js";
import formatDate from "../utils/format-date.js";
import { hashPassword } from "../utils/password.js";

const getEmployees = async (search, page, show) => {
    const results = await databaseQuery(
        `
        SELECT e.id, j.job_name, CONCAT(e.first_name, " ", e.last_name) as full_name, e.date_of_birth, e.phone_number, e.start_date, e.end_date
        FROM employees as e
        INNER JOIN jobs as j
        ON e.job_id = j.id
        ${
            search
                ? `WHERE CONCAT(e.first_name, " ", e.last_name) LIKE '%${search}%'`
                : ""
        } 
        ORDER BY j.job_name LIMIT ${(page - 1) * show}, ${show}
        `
    );

    return results;
};

const getCountEmployees = async (search) => {
    return await databaseQuery(
        `
        SELECT COUNT(e.id) as count FROM employees as e
        ${
            search
                ? `WHERE CONCAT(e.first_name, " ", e.last_name) LIKE '%${search}%'`
                : ""
        } 
        `
    );
};

const insertEmployee = async (
    firstName,
    lastName,
    birthDate,
    phone,
    position,
    login,
    password,
    salary
) => {
    const currentDate = formatDate(new Date(Date.now()));
    const hashedPassword = await hashPassword(password);

    await databaseQuery(
        `
        INSERT INTO employees (first_name, last_name, date_of_birth, phone_number, start_date, job_id, salary, login, password) 
        VALUES (
            "${firstName}", 
            "${lastName}", 
            "${birthDate}",
            "${phone}", 
            "${currentDate}", 
            (select id from jobs where job_name="${position}"), 
            "${salary}", 
            "${login}", 
            "${hashedPassword}"
        )
        `
    );
};

export { getEmployees, getCountEmployees, insertEmployee };
