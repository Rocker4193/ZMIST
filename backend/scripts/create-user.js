#!/usr/bin/env node
import databaseQuery from "../utils/database-query.js";
import { hashPassword } from "../utils/password.js";
import getArgs from "../utils/get-args.js";

/**
 * 
 * @example 
 * npm run create-user -- -l login -p password -f first_name -o last_name -d 2022-12-26 -n 380990482560 -s 2022-12-26 -m money -j job_name
 * npm run create-user -- -l admin -p 1234 -f first_name -o last_name -d 2022-12-26 -n 380990482560 -s 2022-12-26 -m 2000 -j administrator
 */
const createUser = async (argv) => {
    const args = getArgs(argv);

    if (!args.l || !args.p || !args.f || !args.o || !args.d || !args.n || !args.s || !args.m || !args.j) {
        console.log(
            "Error! npm run create-user -- -l login -p password -f first_name -o last_name -d date_of_birth -n phone_number -s start_date -m money -j job_name"
        );
    } else {
        const hashedPassword = await hashPassword(args.p);

        await databaseQuery(
            `INSERT INTO employees (first_name, last_name, date_of_birth, phone_number, start_date, job_id, salary, login, password) VALUES ("${args.f}", "${args.o}", "${args.d}", "${args.n}", "${args.s}", (select id from jobs where job_name="${args.j}"), "${args.m}", "${args.l}", "${hashedPassword}")`
        );
    }
};

createUser(process.argv);
