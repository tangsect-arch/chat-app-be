const UserModel = require("../model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const salt = process.env.SALT;

const hashPassword = (password) => {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return { hash: hash.digest("hex") };
};

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const { hash } = hashPassword(userData.password);
    userData.password = hash;
    const user = await UserModel.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.getUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    const user = await UserModel.updateUser(id, userData);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UserModel.deleteUser(id);
    if (!result) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateAuthToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.SESSION_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

const verifyPassword = (password, hash) => {
  const newHash = crypto.createHmac("sha256", salt);
  newHash.update(password);
  return newHash.digest("hex") === hash;
};

exports.loginUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await UserModel.findOne({ email: userData.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isValid = verifyPassword(userData.password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    req.session.user = user;
    req.session.secret = process.env.SESSION_SECRET;
    const authToken = generateAuthToken(user);
    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });
    const body = {
      message: "Login successful",
      user_details: {
        username: user.user_name,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        phone: user.phone,
      },
    };
    res.status(200).json(body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
    });

    res.clearCookie("authToken");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
