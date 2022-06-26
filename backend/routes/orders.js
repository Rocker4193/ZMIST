import express from "express";
import {
    addOrder,
    endOrder,
    getCountOrders,
    getCountPositions,
    getOrders,
    getOrderView,
} from "../services/orders.js";

const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
    const { isClosed, page, search } = req.query;

    try {
        const orders = await getOrders(isClosed, search, page, 10);
        const [countActive] = await getCountOrders(false, search);
        const [countClosed] = await getCountOrders(true, search);

        res.status(200).json({
            orders,
            countActive: countActive.count,
            countClosed: countClosed.count,
        });
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

orderRouter.get("/", async (req, res) => {
    const { isClosed, page, search } = req.query;

    try {
        const orders = await getOrders(isClosed, search, null, null, false);

        res.status(200).json({
            orders,
        });
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

orderRouter.get("/view", async (req, res) => {
    const { orderId, page, search } = req.query;

    try {
        const positions = await getOrderView(orderId, search, page, 10);
        const [countPosition] = await getCountPositions(orderId, search);

        res.status(200).json({
            positions,
            countPosition: countPosition.count,
        });
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

orderRouter.post("/add", async (req, res) => {
    const { currentTable, positionsInOrder, id, total } = req.body;

    try {
        await addOrder(currentTable, positionsInOrder, id, total);

        res.status(200).json('Success');
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

orderRouter.post("/end", async (req, res) => {
    const { orderId } = req.body;

    try {
        await endOrder(orderId);

        res.status(200).json('Success');
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

orderRouter.get("/check", async (req, res) => {
    const { orderId } = req.query;

    try {
        const positions = await getOrderView(orderId);

        res.status(200).json({
            positions,
        });
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

export default orderRouter;
