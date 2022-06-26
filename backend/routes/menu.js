import express from "express";
import {
    getCountMenuPositions,
    getMenuItems,
    insertMenuItem,
} from "../services/menu.js";

const menuRouter = express.Router();

menuRouter.get("/", async (req, res) => {
    const { page, search } = req.query;

    try {
        const menuItems = await getMenuItems(search, page, 10);
        const [countPosition] = await getCountMenuPositions(search);

        res.status(200).json({
            menuItems,
            countPosition: countPosition.count,
        });
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

menuRouter.post("/add", async (req, res) => {
    const { name, price } = req.body;

    try {
        await insertMenuItem(name, price);

        res.status(200).json("Success");
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

export default menuRouter;
