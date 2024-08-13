import express from "express";
import connectDB from "./src/database/DBconnection.js";
import userRouter from "./src/module/userModule/user.routes.js";
import { AppError } from "./src/utility/appError.js";
import companyRouter from "./src/module/companyModule/company.routes.js";
import jobRouter from "./src/module/jobModule/job.routes.js";

const app = express();
const port = 3000;



app.use(express.json());
connectDB;
app.use(userRouter);
app.use(companyRouter);
app.use(jobRouter);
app.use("/uploads", express.static("uploads"));

app.use("**", (req, res, next) => {
  next(new AppError(`invalid url ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: "error", error: err.message });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
