#!/usr/bin/env node
import databaseQuery from "../utils/database-query.js";
import getArgs from "../utils/get-args.js";

const permisionMap = {
    forbidden: '"forbidden"',
    read_only_self: '"read_only_self"',
    read: '"read"',
    edit: '"edit"',
};

/**
 * @desc 
 * Valid values in array: forbidden|read_only_self|read|edit
 * @example
 * npm run create-job -- -j admin -p "['edit', 'read', 'edit','read','read','read','read']"
 * npm run create-job -- -j admin -p read_only_self
 */
const createJob = async (argv) => {
    const args = getArgs(argv);

    if (!args.j || !args.p) {
        console.log(
            'Error! You need to pass your job and permission (npm run create-job -- -j jop -p forbidden|read_only_self|read|edit|["order_perm", "products_perm", "storage_perm", "shifts_perm", "jobs_perm", "tables_perm", "employees_perm"])!'
        );
    } else {
        let str;

        if (args.p.indexOf("[") !== -1) {
            try {
                const permissions = JSON.parse(args.p.replaceAll(`'`, `"`));

                if (Array.isArray(permissions)) {
                    if (permissions.length !== 7) {
                        console.log("Length permissions must be 7 items!");
                    } else {
                        const isWrong =
                            permissions.filter((text) => !!permisionMap[text])
                                .length !== permissions.length;

                        if (isWrong) {
                            console.log(
                                "Permission item incorrect! Correct values must be: forbidden|read_only_self|read|edit"
                            );
                        } else {
                            str = permissions
                                .map((text) => permisionMap[text])
                                .join(", ");
                        }
                    }
                } else {
                    console.log(
                        'Permission incorrect! Correct values must be: forbidden|read_only_self|read|edit|["order_perm", "products_perm", "storage_perm", "shifts_perm", "jobs_perm", "tables_perm", "employees_perm"]'
                    );
                }
            } catch (e) {
                console.log("Error parse -p!");
            }
        } else {
            if (!permisionMap[args.p]) {
                console.log(
                    "Permission incorrect! Correct values must be: forbidden|read_only_self|read|edit"
                );
            } else {
                str = new Array(7).fill(permisionMap[args.p]).join(", ");
            }
        }

        if (str) {
            await databaseQuery(
                `INSERT INTO jobs (job_name, order_perm, products_perm, storage_perm, shifts_perm, jobs_perm, tables_perm, employees_perm) VALUES ("${args.j}", ${str});`
            );
        }
    }
};

createJob(process.argv);
