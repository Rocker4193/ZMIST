import express from "express";
import { getCountStoragePositions, getStorageItems, insertStorageItem } from "../services/storage.js";

const storageRouter = express.Router();

storageRouter.get("/", async (req, res) => {
    const { page, search } = req.query;

    try {
        const storageItems = await getStorageItems(search, page, 10);
        const [countPosition] = await getCountStoragePositions(search);

        res.status(200).json({
            storageItems,
            countPosition: countPosition.count,
        });
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

storageRouter.post("/add", async (req, res) => {
    const { name, price, count } = req.body;

    try {
        await insertStorageItem(name, price, count);

        res.status(200).json("Success");
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

export default storageRouter;
