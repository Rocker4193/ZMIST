import express from "express";
import { getCardCount } from "../services/card.js";

const cardRouter = express.Router();

cardRouter.get("/", async (req, res) => {
    const counter = await getCardCount();

    res.status(200).json({
        counter,
    });
});

export default cardRouter;
