import express from "express";
import { getCountTables, getTables, insertTable } from "../services/tables.js";

const tablesRouter = express.Router();

tablesRouter.get("/", async (req, res) => {
    const { page, search, forOrder } = req.query;

    try {
        const tables = forOrder ? await getTables() : await getTables(search, page, 10);
        const [countTables] = await getCountTables(search);

        res.status(200).json({
            tables,
            countTables: countTables.count,
        });
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

tablesRouter.post("/add", async (req, res) => {
    const { seatCount } = req.body;

    try {
        await insertTable(seatCount);

        res.status(200).json("Success");
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

export default tablesRouter;
