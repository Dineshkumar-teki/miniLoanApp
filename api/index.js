import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import loanRoute from "./routes/loan.route.js";

const app = express();

app.use(cors());

dotenv.config();

app.use(express.json());

app.use("/auth", authRoute);

app.use("/loan", loanRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("db connected successfully");
    app.listen(3100, () => {
      console.log(`app listens to port no 3100`);
    });
  })
  .catch((err) => console.log(err));
