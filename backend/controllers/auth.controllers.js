import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exist." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 charecters ." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role
    });

    const token = await genToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json(userResponse);
  } catch (error) {
    return res.status(500).json(`Sign up error ${error}`);
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password !" });
    }

    const token = await genToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json(userResponse);
  } catch (error) {
    return res.status(500).json(`Sign in error ${error}`);
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    return res.status(200).json({ message: "Log out successfully" });
  } catch (error) {
    return res.status(500).json(`Sign out error ${error}`);
  }
};
