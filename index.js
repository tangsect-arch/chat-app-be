const express = require("express");
const cors = require("cors");

require("dotenv").config();
const connectDB = require("./src/config/config");

const app = express();

const userRoutes = require("./src/routes/user.routes");
// const chatRoutes = require("./src/routes/chat.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Chat app!");
});

app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
console.log(`port: ${process.env.PORT}`);

app.listen(3000, () => {
  console.log(`Server running on port: ${port}`);
});
