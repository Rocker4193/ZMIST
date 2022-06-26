import express from "express";
import { getCountEmployees, getEmployees, insertEmployee } from "../services/employees.js";

const employeesRouter = express.Router();

employeesRouter.get("/", async (req, res) => {
    const { page, search } = req.query;

    try {
        const employees = await getEmployees(search, page, 10);
        const [countEmployees] = await getCountEmployees(search);

        res.status(200).json({
            employees,
            countEmployees: countEmployees.count,
        });
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

employeesRouter.post("/add", async (req, res) => {
    const {
        firstName,
        lastName,
        birthDate,
        phone,
        position,
        login,
        password,
        salary,
    } = req.body;

    try {
        await insertEmployee(
            firstName,
            lastName,
            birthDate,
            phone,
            position,
            login,
            password,
            salary
        );

        res.status(200).json("Success");
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

export default employeesRouter;
