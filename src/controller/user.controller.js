import User from "../model/user.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select(
      "id name profilePic email phone username gender"
    );
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Success", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Success", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getConnections = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate(
      "connections",
      "id name profilePic email phone username gender"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Success", connections: user.connections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
