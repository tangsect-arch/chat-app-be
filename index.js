import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./src/router/auth.route.js";
import userRouter from "./src/router/user.route.js";
import connectionRouter from "./src/router/connection.route.js";
import messageRouter from "./src/router/message.route.js";

import connectToMongoDB from "./src/config/db.config.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const port = process.env.PORT || 5000;

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/conversation", messageRouter);
app.use("/connection", connectionRouter);

app.listen(port, () => {
  connectToMongoDB();
  console.log(`http://localhost:${port}/`);
});
