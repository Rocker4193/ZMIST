import express from "express";
import { getJobs } from "../services/jobs.js";

const jobsRouter = express.Router();

jobsRouter.get("/", async (req, res) => {
    try {
        const jobs = await getJobs();

        res.status(200).json({
            jobs,
        });
    } catch (e) {
        res.status(400).json({ message: "Uknown error!" });
    }
});

export default jobsRouter;
