// Import required modules
const mongoose = require("mongoose");

// Define the User model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

module.exports.createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports.getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports.getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports.updateUser = async (id, userData) => {
  try {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports.deleteUser = async (id) => {
  try {
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }
    return true;
  } catch (error) {
    throw error;
  }
};
