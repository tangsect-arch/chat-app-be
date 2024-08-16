const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const connectDB = require("./src/config/config");

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 3600000, // 1 hour
    },
  })
);

const userRoutes = require("./src/routes/user.routes");
// const chatRoutes = require("./src/routes/chat.routes");
const auth = require("./src/routes/authenticate.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();
app.use("/api/v1", auth);

app.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});

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
