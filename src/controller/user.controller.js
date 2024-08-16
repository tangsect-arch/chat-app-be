const UserModel = require("../model/user.model");
const crypto = require("crypto");

const salt = process.env.SALT;

const hashPassword = (password) => {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return { hash: hash.digest("hex") };
};

const verifyPassword = (password, hash) => {
  const newHash = crypto.createHmac("sha256", salt);
  newHash.update(password);
  return newHash.digest("hex") === hash;
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

exports.loginUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await UserModel.getUserByUsername(userData.username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isValid = verifyPassword(userData.password, user.password.hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
