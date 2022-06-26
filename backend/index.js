import express from "express";
import cors from "cors";
import userRouter from "./routes/users.js";
import orderRouter from "./routes/orders.js";
import menuRouter from "./routes/menu.js";
import tablesRouter from "./routes/tables.js";
import storageRouter from "./routes/storage.js";
import employeesRouter from "./routes/employees.js";
import jobsRouter from "./routes/jobs.js";
import cardRouter from "./routes/card.js";
 
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/menu', menuRouter);
app.use('/api/tables', tablesRouter);
app.use('/api/storage', storageRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/card', cardRouter);

app.listen(port, () => console.log(`Server running at port ${port}`));
