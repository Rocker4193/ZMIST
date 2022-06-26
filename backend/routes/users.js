import express from "express";
import { checkPassword, login } from "../services/users.js";

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
    const { data } = req.body;

    if (await checkPassword(data.login, data.password)) {
        const [result] = await login(data.login);

        res.json(result);
    } else {
        res.status(400).json({ message: 'Fail' });
    }
});

export default userRouter;
