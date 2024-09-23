import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};
export const validatePassword = (password) => {
  const passwordRequirementsRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRequirementsRegex.test(password)) {
    return "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.";
  }

  return null;
};

export const hashPassword = async (plaintextPassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plaintextPassword, salt);
};
