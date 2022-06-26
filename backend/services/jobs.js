import databaseQuery from "../utils/database-query.js";

const getJobs = async () => {
    const results = await databaseQuery(
        `
        SELECT j.job_name as value, j.job_name as label
        FROM jobs as j
        `
    );

    return results;
};

export { getJobs };
